import React from "react";
import classNames from "classnames";
import { Creature } from "../../../models/creature";
import { Hero } from "../../../models/creatures/hero";
import { Villain } from "../../../models/creatures/villain";

type Props = {
    creatures: Creature[]
};

export class InitiativeTracker extends React.Component<Props> {

    sortedInitiative: Creature[] = [];

    removeCreature = (e: any, target: Creature) => {
        target.display = false;
        this.setState({});
    }

    refresh() {
        this.sortedInitiative.forEach(x => x.display = true);
    }

    sortInitiative(creaturesToSort: Creature[]): Creature[] {
        this.sortedInitiative = 
        creaturesToSort.sort(
            // sort initiative score high to low
            function(a, b) {
                let keyA = a.initiative,
                    keyB = b.initiative;

                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            }
        );

        return this.sortedInitiative;
    }

    moveUp = (e: any, creature: Creature) => {
        const index = this.sortedInitiative.findIndex(gotcha => {
            return gotcha.name === creature.name && gotcha.initiative === creature.ac;
          });
        
          this.array_move(index, index - 1);
    }

    moveDown = (e: any, creature: Creature) => {
        debugger;
        const index = this.sortedInitiative.findIndex(gotcha => {
            return gotcha.name === creature.name && gotcha.initiative === creature.initiative;
          });
        
          this.array_move(index, index + 1);
    }

    array_move(fromIndex: number, toIndex: number) {

        var element = this.sortedInitiative[fromIndex];

        this.sortedInitiative.splice(fromIndex, 1);
        this.sortedInitiative.splice(toIndex, 0, element);

        this.setState({sortedInitiative: this.sortedInitiative});
    };

    render() {
        return (
            <ul className="theInitiative text-start">
                { this.getInitiative() }
            </ul>
        );
    }

    getInitiative() {
        console.log(this.props.creatures);
        this.sortInitiative(this.props.creatures);

        return this.sortedInitiative
            .map((creature: Creature) =>

                // randomize id for attr friendliness
                <li key={creature.name + Math.floor(1000 + Math.random() * 9000)}>

                    <div className={ classNames({
                            "card mt-2": true, 
                            "hero-card": creature instanceof Hero,
                            "villain-card": creature instanceof Villain,
                            "d-none": !creature.display 
                        }) }>

                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <h5>
                                        <input type="text" 
                                            defaultValue={creature.name} 
                                            className={ classNames({
                                                "form-input": true, 
                                                "creature-name": true
                                            }) } />
                                    </h5>
                                    <h6 className="card-subtitle mt-2 text-muted">Initiative: {creature.initiative}</h6>
                                </div>

                                <div className="col-3">
                                    <h2 className="text-end form-floating">
                                        <img src="shield_icon.svg" className="ac-shield-icon"></img>
                                        <input type="text" 
                                            defaultValue={creature.ac} 
                                            className={ classNames({
                                                "form-input": true, 
                                                "w-100": true,
                                                "text-end": true,
                                                "ac-number": true
                                            }) }/>
                                    </h2>
                                </div>
                            </div>
                            <h5 className="card-title">
                            </h5>

                            <div className="row">
                                <div className="col-10">
                                    <p className="card-text">
                                        <textarea className="creature-notes" defaultValue="Notes" />
                                    </p>
                                </div>
                                <div className="col-2">
                                    <img src="/skull_icon.svg" 
                                        className="btn-skull-logo float-end" alt="skull icon"
                                        onClick={ (e) => this.removeCreature(e, creature) }></img>
                                </div>
                            </div>

                            <div className="row d-none">
                                <div className="col-2">
                                    <span className="move-up-icon" onClick={(e) => this.moveUp(e, creature)}>
                                        +
                                    </span>
                                </div>
                                <div className="col-2">
                                    <span className="move-down-icon" onClick={(e) => this.moveDown(e, creature)}>
                                        -
                                    </span>
                                </div>
                                <div className="col-8"></div>
                            </div>
                            
                        </div>
                    </div>
                </li>
        );
    } 
}