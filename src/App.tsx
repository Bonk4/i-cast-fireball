import './App.css';
import React, { useState } from 'react';
import {
  AppShell,
  Aside,
  Burger,
  Footer,
  Header,
  MantineProvider,
  MediaQuery,
  Navbar,
  Text,
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
                {/* <Text>Application navbar</Text> */}
                <NavLinks />
              </Navbar>
            }
            // aside={
            //   <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            //     <Aside
            //       p="md"
            //       hiddenBreakpoint="sm"
            //       width={{ sm: 200, lg: 300 }}
            //     >
            //       {/* <Text>Application sidebar</Text> */}
            //     </Aside>
            //   </MediaQuery>
            // }
            // footer={
            //   <Footer height={60} p="md">
            //     Application footer
            //   </Footer>
            // }
            header={
              <Header height={70} p="md">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color={theme.colors.gray[6]}
                      mr="xl"
                    />
                  </MediaQuery>

                  <Text>I Cast Fireball!</Text>
                </div>
              </Header>
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
