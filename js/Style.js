import merge from './merge';
import Reset from './style/Reset';
import Typography from './style/Typography';
import Colors from './style/Colors';
import Borders from './style/Borders';
import Layout from './style/Layout';
import Spacing from './style/Spacing';
import Main from './style/Main';

const Style = merge(
  Reset,
  Typography,
  Colors,
  Borders,
  Layout,
  Spacing,
  Main
);

Style.default = merge(Colors.default, Typography.default);

export default Style;
