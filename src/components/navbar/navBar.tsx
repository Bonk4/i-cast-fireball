import { Navbar, Group, Text, Title, Space, Divider } from '@mantine/core';
import NavLinks from './navLinks';

const NavBar = () => {
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
        <Space h={'md'} />
        <Divider size={'sm'} />
        <Space h={'md'} />
      </Navbar.Section>
      <Navbar.Section className="navlinks" grow mt="md">
        <NavLinks />
      </Navbar.Section>
      <Navbar.Section>
        <Divider size={'sm'} />
        <Space h={'md'} />
        <Text>Simple Initiative Tracker</Text>
      </Navbar.Section>
    </Navbar>
  );
};

export default NavBar;
