---
title: "How I Shipped a Neural Network on iOS with CoreML, PyTorch, and\xa0React\xa0Native"
date: "2018-02-09"
---

Ever felt like ML tutorials are a little too pie-in-the-sky, and short on practical details that you can use today? If so, you might find this story interesting.

This is the story of how I trained a relatively simple neural network, but one that solves a well-defined and novel problem in a real iOS app. I hope it inspires you to start sprinkling neural networks in your app as well, even if you’re not working on chat bots or self-driving cars.

### The <span class="caps">Challenge</span>

I recently built [a little iOS app](https://itunes.apple.com/us/app/movement-watch-tracker/id1329445157) using React Native for mechanical watch aficionados to track the accuracy of their watches over time.

![](../images/pytorch-and-coreml/app-store.png)
<figcaption><a href="https://itunes.apple.com/us/app/movement-watch-tracker/id1329445157">Movement - Watch Tracker</a> as presented in the App Store.</figcaption>

> ##### Mechanical Watch Rabbit Hole
> If you don’t own a mechanical watch, you may be questioning the whole point of this app, and the whole point of owning an expensive, inaccurate watch in the first place. If you’re one of them, just bear with me. All you need to know is that mechanical watches are inaccurate (they gain lose a few seconds per day if they're good, a few minutes if they're bad). They need to be periodically reset (they stop running if you don't wear them or wind them). And they need to be periodically serviced. If they're anywhere near a magnet, they become “magnetized” and become much less accurate until they’re demagnetized using a special machine. Watch aficionados can get really attached to their timepieces, and can become obsessed about maintaining and measuring their accuracy. Knowing your watch is accurate can increase your pride in your watch tenfold. And knowing your watch is inaccurate can let you know when it's time to take it in for service (and will help you not be late to meetings).!!!!!!!!
> [TODO]
> What ultimately sold me on the appeal of mechanical watches was realizing that a mechanical watch is a piece of jewelry that’s also a perfect synergy of design and engineering in physical form. I’ve been trying to marry the two my entire life (hence the name of my consulting company, Rational Creation), so wearing both on my wrist just feels right.

In the app, watch owners periodically add measurements by tapping the screen when their watch shows a certain time. Over time these measurements tell a story of how your watch is performing.

One of the main features of the app is a chart of the measurements, with trendlines estimating how your watch is performing.

[image]

Computing a trendline across given points is easy. You can use a simple [linear regression], or you can even get fancy and use a robust linear regression (such as [Theil-Sen]) to minimize the impact of stray measurements.

However, what often happens with a mechanical watch, especially one that's not running very well, is that you reset it to current time every few days. Or you skip wearing it for a couple days, and its “charge” depletes, so you have to reset it. These events create a “break” in the trendline. E.g.:

![](../images/pytorch-and-coreml/trendlines.png)
<figcaption>Two very clearly separate runs: each gets a trendline.</figcaption>

I didn’t want to ask my users to do something extra each time they reset their watch. I figured I could pretty easily figure out where to split automatically.

I thought I could Google my way out the problem, like I did earlier when looking for a robust linear regression formula. I pretty quickly found what felt like the right words (“segmented linear regression”, and “piecewise linear regression”). And for a second I thought I’d hit the jackpot. I found [one article] that seems to solve this exact problem using basic math.

The approach is essentially brute-force, trying to split the trendline at every possible point and then deciding which splits to pick based on how much they affect the mean squared error. I implemented this, and got things like this:

![](../images/pytorch-and-coreml/failures.png)
<figcaption>Two common failure scenarios.</figcaption>

This approach is very sensitive to the parameters you pick (like what the error difference threshold should be compared to the overall error), so I built a UI to tweak the parameters. But I got stuck. No matter how I tweaked the parameters, the algorithm was either splitting too frequently, or not frequently enough. This approach wasn't going to cut it.

I've experimented for years with neural networks, but never yet had had the chance to use one in production. This was the perfect opportunity.

### The Tools

Since the goal was running the neural network production, my main concern was figuring out how I would deploy a neural network first. Many online tutorials just drop you off at the end of the training and leave this part out. But I’d decided this would be the time I’d see my neural network all the way through.

Since I was building an iOS app, CoreML was the obvious choice. It’s the only way I know of to do predictions on the GPU; last I checked CUDA was not available on iOS.

Another huge benefit of CoreML is that it’s built in to the OS, so I wouldn’t need to worry about compiling, linking, and shipping binaries of sprawling ML libraries with my little app.

> ##### CoreML Caveats
> Unfortunately CoreML is still very new, and its tools are quite rough. CoreML itself only supports certain kinds of layers and operations. The tools that Apple ships to convert trained models into CoreML models support a subset of those. Plus they only officially support converting neural networks trained with Keras. On top of that, Keras models don’t seem to perform great on CoreML. I did some inspecting of the converted Keras models and there’s a great deal of time spent converting data into Caffe operations and back. It seems likely that Apple uses Caffe internally, and Keras support was tacked on. Caffe is great for vision, but not so great for the tasks I typically tackle (NLP).

I’ve had mixed luck with converting Keras models to CoreML (see box above), so I’ve been on the hunt for other ways to generate CoreML models. Meanwhile, I’d been looking for an excuse to try out PyTorch (see box below). Somewhere along my research I stumbled upon ONNX, a proposed standard exchange format for trained neural network models. PyTorch support is available from day one. Somehow it occurred to me to look for an ONNX to CoreML converter,  and sure enough, one exists!

> #####  What about Tensorflow?
> Like most people, I built and trained most of my neural networks with TensorFlow. honeymoon phase had long faded. I was tired of the kitchen-sink approach to library management, the sprawling and competing and messy APIs, the huge binaries, and the extremely slow startup times when training.
> TensorFlow APIs are a sprawling mess. Keras  mitigates some of that problem, but it's a leaky abstraction. Debugging issues is hard if you don’t understand how things work behind the scenes.
> As ex-Facebook engineer, I'm biased towards anything Facebook produces, so I was eager to give PyTorch a try, and I’m very glad I did.
> PyTorch is a breath of fresh air.
> PyTorch is just much faster to start up than TensorFlow, which makes iterating on my network much more immediate and fun.
> PyTorch has a smaller API, and a simpler execution model. Unlike TensorFlow, it does not require you to build a computation graph in advance as a separate step from executing it. It feels much more like regular programming, makes things easier to debug, and also enables more dynamic architectures.

I finally had all the pieces of the puzzle, from training a neural network all the way to deploying it on iOS. However, I knew from my previous experiments with Keras/Tensorflow and CoreML that so many things could still go wrong. Only one way to find out.

### Gathering the Training Data

In my experience with neural networks, assembling a large-enough good quality dataset is the hardest part. This is why most papers and tutorials out there start with a well-known public dataset, like MNIST.

However, I find the standard image and text tasks boring. I like solving new problems, and I like neural networks because they can be applied to anything. So I build my datasets. Because of this, my datasets tend to be small. So I limit myself to problems that are slightly more attainable than talking to humans or driving cars.

Thankfully, the problem at hand is relatively easy for a neural network (or so I thought), so a small dataset should suffice. On top of that, it’s a very visual problem, so generating data and evaluating the neural networks should be easy... with the right tools.

#### The Test UI

I had the perfect UI already. I had built it to tweak the parameters of my brute-force algorithm and see the effects in real time. It didn’t take me long to convert it into a UI for generating training examples. With a few clicks of the mouse and a `JSON.stringify` call I had enough of a dataset to jump into Python.

[image]

> ##### Parcel
> As an experienced web developer, building this UI as a web app was easy. However, there was one part I was dreading, even though I’ve done it dozens of times before: configuring Webpack. I love trying new things, and so I took this as an opportunity to try Parcel. I’m so glad I did. Parcel worked out of the box with zero configuration. It even worked with TypeScript. I was able to have a fully working web app faster than it would take me to type `create-react-app`.

### Preprocessing the Data

Another common hurdle when designing a neural network is finding the optimal way to encode something fuzzy, like text of varying lengths, into numbers a neural networks can understand. Thankfully, the problem at hand is numbers to begin with.

In my dataset, each example is a series of x, y coordinates.

[image]

[code]

All I need to do to feed the above into a neural network is to pad it to a fixed length. I picked a number that felt large enough for my app (100). So I will be feeding the network vectors of floats in the shape [n, 100, 2], where n is the number of examples in each batch (more on batching later).

The output is a series of bits, with ones marking a position where the trendline should be split. This will be in the shape [n, 100, 1]. 

[code]

Obviously there are only 99 possible splits, since it doesn't make sense to split at position 100. However, keeping the length the same simplifies the neural network (see later). I'll just ignore the final bit in the output.

As the neural network tries to approximate this series of ones and zeros, each output number will fall somewhere in-between.

[code]

We can interpret those as the probability that a split should happen at a certain point, and split anywhere above a certain confidence value (typically 0.5).

#### Padding

I always like to factor out the data encoding logic into its own function, as this will likely be used in multiple places (training, evaluation, and sometimes even production).

My `encode` function will take a series of points of variable length, and returns a fixed-length tensor. Let's start with something that returns an empty tensor of the right shape:

```python
def encode(points, padded_length=100):
    input_tensor = torch.zeros([2, padded_length])
    return input_tensor
```

Note that you can already use this to start training and running your neural network, before you put in any real data. It won’t learn anything useful, but at least you’ll know your architecture works before you put more work into curating and preprocessing your dataset.

Next we fill in the tensor with data:

```python{3-6}
def encode(points, padded_length=100):
    input_tensor = torch.zeros([2, padded_length])
    for i in range(min(padded_length, len(points))):
        input_tensor[0][i] = points[i][0] * 1.0 # cast to float
        input_tensor[1][i] = points[i][1] * 1.0
        continue
    return input_tensor
```

> ##### Order of coordinates in PyTorch vs Tensorflow
> If you’re paying attention, you might have noticed that the x/y coordinate comes before the position. In other words, the shape of the input data is [n, 2, 100], not [n, 100, 2] as it would be in TensorFlow. PyTorch convolutions (see later) expect coordinates in a different order: the channel (x/y in this case, r/g/b in case of an image) comes before the position (i).

#### Normalization

We have the data in a format the neural network can accept. We could stop here, but it’s good practice to normalize your inputs so that the values cluster around 0. This is where floating point numbers have the highest precision.

I find the min and max coordinates in each example and scale everything proportionally.

```python{2-16,21-24,28,29}
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

> ##### Processing inside the network
> Many of the operations that I'm writing in Python, like normalization, casting, etc., are available as operations inside most machine learning libraries. You could implement them that way, and they would be more efficient, potentially even running on the GPU. However, I found that most of these operations are not supported by CoreML.

> ##### What about feature engineering

### The Model

Now comes the fun part, actually defining the neural network architecture. Since we're dealing with spatial data, I reached for my favorite kind of neural network layer: the convolution.

#### Convolution

I like to think of convolution as code reuse for neural networks. A typical fully-connected layer has no concept of space and time. By using convolutions, you’re telling the neural network it can reuse what it learned across certain dimensions. In my case, it doesn’t matter where in the sequence a certain pattern occurs, the logic is the same, so I use a convolutions across the time dimension.

An important realization was that though convolutions sound expensive and complicated (convoluted?), their main benefit is that they actually simplify the network. By reusing logic, networks become smaller. Smaller networks are need less data and are faster to train.

The tricky thing when working with convolution is that they are by their nature very spatial, which means you need to have a very good intuitive understanding of the shape of the data they expect as input and the shape of their output. I tend to visualize diagrams like these when I design my convolutional layers.

[image]

The goal is to slowly transform the shape of the input into the shape you need for the output.

I’m stacking convolutional layers like this for two reasons. First, stacking layers in general has been shown to help networks learn progressively more abstract concepts (this is why “deep learning” is so popular). Second, each stack of convolutions gets access to more and more of the sequence. This is my way of giving each point in the output more information about its context.

This is how the above structure translates to PyTorch code. You subclass `nn.Module`, and in the constructor you define each layer you’ll need. Note I’m picking padding values carefully to preserve the length of my inputs. So if I have a convolution kernel that’s 7 wide, I pad by 3 on each side so that the kernel still has room to center on position 0 and position n.

```python
import torch.nn as nn

input_channels = 2
intermediate_channels = 64

class Model(nn.Module):
    def __init__(self):
        super(Model, self).__init__()

        self.conv1 = nn.Sequential(
            nn.Conv1d(in_channels=input_channels, out_channels=channels, kernel_size=7, padding=3),
            nn.ReLU(),
        )
        self.conv2 = nn.Sequential(
            nn.Conv1d(in_channels=intermediate_channels, out_channels=channels, kernel_size=5, padding=2),
            nn.ReLU(),
        )
        self.conv3 = nn.Sequential(
            nn.Conv1d(in_channels=intermediate_channels, out_channels=channels, kernel_size=3, padding=1),
            nn.ReLU(),
        )
        self.conv4 = nn.Sequential(
            nn.Conv1d(in_channels=intermediate_channels, out_channels=1, kernel_size=3, padding=1),
            nn.Sigmoid(),
        )
```

The next step is to define a `forward()` method, which will actually be called on your data during training and prediction:

```python
import torch.nn as nn

input_channels = 2
intermediate_channels = 64

class Model(nn.Module):
    def __init__(self):
        super(Model, self).__init__()

        self.conv1 = nn.Sequential(
            nn.Conv1d(in_channels=input_channels, out_channels=channels, kernel_size=7, padding=3),
            nn.ReLU(),
        )
        self.conv2 = nn.Sequential(
            nn.Conv1d(in_channels=intermediate_channels, out_channels=channels, kernel_size=5, padding=2),
            nn.ReLU(),
        )
        self.conv3 = nn.Sequential(
            nn.Conv1d(in_channels=intermediate_channels, out_channels=channels, kernel_size=3, padding=1),
            nn.ReLU(),
        )
        self.conv4 = nn.Sequential(
            nn.Conv1d(in_channels=intermediate_channels, out_channels=1, kernel_size=3, padding=1),
            nn.Sigmoid(),
        )

    def forward(self, x):
        x = self.conv1(x)
        x = self.conv2(x)
        x = self.conv3(x)
        x = self.conv4(x)
        x = x.view(-1, x.size(3))
        x = self.sigmoid(x)
        return x

```

The `forward` method feeds the data through the convolutional layers, then flattens the output and returns it. Sigmoid is just a way to squash the output values in the [0, 1] range, so they match the labeled outputs I'm providing (series of ones and zeros), and make sense as probabilities.

The `forward` method is what makes PyTorch feel really different than TensorFlow. You’re writing real Python code that will actually be executed during training. If errors happen, they will happen in this function, which is code you wrote. You can even add print statements to see the data you’re getting and figure out what’s going on.

> ##### No fully connected layers?
> Most neural networks, even convolutional ones, use one or more “fully-connected” (a.k.a. “dense”) layers, i.e. the simplest kind of layer, where every neuron in the layer is connected to every neuron in the previous layer. The thing about dense layers is that they have no sense of space (hence the name “dense”). Any spatial information is lost. This makes them great for classification tasks, where your output is a series of labels for the whole input. In my case, the output is as sequential as the input. For each point in the input there's a probability value in the output representing whether to split there. So I want to keep the spatial information all the way through. No dense layers here.

> ##### What about RNNs?
> Recurrent neural networks (RNNs) are popular when dealing with sequential data. Roughly speaking, instead of looking at all the input at once, they process the sequence in order and build up a “memory” of what happened before, and use that memory to decide what happens next. This makes them a great fit for any sequence. However, RNNs tend to be way more complex, and as such take more time – and more data – to train. For smaller problems like this, RNNs tend to be overkill. Plus, recent papers have shown that properly designed CNNs can achieve similar results faster than RNNs.

### Training

#### PyTorch Dataset

```python
import json
import torch
from torch.utils.data import Dataset

class PointsDataset(Dataset):
    def __init__(self, csv_file):
        self.examples = json.load(open(csv_file))

    def __len__(self):
        return len(self.examples)

    def __getitem__(self, idx):
        example = self.examples[idx]
        input_tensor = encode(example['points'])
        output_tensor = torch.zeros(number_of_points)
        for split_position in example['splits']:
            index = next(i for i, point in enumerate(example['points']) if point[0] > split_position) - 1
            output_tensor[index] = 1
        return input_tensor, output_tensor

```
We then instantiate our dataset like this:
```python
dataset = PointsDataset(data_file)
```

#### Setting Aside a Validation Set
We need to set aside some of our data to evaluate how our training is doing. This is called a validation set. I like to automatically split out a random subset of examples for this purpose.  PyTorch doesn’t provide an easy way to do that out of the box, so I used Torchnet for this purpose. I installed Torchnet  straight from Git:

```bash
pip install git+https://github.com/pytorch/tnt.git
```

I use Torchnet to shuffle the dataset before splitting it so that the choice is random. I take out 10% of my examples for the validation dataset.

```python{1,4}
from torchnet.dataset import SplitDataset, ShuffleDataset

dataset = PointsDataset(data_file)
dataset = SplitDataset(ShuffleDataset(dataset), {'train': 0.9, 'validation': 0.1})
```

`SplitDataset` will let us switch between the two datasets as we alternate between training and validation later.

> ##### Test set

#### PyTorch DataLoader

One more hoop to jump through before we can actually start training. DataLoders are how you feed a dataset to a neural network during training in PyTorch. Thankfully it’s easy enough:

```python{5}
from torchnet.dataset import SplitDataset, ShuffleDataset

dataset = PointsDataset(data_file)
dataset = SplitDataset(ShuffleDataset(dataset), {'train': 0.9, 'validation': 0.1})
loader = DataLoader(dataset, shuffle=True, batch_size=6)
```

#### The Training Loop

We’re ready to start training!

First we tell our model it’s time to train:

```python
model.train()
```

Then we repeat for a certain number of times (start small and then grow this number later):

```python{3}
model.train()

for epoch in range(1000):
```

Select our training dataset:

```python{4}
model.train()

for epoch in range(1000):
    dataset.select('train')
```
Then iterate over the whole dataset in batches. The data loader will very conveniently give us inputs and outputs for each batch. All we need to do is wrap them in a PyTorch `Variable`.

```python{5-7}
model.train()

for epoch in range(1000):
    dataset.select('train')
    for i, (inputs, target) in enumerate(loader):
        inputs = Variable(inputs)
        target = Variable(target)
```

Now feed the model! The model spits out what it thinks the output should be.

```python{9}
model.train()

for epoch in range(1000):
    dataset.select('train')
    for i, (inputs, target) in enumerate(loader):
        inputs = Variable(inputs)
        target = Variable(target)

        logits = model(inputs)
```

Then I do some fancy math to figure out how far off the model is. Most of the complexity is so that I can ignore (“mask”) the output for points that are just padding. The interesting part is the `F.mse_loss()` call, which is – you guessed it – the mean squared error between the guessed output and what the output should actually be.

```python{11-15}
model.train()

for epoch in range(1000):
    dataset.select('train')
    for i, (inputs, target) in enumerate(loader):
        inputs = Variable(inputs)
        target = Variable(target)

        logits = model(inputs)
        
        mask = inputs.eq(0).sum(dim=1).eq(0)
        float_mask = mask.float()
        masked_logits = logits.mul(float_mask)
        masked_target = target.mul(float_mask)
        loss = F.mse_loss(logits, target)
```

Finally we “backpropagate”, i.e. take that error and use it to correct the weights in the model to be more correct next time. We need an “optimizer” to do this work for us:

```python{2,18-20}
model.train()
optimizer = torch.optim.Adam(model.parameters())

for epoch in range(1000):
    dataset.select('train')
    for i, (inputs, target) in enumerate(loader):
        inputs = Variable(inputs)
        target = Variable(target)

        logits = model(inputs)
        
        mask = inputs.eq(0).sum(dim=1).eq(0)
        float_mask = mask.float()
        masked_logits = logits.mul(float_mask)
        masked_target = target.mul(float_mask)
        loss = F.mse_loss(logits, target)
        
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
```

```python
optimizer = torch.optim.Adam(model.parameters())
dataset = PointsDataset(data_file)
dataset = SplitDataset(ShuffleDataset(dataset), {'train': 0.9, 'validation': 0.1})
loader = DataLoader(dataset, shuffle=True, batch_size=batch_size)

model.train()
for epoch in range(epochs):
    dataset.select('train')
    running_loss = 0.0

    for i, (inputs, target) in enumerate(loader):
        inputs = Variable(inputs)
        target = Variable(target)

        logits = model(inputs)
        #loss = F.multilabel_soft_margin_loss(logits, target)
        mask = inputs.eq(0).sum(dim=1).eq(0)
        float_mask = mask.float()
        masked_logits = logits.mul(float_mask)
        masked_target = target.mul(float_mask)
        loss = F.mse_loss(logits, target)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        running_loss += loss.data[0]


    dataset.select('validation')
    validation_loss, validation_accuracy, correct, total = evaluate(model, next(iter(loader)))

    print '\r[{:4d}] - running loss: {:8.6f} - validation loss: {:8.6f} validation acc: {:7.3f}% ({}/{})'.format(
            epoch + 1,
            running_loss,

            validation_loss,
            validation_accuracy,
            correct,
            total
            ),
    sys.stdout.flush()

    running_loss = 0.0

print('\n')

```

[example output]

> ##### Spot Instances
> Another aside.

### Evaluating

Problem way harder than I thought.

### Deploying

#### Adjustments for ONNX/CoreML

> ##### Casting and reshaping

```python
import torch.nn as nn

input_channels = 2
intermediate_channels = 64

class Model(nn.Module):
    def __init__(self):
        super(Model, self).__init__()

        self.conv1 = nn.Sequential(
            nn.Conv2d(in_channels=input_channels, out_channels=channels, kernel_size=(1, 7), padding=(0, 3)),
            nn.ReLU(),
        )
        self.conv2 = nn.Sequential(
            nn.Conv2d(in_channels=intermediate_channels, out_channels=channels, kernel_size=(1, 5), padding=(0, 2)),
            nn.ReLU(),
        )
        self.conv3 = nn.Sequential(
            nn.Conv2d(in_channels=intermediate_channels, out_channels=channels, kernel_size=(1, 3), padding=(0, 1)),
            nn.ReLU(),
        )
        self.conv4 = nn.Sequential(
            nn.Conv2d(in_channels=intermediate_channels, out_channels=1, kernel_size=(1, 3), padding=(0, 1)),
            nn.Sigmoid(),
        )

    def forward(self, x):
        x = x.view(-1, x.size(1), 1, x.size(2))
        x = self.conv1(x)
        x = self.conv2(x)
        x = self.conv3(x)
        x = self.conv4(x)
        x = x.view(-1, x.size(3))
        x = self.sigmoid(x)
        return x

```

#### ONNX

First we export our trained model as ONNX. We need to provide the export function an example of what the input shape will look like.

```python{4-5}
import torch
from torch.autograd import Variable

dummy_input = Variable(torch.FloatTensor(1, 2, 100))
torch.onnx.export(model, dummy_input, 'SplitModel.proto', verbose=True)
```

#### ONNX-CoreML

To convert the ONNX model to CoreML, we need [ONNX-CoreML](https://github.com/onnx/onnx-coreml).

The version of ONNX-CoreML on pip seems broken, I never got it to work. Install it straight from GitHub:

```bash
pip install git+https://github.com/onnx/onnx-coreml.git
```


> ##### Makefile
> I love writing Makefiles. They’re like READMEs, but easier to run. I need a few dependencies for this project, many of which have weird install procedures. I also like to use `virtualenv` to install Python libraries, but I don’t want to have to remember to activate it. This Makefile does all the above for me. I just run `make train`.
> ```makefile
> VIRTUALENV:=$(shell which virtualenv)
> ENV=env
> SITE_PACKAGES=$(ENV)/lib/python2.7/site-packages
> PYTHON=/usr/bin/python
> LOAD_ENV=source $(ENV)/bin/activate
> 
> env: $(VIRTUALENV)
> 	virtualenv env --python=$(PYTHON)
> 
> $(SITE_PACKAGES)/torch:
> 	$(LOAD_ENV) && pip install http://download.pytorch.org/whl/torch-0.3.0.post4-cp27-none-macosx_10_6_x86_64.whl
> 
> $(SITE_PACKAGES)/onnx_coreml:
> 	$(LOAD_ENV) && pip install git+https://github.com/onnx/onnx-coreml.git
> 
> $(SITE_PACKAGES)/torchnet:
> 	$(LOAD_ENV) && pip install git+https://github.com/pytorch/tnt.git
> 
> SplitModel.mlmodel: env $(SITE_PACKAGES)/torch $(SITE_PACKAGES)/onnx_coreml $(SITE_PACKAGES)/torchnet train.py data.json
> 	$(LOAD_ENV) && python train.py
> 
> train:
> 	@touch data.json
> 	@make SplitModel.mlmodel
> .PHONY: train
> ```

Load our ONNX model back in:

```python{3,7}
import torch
from torch.autograd import Variable
import onnx

dummy_input = Variable(torch.FloatTensor(1, 2, 100))
torch.onnx.export(model, dummy_input, 'SplitModel.proto', verbose=True)
model = onnx.load('SplitModel.proto')
```

And convert it to a CoreML model:

```python{4,9-15}
import torch
from torch.autograd import Variable
import onnx
from onnx_coreml import convert

dummy_input = Variable(torch.FloatTensor(1, 2, 100))
torch.onnx.export(model, dummy_input, 'SplitModel.proto', verbose=True)
model = onnx.load('SplitModel.proto')
coreml_model = convert(
    model,
    'classifier',
    image_input_names=['input'],
    image_output_names=['output'],
    class_labels=[i for i in range(100)],
)
```

Finally, we save the CoreML model to a file:

```python{16}
import torch
from torch.autograd import Variable
import onnx
from onnx_coreml import convert

dummy_input = Variable(torch.FloatTensor(1, 2, 100))
torch.onnx.export(model, dummy_input, 'SplitModel.proto', verbose=True)
model = onnx.load('SplitModel.proto')
coreml_model = convert(
    model,
    'classifier',
    image_input_names=['input'],
    image_output_names=['output'],
    class_labels=[i for i in range(100)],
)
coreml_model.save('SplitModel.mlmodel')
```

#### CoreML

Now that we have a trained CoreML model, it’s time to write some Swift code.

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

### Next Steps
#### Closing the Loop

### Conclusion

The full code is available here.
End-to-end. Hope you found this helpful. If you did, get the app (or tell a watch nerd friend). I’m also available for hire for React, React Native, and ML work.


Thanks.