import React from "react";
import { Creature } from "../../../models/creature";
import { Hero } from "../../../models/creatures/hero";
import { Villain } from "../../../models/creatures/villain";

type Props = {
    creatures: Creature[]
};

export class InitiativeTracker extends React.Component<Props> {

    theInitiative: Creature[] = this.props.creatures.sort(
        function(a, b) {
            let keyA = a.initiative,
                keyB = b.initiative;

            // Compare the 2 dates
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        }
    );

    sortInitiative() {
        console.log(this.props.creatures);
        return this.theInitiative.map((creature: Creature) =>
            <li key={creature.name + Math.floor(1000 + Math.random() * 9000)}>{creature.name}: {creature.initiative}</li>
        );
    } 

    render() {

        return (
            <ul>
                { this.sortInitiative() }
            </ul>
        );
    }
}