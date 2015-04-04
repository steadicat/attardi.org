const Borders = {};
export default Borders;

const border = 2;

Borders.bt = {borderWidth: `${border}px 0 0 0`};

Borders.br = {borderWidth: `0 ${border}px 0 0`};
Borders.bb = {borderWidth: `0 0 ${border}px 0`};
Borders.bl = {borderWidth: `0 0 0 ${border}px`};
Borders.ba = {borderWidth: border};

const radius = 5;

Borders.rounded = {borderRadius: radius};
Borders.roundedBottom = {borderRadius: `0 0 ${radius}px ${radius}px`};
Borders.roundedTop = {borderRadius: `${radius}px ${radius}px 0 0`};
Borders.roundedRb = {borderRadius: `0 ${radius}px ${radius}px ${radius}px`};

