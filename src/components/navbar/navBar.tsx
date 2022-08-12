import {
  Navbar,
  Group,
  Text,
  Title,
  Space,
  Divider,
  Drawer,
  Button,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { useState } from "react";
import { Creature } from "../../models/creature";
import SkillCheckApp from "../skillCheckApp/skillCheckApp";
import DiceDrawer from "./diceDrawer/diceDrawer";
import NavLinks from "./navLinks";

export type NavBarProps = {
  party: Array<Creature>;
  updateParty: Function;
};

const NavBar = ({ party, updateParty }: NavBarProps) => {
  const [diceDrawerOpened, setDiceDrawerOpened] = useState(false);
  const [skillCheckDrawerOpened, setSkillCheckDrawerOpened] = useState(false);

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      //   hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section>
        <Group position="center">
          <Title order={2}>
            <i className="fa-solid fa-fire nav-icon"></i>I Cast Fireball!
          </Title>
        </Group>
        <Space h={"md"} />
        <Divider size={"sm"} />
        <Space h={"md"} />
      </Navbar.Section>
      <Navbar.Section className="navlinks" grow mt="md">
        <NavLinks />
      </Navbar.Section>
      <Navbar.Section>
        <Divider size={"sm"} />
        <Space h={"md"} />

        <Drawer
          opened={diceDrawerOpened}
          onClose={() => setDiceDrawerOpened(false)}
          title="Dice Roller"
          padding="xl"
          size="md"
        >
          <DiceDrawer />
        </Drawer>

        <Drawer
          opened={skillCheckDrawerOpened}
          onClose={() => setSkillCheckDrawerOpened(false)}
          title="Skill Check"
          padding="xl"
          size="800px"
        >
          <SkillCheckApp party={party} updateParty={updateParty} />
        </Drawer>

        <Group position="center">
          <Tooltip label="Party Skill Checks">
            <ActionIcon
              onClick={() => setSkillCheckDrawerOpened(true)}
              size={"xl"}
            >
              <i className="fa-solid fa-eye"></i>
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Dice Roller">
            <ActionIcon onClick={() => setDiceDrawerOpened(true)} size={"xl"}>
              <i className="fa-solid fa-dice-d20"></i>
            </ActionIcon>
          </Tooltip>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
};

export default NavBar;
