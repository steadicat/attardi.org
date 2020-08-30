const words = [
  "gluttony",
  "sloth",
  "greed",
  "envy",
  "lust",
  "wrath",
  "pride",
  "eden",
  "adam",
  "snake",
  "thorn",
  "apple",
  "indulge",
  "forest",
  "enchanted",
  "transgression",
  "desire",
  "feast",
  "drink",
  "love",
  "garden",
  "passion",
  "forbidden",
  "fruit",
  "vine",
  "luscious",
  "abundance",
];

for (let i = 0; i < 30; i++) {
  const w = [];
  for (let j = 0; j < 3; j++) {
    w.push(words[Math.floor(Math.random() * words.length)]);
  }
  console.log(w.join("-"));
}
