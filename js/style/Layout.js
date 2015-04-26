import merge from '../merge';

const Layout = {};
export default Layout;

// Z

Layout.z1 = {position: 'relative', zIndex: 1};
Layout.z100 = {position: 'relative', zIndex: 100};

// Basics

Layout.block = {display: 'block'};
Layout.ib = {display: 'inline-block'};
Layout.borderBox = {boxSizing: 'border-box'};
Layout.rel = {position: 'relative'};
Layout.abs = {position: 'absolute'};
Layout.fixed = {position: 'fixed', transform: 'translateZ(0)'};
Layout.crop = {overflow: 'hidden'};
Layout.scroll = {overflow: 'auto'};
Layout.nowrap = {whitespace: 'nowrap'};
Layout.off = {display: 'none'};

// Alignment

Layout.center = {textAlign: 'center'};
Layout.left = {textAlign: 'left'};
Layout.right = {textAlign: 'right'};
Layout.centered = {marginLeft: 'auto', marginRight: 'auto'};
Layout.mid = {verticalAlign: 'middle'};
Layout.top = {verticalAlign: 'top'};
Layout.bottom = {verticalAlign: 'bottom'};
Layout.valignParent = {display: 'table'};
Layout.valign = {display: 'tableCell', verticalAlign: 'middle'};
Layout.float = {float: 'left'};

// Position

Layout.zero = {top: 0, right: 0, bottom: 0, left: 0};
Layout.topLeft = {top: 0, left: 0};
Layout.topRight = {top: 0, right: 0};
Layout.bottomLeft = {bottom: 0, left: 0};
Layout.bottomRight = {bottom: 0, right: 0};
Layout.offscreen = merge(Layout.abs, {top: -10000});

// Size

Layout.fullWidth = {width: '100%'};
Layout.fullHeight = {height: '100%'};
Layout.fill = merge(Layout.fullWidth, Layout.fullHeight);
