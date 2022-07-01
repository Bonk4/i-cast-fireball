import { Textarea } from '@mantine/core';
import { Villain } from '../../../models/creatures/villain';

export type VillainConfigProps = {
  villains: Villain[];
  updateVillains: Function;
};

const VillainConfig = ({ villains, updateVillains }: VillainConfigProps) => {
  const updateVillainsFromHeroInits = (e: any) => {
    let newVillains: Villain[] = [];
    if (e.target.value !== undefined && e.target.value !== '') {
      let rolls = e.target.value.split(/[\s,;]+/);

      for (let i = 0; i < rolls.length; i++) {
        const roll = parseInt(rolls[i].toString());
        let newVillain = new Villain();

        newVillain.initiative = roll;
        newVillains.push(newVillain);
      }

      updateVillains(newVillains);
    }
  };

  return (
    <>
      <Textarea
        placeholder="3, 14, 20*..."
        label="Villain Initiatives"
        onChange={updateVillainsFromHeroInits}
      />

      <p>{villains.map((villain) => villain.name + ' ')}</p>
    </>
  );
};

export default VillainConfig;
