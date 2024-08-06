import {
  DashboardIcon,
  ExclamationTriangleIcon,
  FileTextIcon,
  ImageIcon,
  PersonIcon,
  SpeakerLoudIcon,
} from '@radix-ui/react-icons';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen border-r bg-background">
      <nav className="flex flex-col items-start gap-2 px-6 py-4">
        <NavLink
          to="/"
          className="flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <DashboardIcon className="size-4" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/user"
          className="flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <PersonIcon className="size-4" />
          <span>User</span>
        </NavLink>
        <NavLink
          to="/moment"
          className="flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ImageIcon className="size-4" />
          <span>Moment</span>
        </NavLink>
        <NavLink
          to="/music"
          className="flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <SpeakerLoudIcon className="size-4" />
          <span>Music</span>
        </NavLink>
        <NavLink
          to="/report"
          className="flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ExclamationTriangleIcon className="size-4" />
          <span>Report</span>
        </NavLink>
        <NavLink
          to="/feedback"
          className="flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <FileTextIcon className="size-4" />
          <span>Feedback</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
