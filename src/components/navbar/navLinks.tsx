import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { Link } from 'react-router-dom';

export class NavLink {
  constructor(displayName: string, url: string, logo?: string) {
    this.displayName = displayName;
    this.url = url;
    if (logo) this.logo = logo;
  }
  displayName: string = '';
  url: string = '';
  logo: string = '';
}

const NavLinks = () => {
  const color: string = 'dark';
  const links = [
    new NavLink(
      'Dungeons & Dragons',
      'd20',
      '<i class="fa-solid fa-shield"></i>',
    ),
    new NavLink(
      'Space Pickle',
      'teams',
      '<i class="fa-solid fa-crosshairs"></i>',
    ),
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
              <div dangerouslySetInnerHTML={{ __html: link.logo }}></div>
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
