import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { Link } from 'react-router-dom';

export class NavLink {
  constructor(displayName: string, url: string) {
    this.displayName = displayName;
    this.url = url;
  }
  displayName: string = '';
  url: string = '';
}

const NavLinks = () => {
  const color: string = 'dark';
  const links = [
    new NavLink('Dungeons & Dragons', 'd20'),
    new NavLink('Space Pickle', 'teams'),
  ];

  return (
    <>
      {links.map((link) => (
        <Link to={link.url}>
          <UnstyledButton
            sx={(theme) => ({
              display: 'block',
              width: '100%',
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[0]
                  : theme.black,
              textTransform: 'none',

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
              },
            })}
          >
            <Group>
              <Text className="navlinks" size="lg" underline={false}>
                {link.displayName}
              </Text>
            </Group>
          </UnstyledButton>
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
