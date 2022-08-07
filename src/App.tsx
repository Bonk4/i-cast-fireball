import './App.css';
import { useState } from 'react';
import {
  AppShell,
  MantineProvider,
  useMantineTheme,
} from '@mantine/core';
import DndApp from './components/dndApp/dndApp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SpacePickleApp from './components/spacePickleApp/spacePickleApp';
import NavBar from './components/navbar/navBar';
import DndTeamsApp from './components/dndTeamsApp/dndTeamsApp';
import PerceptionApp from './components/perceptionApp/perceptionApp';

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
              <Route path="d20-teams" element={<DndTeamsApp />} />
              <Route path="teams" element={<SpacePickleApp />} />
              <Route path="perception" element={<PerceptionApp />} />
            </Routes>
            {/* End of Page Outlet */}
          </AppShell>
        </MantineProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
