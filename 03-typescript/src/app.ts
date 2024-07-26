import { findHeroById } from "./services/hero.service";


const hero = findHeroById(3);

console.log( hero?.name ?? "Hero not found");