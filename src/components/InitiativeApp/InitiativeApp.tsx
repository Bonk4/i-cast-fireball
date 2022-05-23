import React from "react";
import { HeroNames } from "../../data/heroNames";
import { VillainNames } from "../../data/villainNames";
import { Creature } from "../../models/creature";
import { Hero } from "../../models/creatures/hero";
import { Villain } from "../../models/creatures/villain";
import { InitiativeTracker } from "./initiativeTracker/initiativeTracker";

export class InitiativeApp extends React.Component {
    creatures: Creature[] = [];
    heroes: Hero[] = [];
    villains: Villain[] = [];
    simpleHeroes: boolean = true;
    simpleVillains: boolean = true;

    rollForInitiative = () => {
        this.clearInitiative();
        
        this.creatures = this.heroes.concat(this.villains);
        this.setState({creatures: this.creatures });
    }

    clearHeroes = () => {
        this.heroes = [];
    }
    
    clearVillains = () => {
        this.villains = [];
    }

    clearInitiative = () => {
        this.creatures = [];
        this.setState({creatures: this.creatures });
    }

    updateHeroes = (heroRolls: string) => {
        this.clearHeroes();

        let rolls = heroRolls.split(/[\s,]+/);

        for(let i = 0; i < rolls.length; i++) {
            if (rolls[i] !== '' && rolls[i] !== undefined){
                let goodGuy = new Hero();
                goodGuy.name = HeroNames.GetHeroName();
                goodGuy.initiative = parseInt(rolls[i]);
                
                this.heroes.push(goodGuy);
            }
        }
    }

    updateVillains = (villianRolls: string) => {
        this.villains = [];

        let rolls = villianRolls.split(/[\s,]+/);

        for(let i = 0; i < rolls.length; i++) {
            if (rolls[i] != '' && rolls[i] !== undefined) {
                let badGuy = new Villain();
                badGuy.name = VillainNames.GetVillainName();
                badGuy.initiative = parseInt(rolls[i]);
                
                this.villains.push(badGuy);
            }
        }
    }

    simpleHeroMode = (e: any, test: boolean) => {
        this.simpleHeroes = e.target.checked;
        console.log(this.simpleHeroes);
    }

    simpleVillainMode = (e: any, test: boolean) => {
        this.simpleVillains = e.target.checked;
        console.log(this.simpleHeroes);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-lg">

                        {/* Heroes List */}
                        <div className="form-check form-switch">
                            <label className="form-check-label" htmlFor="simpleHeroes">Simple input mode</label>
                            <input className="form-check-input" type="checkbox" role="switch" id="simpleHeroes" onChange={(e) => this.simpleHeroMode(e, this.simpleHeroes)} defaultChecked={this.simpleHeroes } />
                        </div>

                        <div className="input-group">
                            <span className="input-group-text">Party Rolls</span>

                            <textarea id="partyRolls" className="form-control" aria-label="With textarea"
                                onChange={ event => this.updateHeroes(event.target.value) } >
                            </textarea>
                        </div>

                    </div>

                    <div className="col-lg">
                        <InitiativeTracker creatures={ this.creatures } />

                        <button className="btn btn-secondary me-3" onClick={this.clearInitiative}>Clear</button>
                        <button className="btn btn-danger btn-fireball" onClick={this.rollForInitiative}>
                            Roll For Initiative!
                            <img src="/Fireball.svg" className="btn-fireball-logo"></img>
                        </button>
                    </div>

                    <div className="col-lg">

                        {/* Villains List */}
                        <div className="form-check form-switch">
                            <label className="form-check-label" htmlFor="simpleVillains">Simple input mode</label>
                            <input className="form-check-input" type="checkbox" role="switch" id="simpleVillains" onChange={(e) => this.simpleVillainMode(e, this.simpleHeroes)} defaultChecked={this.simpleVillains } />
                        </div>

                        <div className="input-group">
                            <span className="input-group-text">Villain Rolls</span>
                            <textarea id="villainRolls" className="form-control" aria-label="With textarea"
                                onChange={ event => this.updateVillains(event.target.value) } >
                            </textarea>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}