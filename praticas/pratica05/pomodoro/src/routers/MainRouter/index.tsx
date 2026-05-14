import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router';
import { AboutPomodoro } from '../../pages/AboutPomodoro';
import { NotFound } from '../../pages/NotFound';
import { Home } from '../../pages/Home';
import { useEffect, type JSX } from 'react';
import { History } from '../../pages/History';
import { Settings } from '../../pages/Settings';
import { Login } from '../../pages/Login';
import { useAuth } from '../../contexts/AuthContext';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { state } = useAuth();
  return state.isAuthenticated ? children : <Navigate to="/" replace />;
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path='/' element={<Login />} />

        {/* Rotas protegidas */}
        <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/history/' element={<PrivateRoute><History /></PrivateRoute>} />
        <Route path='/settings/' element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path='/about-pomodoro/' element={<PrivateRoute><AboutPomodoro /></PrivateRoute>} />

        <Route path='*' element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}