import { useRoutes } from 'react-router-dom';
import Login from './pages/Login/Login';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const App = () => {
  const router = useRoutes([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ]);

  return router;
};

export default App;
