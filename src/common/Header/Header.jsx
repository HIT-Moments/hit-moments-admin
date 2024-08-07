import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import Logo from '@/assets/images/logo.png';
import useGetMe from '@/hooks/useGetMe';
import Loading from '@/components/Loading/Loading';
import { useNavigate } from 'react-router';
import useAuth from '@/store/useAuth';
import { Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { user, logoutState } = useAuth();

  const { isLoading, error } = useGetMe();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    navigate('/login');
  }

  const handleLogout = () => {
    logoutState();
    navigate('/login');
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-neuturalLight-80 px-10 py-2">
      <Link to="https://hitmoments.com/">
        <img src={Logo} alt="" className="size-16" />
      </Link>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="size-12">
              <AvatarImage src={user?.avatar} alt="" />
              <AvatarFallback>HM</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="relative -left-10 w-56 text-lg">
            <DropdownMenuLabel className="text-xl font-bold">{user?.fullname}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                window.open('https://github.com/HIT-Moments', '_blank').focus();
              }}
            >
              Github
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
