import { Textarea } from '@mantine/core';
import { Custom } from '../../../models/creatures/custom';

export type MiscConfigProps = {
  misc: Custom[];
  updateMisc: Function;
};

const MiscConfig = ({ misc, updateMisc }: MiscConfigProps) => {
  const updateVillainsFromHeroInits = (e: any) => {
    let newCustoms: Custom[] = [];
    if (e.target.value !== undefined && e.target.value !== '') {
      let rolls = e.target.value.split(/[\s,;]+/);

      for (let i = 0; i < rolls.length; i++) {
        const roll = parseInt(rolls[i].toString());
        let newMisc = new Custom();

        newMisc.initiative = roll;
        newCustoms.push(newMisc);
      }

      updateMisc(newCustoms);
    }
  };

  return (
    <>
      <Textarea
        placeholder="3, 14, 20*..."
        label="Custom Initiatives"
        onChange={updateVillainsFromHeroInits}
      />

      <p>{misc.map((custom) => custom.name + ' ')}</p>
    </>
  );
};

export default MiscConfig;
