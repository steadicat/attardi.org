import React from 'react';
React;

const Facts = [
  {color: 'blue', question: 'In the past I worked at',
    answers: [
      'Facebook',
      'Storehouse',
      'Cloudant',
    ],
  },
  {color: 'orange', question: 'I studied', answers: [
      'Computer Science',
      'Graphic Design',
      'Interaction Design',
      'Strategic Design',
    ],
  },
  {color: 'green', question: 'I speak', space: '\n', answers: [
      'English fluently',
      'Italian natively',
      'French adequately',
      'German vaguely',
      'Chinese increasingly',
    ],
  },
  {color: 'teal', question: 'I am an amateur bar', space: null, answers: [
      'ista', 'itone', 'tender',
    ],
  },
  {color: 'orange', question: 'I\u2019ve lived in', answers: [
      'Helsinki',
      'Milan',
      'Boston',
      'Pisa',
      <span style={{whiteSpace: 'nowrap'}}>San Francisco</span>,
      'Cologne',
    ],
  },
  {color: 'purple', question: 'I occasionally write about', space: '\n', answers: [
      ['carfree cities', 'https://storehouse.co/stories/s996'],
      ['pizza dough', 'https://storehouse.co/stories/l6fd'],
      ['baking pizza', 'https://storehouse.co/stories/l9fg'],
      ['investing', '/dilbert-black-swan-portfolio'],
    ],
  },
  {color: 'gray', question: 'I get excited about', space: '\n', answers: [
      'site speed',
      'React.js',
      'DNS',
      'design polish',
      'dev tools',
      'design tools',
      'branding',
      'devops',
      'espresso',
      'cats',
      'singing',
    ],
  },
  {color: 'blue', question: 'You can reach me on', space: '\n', answers: [
      ['Facebook', 'https://www.facebook.com/attardi'],
      ['Twitter', 'https://www.twitter.com/steadicat'],
      ['Github', 'https://github.com/steadicat'],
      ['Email', '/email'],
    ],
  },
];

export default Facts;
