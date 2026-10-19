export const config = {
  herName: "Htet",
  herFullName: "Htet Kay Zin Linn",
  fromName: "Zwe",
};

export const BIRTH = new Date(2001, 9, 20);
export const ANNIVERSARY = new Date(2024, 1, 12);
export const TURNING = new Date(2026, 9, 20, 0, 0, 0, 0);
export const AGE = 25;

export const birthLabel = BIRTH.toLocaleDateString("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const anniLabel = ANNIVERSARY.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function yearsTogether(asOf = new Date()) {
  let years = asOf.getFullYear() - ANNIVERSARY.getFullYear();
  const month = asOf.getMonth() - ANNIVERSARY.getMonth();
  if (month < 0 || (month === 0 && asOf.getDate() < ANNIVERSARY.getDate())) years -= 1;
  return Math.max(0, years);
}

export const pinks = [
  ["#ffd9e4", "Blush"],
  ["#ffb3c9", "Petal"],
  ["#ff8aab", "Ribbon"],
  ["#e4376a", "Rose"],
  ["#9d1d45", "Berry"],
];

// Photos live in src/assets/images as 1.jpg, 2.jpg, …
export const photos = [
  { slot: 1, caption: "", alt: "A photo of Htet", tilt: -4 },
  { slot: 2, caption: "", alt: "A photo of Htet", tilt: 3 },
  { slot: 3, caption: "", alt: "A photo of Htet", tilt: -2 },
  { slot: 4, caption: "", alt: "A photo of Htet", tilt: 5 },
  { slot: 5, caption: "", alt: "A photo of Htet", tilt: -3 },
  { slot: 6, caption: "", alt: "A photo of Htet", tilt: 2 },
];

export const elements = [
  {
    n: 1,
    symbol: "H",
    name: "Hydrogen",
    note: "H for Htet. The first letter. The first element. Everything good starts this small, and this important.",
  },
  {
    n: 2,
    symbol: "He",
    name: "Helium",
    note: "Lighter than air. Heavy days lift when she walks into them.",
  },
  {
    n: 6,
    symbol: "C",
    name: "Carbon",
    note: "Life’s favorite building block. Days hold together the same way when she is near.",
  },
  {
    n: 8,
    symbol: "O",
    name: "Oxygen",
    note: "Quiet, essential, everywhere. The day works because Htet is in it.",
  },
  {
    n: 10,
    symbol: "Ne",
    name: "Neon",
    note: "Not loud for the sake of it. Just impossible to miss.",
  },
  {
    n: 12,
    symbol: "Mg",
    name: "Magnesium",
    note: "A clean, bright flare. Her, when the afternoon needs energy.",
  },
  {
    n: 15,
    symbol: "P",
    name: "Phosphorus",
    note: "The spark inside a good question, a laugh, a sudden plan.",
  },
  {
    n: 20,
    symbol: "Ca",
    name: "Calcium",
    note: "Bones and stamina. The reason she can keep going when everyone else sits down.",
  },
  {
    n: 22,
    symbol: "Ti",
    name: "Titanium",
    note: "Strong, light, and very hard to wear down.",
  },
  {
    n: 26,
    symbol: "Fe",
    name: "Iron",
    note: "She shows up. For the fun, for the hard parts, then again tomorrow.",
  },
  {
    n: 29,
    symbol: "Cu",
    name: "Copper",
    note: "Warmth conducts. You feel it before she even says hello.",
  },
  {
    n: 79,
    symbol: "Au",
    name: "Gold",
    note: "Rare. Soft enough to love gently, and tough enough to last. Like Htet Kay Zin Linn.",
  },
];

export const reagents = [
  {
    id: "pink",
    name: "Pink",
    amount: "250 ml",
    detail: "Highly concentrated. Ties itself into bows if left alone.",
  },
  {
    id: "curiosity",
    name: "Curiosity",
    amount: "1 question",
    detail: "The active ingredient in every good day.",
  },
  {
    id: "motion",
    name: "Kinetic energy",
    amount: "constant",
    detail: "You don’t sit still for long — and I wouldn’t want you to.",
  },
];

export const motionLines = [
  "Htet",
  "on her feet",
  "hands up",
  "pink shoes",
  "why though",
  "ribbon light",
  "try it again",
  "look closely",
  "never still",
  "Saturday child",
  "twenty-five",
  "loud laugh",
  "12 Feb",
  "full speed",
];

export const wishes = [
  "May pink find you in ordinary Tuesdays.",
  "May your feet stay quicker than the calendar.",
  "May your energy outlast the messiest afternoon.",
  "May someone save you the strawberry on the cake.",
  "May your laugh be the loudest safe sound in the room.",
  "May you keep moving toward light, people, and fun.",
  "May rest feel as earned as motion.",
  "May you be celebrated the way you celebrate small joys.",
  "May this year open like a clear sky after rain.",
  "May your heart stay open and your plans stay playful.",
  "May you find a new favorite shade of pink.",
  "May the 20th of October always feel like a beginning.",
  "May you be loved loudly and gently at the same time.",
  "May your body stay strong and your mind stay curious.",
  "May Monday morning still feel a little like an adventure.",
  "May 12 February always feel like home.",
  "May every good question lead you somewhere bright.",
  "May soft color keep finding its way to you.",
  "May calm arrive exactly when you need it.",
  "May your favorite people keep choosing you back.",
  "May music find you mid-step, already dancing.",
  "May quiet evenings be as sweet as busy ones.",
  "May you never run out of reasons to smile first.",
  "May someone always remember the little things.",
  "May twenty-five feel as alive as you are, Htet.",
];

export const letter = [
  "Twenty-five years ago, on a Saturday in October, the world got Htet Kay Zin Linn. Louder. Brighter. Much harder to sit still around. I am glad it did.",
  "You move through a day like it belongs to you. Pink light. Quick feet. A laugh that fills the room before anyone else is ready.",
  "Since 12 February 2024, my days have had a better center of gravity. I tried to pack a fraction of the way you light a day into these pages.",
  "It still isn’t enough. So let this say it clearly, on the record: happy 25th birthday, Htet.",
  "I hope this year feels like your favorite kind of afternoon. Soft color, a good question, and nowhere you are supposed to sit still.",
];

export const NAV = [
  ["hello", "Hello"],
  ["photos", "Photos"],
  ["elements", "Elements"],
  ["orbit", "Orbit"],
  ["capy", "Capy"],
  ["libra", "Libra"],
  ["puzzles", "Play"],
  ["lab", "Mix"],
  ["motion", "Motion"],
  ["wishes", "Wishes"],
  ["letter", "Letter"],
  ["cake", "Cake"],
];
