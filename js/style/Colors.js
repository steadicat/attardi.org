import merge from '../merge';

const colors = {
  white: '#fff',
  purple: '#A62377',
  teal: '#0FC6C0',
  blue: '#4D7F99',
  green: '#A6C104',
  orange: '#DA7049',
  gray: '#5F5F5F',
  lightGray: '#ccc',
  black: '#333',
  trans: 'rgba(255,255,255,0)',
};

const Colors = {};
export default Colors;

for (let name in colors) {
  const color = colors[name];
  Colors[name] = {color: color};
  Colors[`${name}Border`] = {borderStyle: 'solid', borderColor: `${color}`};
  Colors[`${name}Bg`] = {background: color};
}

Colors.default = Colors.black;
Colors.linkColor = merge(
  Colors.lightGray,
  {borderBottom: '1px solid #ccc'}
);
