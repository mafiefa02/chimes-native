import { MainLayout } from './components/main-layout';
import { HomePage } from './pages';
import { NotFoundPage } from './pages/not-found';
import { ScheduleProfilePage } from './pages/schedule-profile';
// import { SettingsPage } from './pages/settings';
// import { SoundsPage } from './pages/sounds';
import { Route, Routes } from 'react-router';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path="/schedule-profile"
          element={<ScheduleProfilePage />}
        />
        {/*<Route
          path="/sounds"
          element={<SoundsPage />}
        />
        <Route
          path="/settings"
          element={<SettingsPage />}
        />*/}
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
};
