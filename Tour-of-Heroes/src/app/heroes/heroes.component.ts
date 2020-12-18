import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero'; // Import Hero interface from file 'hero.ts' in src/app path.
import {HEROES} from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hero: Hero = {
    id: 1,
    name: 'Windstorm' // "The page no longer displays properly because you changed the hero from a string to an object."
  };

  heroes = HEROES;

  selectedHero: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
