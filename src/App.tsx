import './App.css';
import React, { useState } from 'react';
import {
  AppShell,
  Aside,
  Burger,
  Divider,
  Footer,
  Group,
  Header,
  MantineProvider,
  MediaQuery,
  Navbar,
  Space,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import DndApp from './components/dndApp/dndApp';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import SpacePickleApp from './components/spacePickleApp/spacePickleApp';
import NavLinks from './components/navLinks';

function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <MantineProvider
          theme={{ colorScheme: 'dark' }}
          withGlobalStyles
          withNormalizeCSS
        >
          <AppShell
            styles={{
              main: {
                background: theme.colors.dark[8],
              },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            navbar={
              <Navbar
                p="md"
                hiddenBreakpoint="sm"
                hidden={!opened}
                width={{ sm: 200, lg: 300 }}
              >
                <Navbar.Section>
                  <Group position="center">
                    <Title order={2}>I Cast Fireball!</Title>
                  </Group>
                  <Space h={'md'} />
                  <Divider size={'sm'} />
                  <Space h={'md'} />
                </Navbar.Section>
                <Navbar.Section className="navlinks">
                  <NavLinks />
                </Navbar.Section>
              </Navbar>
            }
          >
            {/* Page Outlet */}
            <Routes>
              <Route path="/" element={<DndApp />} />
              <Route path="d20" element={<DndApp />} />
              <Route path="teams" element={<SpacePickleApp />} />
            </Routes>
            {/* End of Page Outlet */}
          </AppShell>
        </MantineProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
