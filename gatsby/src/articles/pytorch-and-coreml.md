---
title: "How I Shipped a Neural Network on iOS with CoreML, PyTorch, and React Native"
date: "February 12, 2018"
---

### The Challenge

I recently built a little iOS app using React Native for mechanical watch aficionados to track the accuracy of their watches over time.

> #### Mechanical Watch Rabbit Hole
> If you don’t own a mechanical watch, you may be questioning the whole point of this app, and the whole point of owning an expensive, inaccurate watch in the first place. What ultimately sold me was realizing that a mechanical watch is a piece of jewelry that’s also a perfect synergy of design and engineering in physical form. I’ve been trying to marry the two my entire life (hence the name of my consulting company, Rational Creation), so wearing both on my wrist just feels right.

One of the main features of the app is a chart of the measurements you’ve taken, with trendlines estimating how your watch is performing.

Computing a trendline across given points is easy. You can use a simple linear regression, or you can even get fancy and use a robust linear regression (such as Theil-Sen) to minimize the impact of stray measurements.

However, what often happens with a mechanical watch, especially one that's not running very well, is that you reset it to current time every few days. Or you skip wearing it for a couple days, and its “charge” depletes, so you have to reset it. These events create a “break” in the trendline. E.g.:

I thought I could Google my way out the problem, like I did earlier when looking for a robust linear regression formula. And for a hot second I thought I’d hit the jackpot.

The approach is essentially a brute force, trying all possible splits and then deciding which ones to pick based on how much they affect the mean squared error. I implemented this approach, and even built a UI to tweak the parameters to make it work well, but ultimately I realized this wasn't going to cut it.

I've experimented for years with neural networks, but never yet had had the chance to use one in production. This was the perfect opportunity.

### The Tools

Since the goal is to run in production, my main concern was figuring out how I would deploy a neural network first. Many online tutorials just drop you off at the end of the training and leave this part out. But I’d decided this would be the time I’d see my neural network all the way through.

Since I was building an iOS app, CoreML was the obvious choice. It’s the only way I know of to do predictions on the GPU, since last I checked CUDA was not available on iOS.

Another huge benefit of CoreML is that it’s built-in to the OS, so I wouldn’t need to worry about compiling, linking, and shipping binaries of sprawling ML libraries with my little app.

> #### CoreML Caveats
> Unfortunately CoreML is still very new, and its tools are quite rough. CoreML itself only supports certain kinds of layers and operations. The tools that Apple ships to convert trained models into CoreML models support a subset of those. Plus they only officially support converting neural networks trained with Keras. On top of that, Keras models don’t seem to perform great on CoreML. I did some inspecting of the converted Keras models and there’s a great deal of time spent converting data into Caffe operations and back. It seems likely that Apple uses Caffe internally, and Keras support was tacked on. Caffe is great for vision, but not so great for the tasks I typically tackle (NLP).

I’ve had mixed luck with converting Keras models to CoreML (see box above), so I’ve been on the hunt for other ways to generate CoreML models. Meanwhile, I’d been looking for an excuse to try out PyTorch. Somewhere along my research I stumbled upon ONNX, a proposed standard exchange format for trained neural network models. PyTorch support is available from day one. Somehow it occurred to me to look for an ONNX to CoreML converter,  and sure enough, one exists!

I finally had all the pieces of the puzzle. I knew from my experience with Keras/Tensorflow and CoreML that so many things could still go wrong.

> ####  What about Tensorflow?
> Like most people, I built and trained most of my neural networks with TensorFlow. honeymoon phase had long faded. I was tired of the kitchen-sink approach to library management, the sprawling and competing and messy APIs, the huge binaries, and the extremely slow startup times when training.
> TensorFlow APIs are a sprawling mess. Keras  mitigates some of that problem, but it's a leaky abstraction. Debugging issues is hard if you don’t understand how things work behind the scenes.
> As ex-Facebook engineer, I'm biased towards anything Facebook produces, so I was eager to give PyTorch a try, and I’m very glad I did.
> PyTorch is a breath of fresh air.
> PyTorch is just much faster to start up than TensorFlow, which makes iterating on my network much more immediate and fun.
> PyTorch has a smaller API, and a simpler execution model. Unlike TensorFlow, it does not require you to build a computation graph in advance as a separate step from executing it. It feels much more like regular programming, makes things easier to debug, and also enables more dynamic architectures.

### Gathering the Training Data

In my experience with neural networks, assembling a large-enough good quality dataset is the hardest part. This is why most papers and tutorials out there start with a well-known public dataset, like MNIST.

However, I find the standard image and text tasks boring. I like solving new problems, and I like neural networks because they can be applied to anything. So I build my datasets. Because of this, my datasets tend to be small. So I limit myself to problems that are slightly more attainable than talking to humans or driving cars.

Thankfully, the problem at hand is relatively easy for a neural network (or so I thought), so a small dataset should suffice. On top of that, it’s a very visual problem, so generating data and evaluating the neural networks should be easy... with the right tools.

### The Test UI

I had the perfect UI already. I had built it to tweak the parameters of my brute-force algorithm and see the effects in real time. It didn’t take me long to convert it into a UI for generating training examples. With a few clicks of the mouse and a `JSON.stringify` call I had enough of a dataset to jump into Python.

> #### Parcel

### Preprocessing the Data

Another hurdle when designing a neural network is finding the optimal how to encode something fuzzy, like text of varying lengths, into numbers a neural networks can understand. Thankfully, the problem at hand is numbers to begin with.

In my dataset, each example is a series of x, y coordinates. All I need to do is pad it to a fixed length. I picked a number that felt large enough for my app (100). The output is a series of bits, with ones marking a position where the trendline should be split. As the neural network tries to approximate this series of ones and zeros, each output number will fall somewhere in-between. We can interpret those as the probability that a split should happen at a certain point, and split anywhere above a certain confidence value (typically 0.5).

#### Padding

I always like to factor out the data encoding logic into its own function, as this will likely be used in multiple places (training, evaluation, and sometimes even production).

My function will take a series of points of variable length, and return a fixed-length tensor. Let's start with something that returns an empty tensor:

```python
def encode(points, padded_length=100):
    input_tensor = torch.zeros([2, padded_length])
    return input_tensor
```

Know that you can already use this to start training and running your neural network, before you put in any real data. It won’t learn anything useful, but at least you’ll know your architecture works before you put more work into curating and preprocessing your dataset.

Next we fill in the tensor with data:
```python
def encode(points, padded_length=100):
    input_tensor = torch.zeros([2, padded_length])
    for i in range(min(padded_length, len(points))):
        input_tensor[0][i] = points[i][0] * 1.0 # cast to float
        input_tensor[1][i] = points[i][1] * 1.0
        continue
    return input_tensor
```

> #### Order of coordinates in PyTorch vs Tensorflow
> PyTorch flips the coordinates: the channel (x/y in this case, r/g/b in case of an image) comes before the position (i).

#### Normalization

We could stop here, but it’s good practice to normalize your inputs so that the values cluster around 0. This is where floating point numbers have the highest precision.

```python
def encode(points, padded_length=100):
    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    
    # Find the extremes so we can scale everything
    # to fit into the [-0.5, 0.5] range
    min_x = min(xs)
    max_x = max(xs)
    min_y = min(ys)
    max_y = max(ys)
    
    # I'm scaling y coordinates by the same ratio to keep things
    # proportional (otherwise we might lose some precious information).
    # This computes how much to shift scaled y values by so that
    # they cluster around 0.
    y_shift = ((max_y - min_y) / (max_x - min_x)) / 2.0
    
    # Create the tensor
    input_tensor = torch.zeros([2, padded_length])

    def normalize_x(x):
        return (x - min_x) / (max_x - min_x) - 0.5
    def normalize_y(y):
        return (y - min_y) / (max_x - min_x) - y_shift

    # Fill the tensor with normalized values
    for i in range(min(padded_length, len(points))):
        input_tensor[0][i] = normalize_x(points[i][0] * 1.0)
        input_tensor[1][i] = normalize_y(points[i][1] * 1.0)
        continue
    return input_tensor
```

> #### Processing inside the network

> #### What about feature engineering

### The Model

#### Convolution

I like to think of convolution as code reuse for neural networks. A typical fully-connected layer has no concept of space and time. By using convolutions, you’re telling the neural network it can reuse what it learned across certain dimensions. In my case, it doesn’t matter where in the sequence a certain pattern occurs, the logic is the same, so I use a convolutions across the time dimension.

An important realization was that though convolutions sound expensive and complicated (convoluted?), their main benefit is that they actually simplify the network. By reusing logic, networks become smaller. Smaller networks are need less data and are faster to train.

The tricky thing when working with convolution is that they are by their nature very spatial, which means you need to have a very good intuitive understanding of the shape of the data they expect as input and the shape of their output. I tend to visualize diagrams like these when I design my convolutional layers.

The goal is to slowly transform the shape of the input into the shape you need for the output.

> #### No fully connected layers?

> #### What about RNNs?

### Training

#### PyTorch DataLoader
#### Shuffling
#### Setting Aside a Validation Set
> #### Test set

> #### Spot Instances
> Another aside.

#### PyTorch Tools

### Evaluating

Problem way harder than I thought.

### Deploying

#### Adjusting the Model for ONNX and CoreML

> #### Casting and transformations


#### ONNX

Installing the correct version of ONNX.

> #### Makefile
#### CoreML Tools

#### CoreML

```swift
  @objc(split:callback:)
  func split(points: [[Float32]], callback: RCTResponseSenderBlock) {
    guard points.count >= 2 else {
      callback([NSNull(), []])
      return
    }
    if #available(iOS 11.0, *) {
      if self.model == nil {
        self.model = SplitModel()
      }
      guard let model = self.model as? SplitModel else {
        print("Failed to create model")
        callback(["coreml_error", NSNull()])
        return
      }

      // example: [[Float32]] = [[41, 24], [163, 116], [254, 116], [319, 103], [484, 112], [533, 84], [629, 91]]
      let xs = points.map { $0[0] }
      let ys = points.map { $0[1] }
      let minX = xs.min()!
      let maxX = xs.max()!
      let minY = ys.min()!
      let maxY = ys.max()!
      let yShift = ((maxY - minY) / (maxX - minX)) / 2.0
      guard let data = try? MLMultiArray(shape: [1, 2, 100], dataType: .float32) else {
        print("Failed to create MLMultiArray")
        callback(["coreml_error", NSNull()])
        return
      }
      
      for (i, point) in points.enumerated() {
        let doubleI = Double(i)
        let x = Double((point[0] - minX) / (maxX - minX) - 0.5)
        let y = Double((point[1] - minY) / (maxX - minX) - yShift)
        data[[NSNumber(floatLiteral: 0), NSNumber(floatLiteral: 0), NSNumber(floatLiteral: doubleI)]] = NSNumber(floatLiteral: x)
        data[[NSNumber(floatLiteral: 0), NSNumber(floatLiteral: 1), NSNumber(floatLiteral: doubleI)]] = NSNumber(floatLiteral: y)
      }
            
      do {
        let start = CACurrentMediaTime()
        let prediction = try model.prediction(_1: data)._27
        print("ml time \(CACurrentMediaTime() - start)")
        var indices: [Int] = []
        for (index, prob) in prediction {
          if prob > 0.5 && index < points.count - 1 {
            indices.append(Int(index))
          }
        }
        callback([NSNull(), indices.sorted()])
        return
      } catch {
        print("Error running CoreML: \(error)")
        callback(["coreml_error", NSNull()])
        return
      }
    } else {
      callback(["coreml_unavailable", NSNull()])
    }
  }
}
```

#### React Native

### Future
#### Closing the Loop

### Conclusion

The full code is available here.
End-to-end. Hope you found this helpful. If you did, get the app (or tell a watch nerd friend). I’m also available for hire for React, React Native, and ML work.


Thanks.