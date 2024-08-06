import { Outlet } from 'react-router-dom';

import Header from '@/common/Header/Header';
import Sidebar from '@/common/Sidebar/Sidebar';

const DefaultLayout = () => {
  return (
    <div>
      <Header />
      <div className="flex size-full">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
