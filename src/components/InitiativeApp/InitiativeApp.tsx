import React, { useState } from 'react';
import { HeroNames } from '../../data/heroNames';
import { VillainNames } from '../../data/villainNames';
import { Creature } from '../../models/creature';
import { Hero } from '../../models/creatures/hero';
import { Villain } from '../../models/creatures/villain';
import ReactTooltip from 'react-tooltip';
import { Reminder } from '../../models/creatures/reminder';
import classNames from 'classnames';
import VillainConfig from './villainConfig/villainConfig';

const InitiativeApp = () => {
  let [creatures, updateCreatures] = useState([]);
  let [heroes, updateHeroes] = useState([]);
  let [villains, updateVillains] = useState([]);
  let [misc, updatemisc] = useState([]);
  let [rollForMe, updateRfm] = useState(false);

  return <>hello world!</>;
};

export default InitiativeApp;
