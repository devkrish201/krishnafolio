export interface LifeMemory {
  id: number;
  title: string;
  category: string;
  description: string;
  tag: string;
}

export const LIFE_MEMORIES: LifeMemory[] = [
  { id: 1, title: "Brooklyn Bridge at Dusk", category: "Travel", description: "Walking above the East River under a misty autumn skyline, listening to the hum of the city.", tag: "New York" },
  { id: 2, title: "Textiles & Architecture", category: "Craft", description: "Getting lost in intricate Indian stepwells, handloom weaves, and traditional block printing.", tag: "Heritage" },
  { id: 3, title: "Crochet & Handcrafts", category: "Making", description: "Shaping small characters and tactile figures with wool and yarn on quiet Sunday afternoons.", tag: "Handmade" },
  { id: 4, title: "Culinary Experiments", category: "Cooking", description: "Slow-cooked recipes, aromatic spices, and discovering new flavor balances from across cultures.", tag: "Food" },
  { id: 5, title: "Street Sketching & Doodling", category: "Art", description: "Quick ink sketches in pocket notebooks—capturing the quirks of people, signs, and corners.", tag: "Sketchbook" },
  { id: 6, title: "Outdoor Swims & Greenery", category: "Life", description: "Early morning laps in outdoor pools surrounded by tall trees and crisp mountain air.", tag: "Reset" },
];

