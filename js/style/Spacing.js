// Spacing
//
// This defines classes for standard margins and padding, of the type
// '.mts', where each letter defines, respectively, type (margin vs
// padding), direction, and size, as follows.
//
// First character (type):
// m: margin
// p: padding
//
// Second character (direction):
// t: top
// r: right
// b: bottom
// l: left
// h: horizontal (left and right)
// v: vertical (top and bottom)
// a: all
//
// Third character (size):
// s: small (unit * 1)
// m: medium (unit * 2)
// l: large (unit * 4)
// h: huge (unit * 8)
import merge from '../merge';

const unit = 4;
const sizes = {
  s: unit,
  m: unit * 2,
  l: unit * 4,
  h: unit * 8
};
const types = {m: 'margin', p: 'padding'};
const directions = {t: 'Top', r: 'Right', b: 'Bottom', l: 'Left'};

const Spacing = {};
export default Spacing;

for (let s in sizes) {
  const size = sizes[s];
  for (let t in types) {
    const type = types[t];
    for (let d in directions) {
      const direction = directions[d];
      Spacing[t + d + s] = {[type + direction]: size};
    }
    Spacing[t + 'h' + s] = merge(Spacing[t + 'l' + s], Spacing[t + 'r' + s]);
    Spacing[t + 'v' + s] = merge(Spacing[t + 't' + s], Spacing[t + 'b' + s]);
    Spacing[t + 'a' + s] = merge(Spacing[t + 'h' + s], Spacing[t + 'v' + s]);
  }
}
