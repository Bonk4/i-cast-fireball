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

    rollForInitiative = () => {
        this.clearInitiative();
        
        this.creatures = this.heroes.concat(this.villains);
        //console.log(this.creatures);
        this.setState({creatures: this.creatures });
    }

    clearHeroes(){
        this.heroes = [];
    }
    
    clearVillains() {
        this.villains = [];
    }

    clearInitiative(){
        this.creatures = [];
    }

    updateHeroes = (heroRolls: string) => {
        this.clearHeroes();

        let rolls = heroRolls.split(/[\s,]+/);

        for(let i = 0; i < rolls.length; i++) {
            if (rolls[i] != '' && rolls[i] !== undefined){
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

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg">

                        {/* Heroes List */}
                        <div className="input-group">
                            <span className="input-group-text">Party Rolls</span>

                            <textarea id="partyRolls" className="form-control" aria-label="With textarea"
                                onChange={ event => this.updateHeroes(event.target.value) } >
                            </textarea>
                        </div>

                    </div>

                    <div className="col-lg">
                        <button className="btn btn-primary" onClick={this.rollForInitiative}>Roll For Initiative!</button>
                        <InitiativeTracker creatures={ this.creatures } />
                    </div>

                    <div className="col-lg">

                        {/* Villains List */}
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