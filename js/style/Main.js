import merge from '../merge';
import Layout from './Layout';

const Main = {};
export default Main;

// Cursors
Main.pointer = {cursor: 'pointer'};
Main.arrow = {cursor: 'default'};

// Transitions
Main.tWidth = {transition: 'width 0.1s'};
Main.tHeight = {transition: 'height 0.2s ease-out'};
Main.tOpacity = {transition: 'opacity 0.6s'};

Main.card = {width: 210, height: 240};

const is2x = true; //typeof devicePixelRatio !== 'undefined' && devicePixelRatio >= 2;
const image = is2x ? 'url(/img/pic@2x.jpg)' : 'url(/img/pic.jpg)';

Main.pic = merge(
  Layout.ib,
  {
    background: `${image} no-repeat center center`,
    backgroundSize: '131px 131px',
    width: 131,
    height: 131
  }
);
