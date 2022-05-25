import React from "react";
import { HeroNames } from "../../data/heroNames";
import { VillainNames } from "../../data/villainNames";
import { Creature } from "../../models/creature";
import { Hero } from "../../models/creatures/hero";
import { Villain } from "../../models/creatures/villain";
import { InitiativeTracker } from "./initiativeTracker/initiativeTracker";
import ReactTooltip from 'react-tooltip';
import { Reminder } from "../../models/creatures/reminder";
import classNames from "classnames";

export class InitiativeApp extends React.Component {
    creatures: Creature[] = [];
    heroes: Hero[] = [new Hero()];
    villains: Villain[] = [new Villain()];
    misc: Reminder[] = [];
    rollForMe: boolean = false;

    constructor() {
        super({});
        this.state = {
            creatures: [],
            heroes: [],
            villains: [],
            misc: [],
            rollForMe: false
        }
    }

    rollForInitiative = () => {
        this.clearInitiative();

        if (this.rollForMe)
            this.rollVillainInitiative();

        // this makes sure the initiative "resets" if clicked again
        this.creatures = this.heroes.concat(this.villains).concat(this.misc);
        this.creatures.forEach(x => x.display = true);

        this.setState({ creatures: this.creatures });
    }

    rollVillainInitiative() {
        this.villains.forEach(
            villain => {
                let roll = this.getDiceRoll();
                villain.initiative = roll + villain.bonus;
                if (roll === 1) villain.critFail = true;
                if (roll === 20) villain.critSuccess = true;
                villain.marked = villain.critFail || villain.critSuccess;
            });
    }

    getDiceRoll() {
        let min = Math.ceil(1);
        let max = Math.floor(20);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    clearHeroes = () => {
        this.heroes = [];
    }

    clearVillains = () => {
        this.villains = [];
    }

    clearInitiative = () => {
        if (this.rollForMe) {
            this.villains.forEach(x => {
                x.critFail = false;
                x.critSuccess = false;
                x.marked = false;
            });
        }
        this.creatures = [];
        this.setState({ creatures: this.creatures });
    }

    customName = (e: any, creatureId: number, isVillain: boolean = false) => {
        const index = this.getCreatureIndexById(creatureId, isVillain);
        if (index !== undefined) {
            if (isVillain) {
                this.villains[index].name = e.target.value;
                this.setState({ villains: this.villains });
            } else {
                this.heroes[index].name = e.target.value;
                this.setState({ heroes: this.heroes });
            }
        }
    }

    customAc = (e: any, creatureId: number, isVillain: boolean = false) => {
        const index = this.getCreatureIndexById(creatureId, isVillain);

        if (index !== undefined) {
            if (isVillain) {
                this.villains[index].ac = e.target.value;
                this.setState({ villains: this.villains });
            } else {
                this.heroes[index].ac = e.target.value;
                this.setState({ heroes: this.heroes });
            }
        }
    }

    customInitiative = (e: any, creatureId: number, isVillain: boolean = false) => {
        const newInitiative = parseInt(e.target.value);
        const index = this.getCreatureIndexById(creatureId, isVillain);

        if (index !== undefined) {
            if (isVillain) {
                if (this.rollForMe) {
                    this.villains[index].bonus = newInitiative;
                } else {
                    this.villains[index].initiative = newInitiative;
                }
                this.setState({ villains: this.villains });
            } else {
                this.heroes[index].initiative = newInitiative;
                this.setState({ heroes: this.heroes });
            }
        }
    }

    customCritical = (creatureId: number, option: number, isVillain: boolean = false) => {
        let index = this.getCreatureIndexById(creatureId, isVillain);
        let creature;

        if(index == undefined) return;
        
        if(isVillain){
            creature = this.villains[index];
        } else {
            creature = this.heroes[index];
        }

        if(option === 1) {
            creature.critSuccess = false;
            creature.critFail = false;
            creature.marked = true;
        }

        if(option === 2 || option === 3) {
            creature.critSuccess = option === 2;
            creature.critFail = option === 3;
            creature.marked = true;
        }

        this.setState({heroes: this.heroes, villains: this.villains});
    }

    customReminderName = (e: any, id: number) => {
        const value = e.target.value;
        let reminder = this.misc[this.misc.findIndex(misc => { return misc.id === id })];
        reminder.name = value;
        this.setState({ misc: this.misc });
    }

    reminderInitiative = (e: any, id: number) => {
        const value = e.target.value;
        let reminder = this.misc[this.misc.findIndex(misc => { return misc.id === id })];
        reminder.initiative = value;
        this.setState({ misc: this.misc });
    }

    reminderGoesFirst = (e: any, id: number) => {
        const value = e.target.value;
        let reminder = this.misc[this.misc.findIndex(misc => { return misc.id === id })];
        reminder.goesFirst = value;
        this.setState({ misc: this.misc });
    }

    reminderGoesLast = (e: any, id: number) => {
        const value = e.target.value;
        let reminder = this.misc[this.misc.findIndex(misc => { return misc.id === id })];
        reminder.goesLast = value;
        this.setState({ misc: this.misc });
    }

    reminderOptions = (e: any, id: number) => {
        const option = parseInt(e.target.value);
        let reminder = this.misc[this.misc.findIndex(misc => { return misc.id === id })];
        reminder.goesFirst = option === 2;
        reminder.goesLast = option === 3;
        this.setState({ misc: this.misc });
    }

    addHero = () => {
        this.heroes.push(new Hero());
        this.setState({ heroes: this.heroes });
    }

    addVillain = () => {
        this.villains.push(new Villain());
        this.setState({ villains: this.villains });
    }

    addReminder = () => {
        this.misc.push(new Reminder());
        this.setState({ misc: this.misc });
    }

    removeHero = (id: number) => {
        const index = this.getCreatureIndexById(id);

        if (index !== undefined)
            this.heroes.splice(index, 1);

        this.setState({ heroes: this.heroes });
    }

    removeVillain = (id: number) => {
        const index = this.getCreatureIndexById(id, true);

        if (index !== undefined)
            this.villains.splice(index, 1);

        this.setState({ villains: this.villains });
    }

    removeReminder = (id: number) => {
        let index = this.misc.findIndex(misc => { return misc.id === id });
        this.misc.splice(index, 1);
        this.setState({ misc: this.misc });
    }

    updateHeroes = (heroRolls: string) => {
        this.clearHeroes();

        let rolls = heroRolls.split(/[\s,;]+/);

        for (let i = 0; i < rolls.length; i++) {
            if (rolls[i] !== '' && rolls[i] !== undefined) {
                let roll = parseInt(rolls[i]);
                let critical = rolls[i].indexOf('*') > -1;

                let goodGuy = new Hero();

                if (critical && roll === 20)
                    goodGuy.critSuccess = true;

                if (critical && roll === 1)
                    goodGuy.critFail = true;

                goodGuy.marked = goodGuy.critFail || goodGuy.critSuccess;

                goodGuy.initiative = roll;

                this.heroes.push(goodGuy);
            }
        }
        this.setState({ heroes: this.heroes });
    }

    updateVillains = (villianRolls: string) => {
        this.villains = [];

        let rolls = villianRolls.split(/[\s,;]+/);

        for (let i = 0; i < rolls.length; i++) {
            if (rolls[i] !== '' && rolls[i] !== undefined) {
                let roll = parseInt(rolls[i]);
                let critical = rolls[i].indexOf('*') > -1;

                let badGuy = new Villain();
                badGuy.initiative = roll;

                if (critical && roll === 20)
                    badGuy.critSuccess = true;

                if (critical && roll === 1)
                    badGuy.critFail = true;

                badGuy.marked = badGuy.critFail || badGuy.critSuccess;

                this.villains.push(badGuy);
            }
        }
        this.setState({ villains: this.villains });
    }

    getCreatureIndexById(id: number, isVillain: boolean = false): number | undefined {
        if (isVillain)
            return this.villains.findIndex(villain => { return villain.id === id });

        return this.heroes.findIndex(hero => { return hero.id === id });
    }

    rollForMeChanges = (e: any) => {
        this.rollForMe = e.target.checked;
        this.setState({ rollForMe: this.rollForMe });
    }

    getHeroEditor() {
        return this.heroes
            .map((hero: Hero) => (
                <div>
                    <div className="input-group mb-1">
                        <span className="input-group-text">Character</span>
                        <input id={"custom-hero-" + hero.name} type="text" className="form-control" placeholder="Character" aria-label="Username"
                            value={hero.name} onChange={(e) => this.customName(e, hero.id)} />

                        <span className="input-group-text">AC</span>
                        <input id={"custom-hero-ac-" + hero.ac} type="number" className="form-control" placeholder="Initiative" aria-label="Server"
                            value={hero.ac} onChange={(e) => this.customAc(e, hero.id)} />

                        <span className="input-group-text">Initiative</span>
                        <input id={"custom-hero-initiative-" + hero.initiative} type="number" className="form-control" placeholder="Initiative" aria-label="Server"
                            value={hero.initiative} onChange={(e) => this.customInitiative(e, hero.id)} />

                        <button className="btn btn-outline-danger" type="button" id="button-addon2" onClick={(e) => this.removeHero(hero.id)}>Delete</button>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name={'hero-initiative-radio-' + hero.id} id={'crit-normal-hero-' + hero.id} value="normalInitiative"
                            onChange={(e) => this.customCritical(hero.id, 1)} defaultChecked={true} />
                        <label className="form-check-label" htmlFor={'crit-normal-hero-' + hero.id}>Normal</label>
                    </div>
                    <div className="form-check form-check-inline mb-3">
                        <input className="form-check-input" type="radio" name={'hero-initiative-radio-' + hero.id} id={'crit-success-hero-' + hero.id} value="critSuccess"
                            onChange={(e) => this.customCritical(hero.id, 2)} />
                        <label className="form-check-label" htmlFor={'crit-success-hero-' + hero.id}>Crit Success</label>
                    </div>
                    <div className="form-check form-check-inline mb-3">
                        <input className="form-check-input" type="radio" name={'hero-initiative-radio-' + hero.id} id={'crit-fail-hero-' + hero.id} value="critFail"
                            onChange={(e) => this.customCritical(hero.id, 3)} />
                        <label className="form-check-label" htmlFor={'crit-fail-hero-' + hero.id}>Crit Fail</label>
                    </div>
                </div>
            ));
    }

    getVillainEditor() {
        return this.villains
            .map((villain: Villain) => (
                <div id="custom-villain-form">

                    <div className="input-group mb-3">
                        <span className="input-group-text">Villain</span>
                        <input id={"custom-hero-" + villain.name} type="text" className="form-control" placeholder="Character" aria-label="Username"
                            value={villain.name} onChange={(e) => this.customName(e, villain.id, true)} />

                        <span className="input-group-text">AC</span>
                        <input id={"custom-hero-ac-" + villain.ac} type="number" className="form-control" placeholder="Initiative" aria-label="Server"
                            value={villain.ac} onChange={(e) => this.customAc(e, villain.id, true)} />

                        <span className="input-group-text">{this.rollForMe ? 'Init Bonus' : 'Initiative'}</span>
                        <input id={"custom-hero-initiative-" + villain.initiative} type="number" className="form-control" placeholder="Initiative" aria-label="Server"
                            value={this.rollForMe ? villain.bonus : villain.initiative} onChange={(e) => this.customInitiative(e, villain.id, true)} />

                        <button className="btn btn-outline-danger" type="button" id="button-addon2" onClick={(e) => this.removeVillain(villain.id)}>Delete</button>
                    </div>

                    <div className={classNames({
                                            "d-none": this.rollForMe
                                        })}>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name={'villain-initiative-radio-' + villain.id} id={'crit-normal-villian-' + villain.id} value="normalInitiative"
                                onChange={(e) => this.customCritical(villain.id, 1, true)} defaultChecked={true} />
                            <label className="form-check-label" id={'crit-normal-villian-' + villain.id}>Normal</label>
                        </div>
                        <div className="form-check form-check-inline mb-3">
                            <input className="form-check-input" type="radio" name={'villain-initiative-radio-' + villain.id} id={'crit-success-villian-' + villain.id} value="critSuccess"
                                onChange={(e) => this.customCritical(villain.id, 2, true)} />
                            <label className="form-check-label" id={'crit-success-villian-' + villain.id}>Crit Success</label>
                        </div>
                        <div className="form-check form-check-inline mb-3">
                            <input className="form-check-input" type="radio" name={'villain-initiative-radio-' + villain.id} id={'crit-fail-villian-' + villain.id} value="critFail"
                                onChange={(e) => this.customCritical(villain.id, 3, true)} />
                            <label className="form-check-label" id={'crit-fail-villian-' + villain.id}>Crit Fail</label>
                        </div>
                    </div>
                </div>
            ));
    }

    getMiscEditor() {
        return this.misc
            .map((reminder: Reminder) => (
                <div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Name</span>
                        <input id={"custom-hero-" + reminder.name} type="text" className="form-control" placeholder="Event/NPC" aria-label="Username"
                            value={reminder.name} onChange={(e) => this.customReminderName(e, reminder.id)} />


                        <label className="input-group-text" htmlFor="inputGroupSelect02">Options</label>
                        <select className="form-select" id="inputGroupSelect02" defaultValue={0} onChange={(e) => this.reminderOptions(e, reminder.id)}>
                            <option selected>Custom...</option>
                            <option value="1">Use Initiative Roll</option>
                            <option value="2">Always Goes First</option>
                            <option value="3">Always Goes Last</option>
                        </select>

                        <span className="input-group-text">Initiative</span>
                        <input id={"custom-hero-initiative-" + reminder.initiative} type="number" className="form-control" placeholder="Initiative" aria-label="Server"
                            value={reminder.initiative} onChange={(e) => this.reminderInitiative(e, reminder.id)} />

                        <button className="btn btn-outline-danger" type="button" id="button-addon2" onClick={(e) => this.removeReminder(reminder.id)}>Delete</button>
                    </div>
                </div>
            ));
    }

    render() {
        return (
            <div className="container">
                <ReactTooltip />

                <div className="row mt-3">
                    <div className="col-lg-7">

                        <div className="accordion" id="accordionExample">

                            {/* Heroes List */}
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Party
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">

                                        <ul className="nav nav-pills nav-fill mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="pills-heroes-quick-tab" data-bs-toggle="pill" data-bs-target="#pills-heroes-quick" type="button" role="tab" aria-controls="pills-heroes-quick" aria-selected="true">Quick</button>
                                            </li>

                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-heroes-custom-tab" data-bs-toggle="pill" data-bs-target="#pills-heroes-custom" type="button" role="tab" aria-controls="pills-heroes-custom" aria-selected="false">Custom</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show active" id="pills-heroes-quick" role="tabpanel" aria-labelledby="pills-heroes-quick-tab">
                                                {/* Simple Editor */}
                                                <div className="input-group mt-3 mb-3">
                                                    <span className="input-group-text">
                                                        Party Rolls
                                                    </span>

                                                    <textarea id="partyRolls" className="form-control" aria-label="With textarea"
                                                        onChange={event => this.updateHeroes(event.target.value)} >
                                                    </textarea>

                                                </div>
                                                <p className="fw-light">Just type the initiative rolls your party gives you here {"("}separated by spaces, commas, or lines{")"}, and we'll generate a hero for each result.  Type an * after a 1 or 20 to denote critical rolls.  You can edit names and details afterwards.</p>
                                            </div>

                                            <div className="tab-pane fade" id="pills-heroes-custom" role="tabpanel" aria-labelledby="pills-heroes-custom-tab">
                                                {/* Custom Editor */}

                                                <div className="input-group mt-3 mb-3">
                                                    {this.getHeroEditor()}
                                                </div>

                                                <button className="btn btn-secondary col-6 mx-auto mb-3" type="button" id="btn-add-hero" onClick={this.addHero}>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                        Villains
                                    </button>
                                </h2>

                                <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <ul className="nav nav-pills nav-fill mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="pills-villains-quick-tab" data-bs-toggle="pill" data-bs-target="#pills-villains-quick" type="button" role="tab" aria-controls="pills-villains-quick" aria-selected="true">Quick</button>
                                            </li>

                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-villains-custom-tab" data-bs-toggle="pill" data-bs-target="#pills-villains-custom" type="button" role="tab" aria-controls="pills-villains-custom" aria-selected="false">Custom</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show active" id="pills-villains-quick" role="tabpanel" aria-labelledby="pills-villains-quick-tab">

                                                {/* Villains List */}
                                                <div className="input-group mt-3 mb-3">
                                                    <span className="input-group-text">Villain Rolls</span>
                                                    <textarea id="villainRolls" className="form-control" aria-label="With textarea"
                                                        onChange={event => this.updateVillains(event.target.value)} >
                                                    </textarea>
                                                </div>

                                                <p className="fw-light">Just type the initiative rolls for your villains here {"("}separated by spaces, commas, or lines{")"}, and we'll generate a villain for each result.  Type an * after a 1 or 20 to denote critical rolls.  You can edit the names and details afterwards.</p>
                                            </div>

                                            <div className="tab-pane fade" id="pills-villains-custom" role="tabpanel" aria-labelledby="pills-villains-custom-tab">
                                                {/* Custom Editor */}
                                                <div className="input-group mt-3 mb-3">
                                                    <div className="form-check form-switch mt-3 mb-3">
                                                        <input className="form-check-input float-start" type="checkbox" role="switch" id="rollForMe"
                                                            onChange={this.rollForMeChanges} />
                                                        <label className="form-check-label float-start" htmlFor="flexSwitchCheckDefault">Roll for me?</label>
                                                    </div>

                                                    {this.getVillainEditor()}
                                                </div>

                                                <button className="btn btn-secondary col-6 mx-auto mb-3" type="button" id="btn-add-villain" onClick={this.addVillain}>Add</button>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>

                            {/* Misc */}
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Misc
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">

                                        <div className="input-group mt-3 mb-3">
                                            {this.getMiscEditor()}
                                        </div>

                                        <button className="btn btn-secondary col-6 mx-auto mb-3" type="button" id="btn-add-villain" onClick={this.addReminder}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div id="button-group" className="mt-3 mb-3">
                            <button className="btn btn-outline-secondary me-3" onClick={this.clearInitiative}>Clear</button>
                            <button className="btn btn-danger btn-fireball btn-large" onClick={this.rollForInitiative}>
                                Roll For Initiative!
                                <img src="/Fireball.svg" className="btn-fireball-logo" alt="fireball logo"></img>
                            </button>
                        </div>
                    </div>

                    {/* Initiative Track */}
                    <div className="col-lg">
                        <InitiativeTracker creatures={this.creatures} />
                    </div>
                </div>
            </div>
        );
    }
}