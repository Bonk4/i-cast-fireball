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
import NavBar from './components/navbar/navBar';

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
            navbar={<NavBar />}
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
