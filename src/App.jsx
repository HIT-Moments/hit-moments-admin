import { useRoutes } from 'react-router-dom';

import DefaultLayout from '@/layouts/DefaultLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import User from './pages/User/User';
import Moment from './pages/Moment/Moment';
import Music from './pages/Music/Music';
import Report from './pages/Report/Report';
import Feedback from './pages/Feedback/Feedback';

const App = () => {
  const router = useRoutes([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: '/',
          element: <Dashboard />,
        },
        {
          path: '/user',
          element: <User />,
        },
        {
          path: '/moment',
          element: <Moment />,
        },
        {
          path: '/music',
          element: <Music />,
        },
        {
          path: '/report',
          element: <Report />,
        },
        {
          path: '/feedback',
          element: <Feedback />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
    {
      path: '/test',
      element: <Moment />,
    },
  ]);

  return router;
};

export default App;
