import React from "react";
import classNames from "classnames";
import { Creature } from "../../../models/creature";
import { Hero } from "../../../models/creatures/hero";
import { Villain } from "../../../models/creatures/villain";
import { Reminder } from "../../../models/creatures/reminder";

type Props = {
    creatures: Creature[]
};

export class InitiativeTracker extends React.Component<Props> {

    sortedInitiative: Creature[] = [];
    compactView: boolean = false;

    removeCreature = (e: any, target: Creature) => {
        target.display = false;
        this.setState({sortedInitiative: this.sortedInitiative});
    }

    markCreature = (e: any, target: Creature) => {
        target.marked = !target.marked;
        this.setState({sortedInitiative: this.sortedInitiative});
    }

    refresh() {
        this.sortedInitiative.forEach(x => {
            x.display = true;
            x.critFail = false;
            x.critSuccess = false;
            x.marked = false;
        });
    }

    sortInitiative(creaturesToSort: Creature[]): Creature[] {
        this.sortedInitiative =
            creaturesToSort.sort(
                // sort initiative score high to low
                function (a, b) {
                    let keyA = a.initiative,
                        keyB = b.initiative;

                    // Reminder logic for "always goes first/last" takes priority
                    if(a instanceof Reminder) {
                        let a2 = a as Reminder;
                        if (a2.goesFirst) return -1;
                        if (a2.goesLast) return 1;
                    }

                    if(b instanceof Reminder) {
                        let b2 = b as Reminder;
                        if (b2.goesFirst) return 1;
                        if (b2.goesLast) return -1;
                    }

                    // Next priority is Crit Success/Fail
                    if(a.critFail || a.critSuccess || b.critFail || b.critSuccess) {
                        if (a.critSuccess && b.critSuccess) {
                            return 0;
                        }
                        if (a.critFail || b.critSuccess) return 1;
                        if (b.critFail || a.critSuccess) return -1;
                    }

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

        this.setState({ sortedInitiative: this.sortedInitiative });
    };

    compactViewChanges = (e: any) => {
        this.compactView = e.target.checked;
        this.setState({compactView: this.compactView});
    }

    render() {
        return (
            <div>
                <div className="form-check form-switch ms-5 mt-2 mb-2">
                    <input className="form-check-input float-start" type="checkbox" role="switch" id="chkCompactView" 
                        onChange={this.compactViewChanges}/>

                    <label className="form-check-label float-start" htmlFor="chkCompactView">Compact View</label>
                </div>
                <ul className="theInitiative text-start">
                    {this.getInitiative()}
                </ul>
            </div>
        );
    }

    getInitiative() {
        console.log(this.props.creatures);
        this.sortInitiative(this.props.creatures);

        if (this.sortedInitiative.length === 0)
            return (
                <li>
                    <div className="card" aria-hidden="true">
                        {/* <img src="..." className="card-img-top" alt="..." /> */}
                            <div className="card-body">
                                <h5 className="card-title placeholder-glow">
                                    <span className="placeholder col-6"></span>
                                </h5>
                                <p className="card-text placeholder-glow">
                                    <span className="placeholder col-7"></span>
                                    <span className="placeholder col-4"></span>
                                    <span className="placeholder col-4"></span>
                                    <span className="placeholder col-6"></span>
                                    <span className="placeholder col-8"></span>
                                </p>
                                <a href="#" tabIndex={-1} className="btn btn-primary disabled placeholder col-6">
                                    Awaiting combatants...
                                </a>
                            </div>
                    </div>
                </li>
            )

        return this.sortedInitiative
            .map((creature: Creature) =>

                // randomize id for attr friendliness
                <li key={creature.name + Math.floor(1000 + Math.random() * 9000)}>

                    <div className={classNames({
                        "card mt-2": true,
                        "hero-card": creature instanceof Hero,
                        "villain-card": creature instanceof Villain,
                        "misc-card": creature instanceof Reminder,
                        "d-none": !creature.display,
                        "marked-creature": creature.marked
                    })}>

                        <div className="card-body">
                            <div className="row">
                                <div className="col-1 p-0">
                                    <img src="/bookmark_chevron.svg"
                                        className={classNames({
                                            "btn-bookmark-logo p-0 float-start": true,
                                            "bookmark-active": creature.marked
                                        })}
                                        
                                        alt="bookmark icon"
                                        onClick={(e) => this.markCreature(e, creature)}></img>
                                </div>

                                <div className="col">
                                <h5>
                                        <input type="text"
                                            defaultValue={creature.name}
                                            className={classNames({
                                                "form-input": true,
                                                "creature-name": true
                                            })} />
                                    </h5>
                                    <h6 className="card-subtitle mt-2 text-muted">
                                        {
                                            'Initiative: ' + creature.initiative
                                        }
                                        {
                                            creature.critSuccess ? ' (Critical Success)*' : ''
                                        }
                                        {
                                            creature.critFail ? ' (Critical Failure)*' : ''
                                        }
                                    </h6>
                                </div>

                                <div className="col-3">
                                    
                                    <img src="/close_icon.svg"
                                            className="btn-close-logo float-end" alt="close icon"
                                            onClick={(e) => this.removeCreature(e, creature)}></img>
                                </div>
                            </div>

                            <div className={classNames({
                                                "row": true,
                                                "pt-2": true,
                                                "d-none": this.compactView
                                            })}>

                                <div className="col-8">
                                    <p className="card-text">
                                        <textarea className="creature-notes" defaultValue="Notes" />
                                    </p>
                                </div>
                                <div className="col-4">

                                    <div className="text-end">
                                        {/* <span className={classNames({
                                                "input-group-text": true,
                                                "creature-stats": true,
                                                "fs-4": true
                                            })}
                                            id="inputGroup-sizing-default">AC</span> */}
                                        <img src="shield_icon_fill.svg" className="ac-shield-icon"></img>
                                        <input type="number"
                                            defaultValue={creature.ac}
                                            className={classNames({
                                                "form-control w-50": true,
                                                "creature-stats": true,
                                                "d-inline": true,
                                                "text-center": true,
                                                "fs-4": true
                                            })} />
                                    </div>

                                    <div className="text-end">
                                        {/* <span className="input-group-text creature-stats text-end fs-4" id="inputGroup-sizing-default">HP</span> */}
                                        
                                        <img src="heart_icon.svg" className="hp-heart-icon"></img>
                                        <input type="number"
                                            defaultValue={creature.hp}
                                            className={classNames({
                                                "form-control w-50": true,
                                                "creature-stats": true,
                                                "d-inline": true,
                                                "text-center": true,
                                                "fs-4": true
                                            })} />
                                    </div>
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