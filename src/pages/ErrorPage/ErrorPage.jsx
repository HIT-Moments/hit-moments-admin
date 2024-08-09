import { Button } from '@/components/ui/button';
import ErrorImg from '../../assets/images/404error.png';
import { useNavigate } from 'react-router';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      <img src={ErrorImg} alt="" className="w-[500px]" />
      <p className="text-5xl font-bold">404 - PAGE NOT FOUND</p>
      <Button className="rounded-full px-10 py-6 text-xl" onClick={() => navigate('/')}>
        Back to home
      </Button>
    </div>
  );
};

export default ErrorPage;
