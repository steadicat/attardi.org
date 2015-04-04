import React from 'react';

const Facts = [
  {color: 'blue', question: 'In the past I worked at', answers: [
    'Facebook',
    'Storehouse',
    'Cloudant'
  ]},
  {color: 'orange', question: 'I studied', answers: [
    'Computer Science',
    'Graphic Design',
    'Interaction Design',
    'Strategic Design'
  ]},
  {color: 'green', question: 'I speak', space: '\n', answers: [
    'English fluently',
    'Italian natively',
    'French adequately',
    'German vaguely',
    'Chinese increasingly'
  ]},
  {color: 'teal', question: 'I am an amateur bar', space: null, answers: [
    'ista', 'itone', 'tender'
  ]},
  {color: 'purple', question: 'I\u2019ve lived in', answers: [
    'Helsinki',
    'Milan',
    'Boston',
    'Pisa',
    <span style={{whiteSpace: 'nowrap'}}>San Francisco</span>,
    'Cologne'
  ]},
  {color: 'orange', question: 'I occasionally write about', space: '\n', answers: [
    ['carfree cities', 'http://strh.se/stU'],
    ['pizza dough', 'http://strh.se/0zC5'],
    ['baking pizza', 'http://strh.se/0zC5'],
    ['investing', '/dilbert-black-swan-portfolio']
  ]},
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
    'singing'
  ]},
  {color: 'blue', question: 'You can reach me on', space: '\n', answers: [
    ['Facebook', 'https://www.facebook.com/attardi'],
    ['Twitter', 'https://www.twitter.com/steadicat'],
    ['Github', 'https://github.com/steadicat'],
    ['Email', 'mailto:hi@attardi.org']
  ]}
];

export default Facts;
