import { Toaster } from '@/components/ui/sonner';
import { useEffect } from 'react';
import { toast } from 'sonner';

const Moment = () => {
  useEffect(() => {
    toast('Đăng nhập thành công', {
      className: 'bg-success text-primaryLight-10 border-l-4 !border-success',
      position: 'top-center',
      duration: 100000,
    });
  }, []);

  return (
    <>
      <Toaster />
    </>
  );
};

export default Moment;
