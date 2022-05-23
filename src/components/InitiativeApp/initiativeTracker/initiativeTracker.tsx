import React, { MouseEventHandler } from "react";
import classNames from "classnames";
import { Creature } from "../../../models/creature";
import { Hero } from "../../../models/creatures/hero";
import { Villain } from "../../../models/creatures/villain";

type Props = {
    creatures: Creature[]
};

export class InitiativeTracker extends React.Component<Props> {

    removeCreature = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, target: Creature) => {
        target.display = false;
    }

    sortInitiative(creaturesToSort: Creature[]): Creature[] {
        return creaturesToSort.sort(
            // sort initiative score high to low
            function(a, b) {
                let keyA = a.initiative,
                    keyB = b.initiative;

                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            }
        );
    }

    getInitiative() {
        console.log(this.props.creatures);

        return this.sortInitiative(this.props.creatures)
            .map((creature: Creature) =>

                // randomize id for attr friendliness
                <li key={creature.name + Math.floor(1000 + Math.random() * 9000)}>

                    <div className={ classNames({
                            "card mt-1": true, 
                            "hero-card": creature instanceof Hero,
                            "villain-card": creature instanceof Villain,
                            "d-none": !creature.display 
                        }) }>

                        <div className="card-body">
                            <h5 className="card-title">{creature.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Initiative: {creature.initiative}</h6>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            
                            <button className="btn btn-primary" onClick={ (e) => this.removeCreature(e, creature) }>Remove</button>
                        </div>
                    </div>
                </li>
        );
    } 

    render() {
        return (
            <ul className="theInitiative text-start">
                { this.getInitiative() }
            </ul>
        );
    }
}