import LogoLeft from '@/assets/images/left.png';
import LogoRight from '@/assets/images/right.png';
import LogoCenter from '@/assets/images/center.png';

const Loading = () => {
  const random = Math.floor(Math.random() * 2) + 1;

  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <div className="relative flex size-32 items-center justify-center *:absolute *:w-32">
        <div className={`${random === 1 ? 'animate-logo-left-1' : 'animate-logo-left-2'}`}>
          <img src={LogoLeft} alt="" />
        </div>
        <div className={`${random === 1 ? 'animate-logo-center-1' : 'animate-logo-center-2'}`}>
          <img src={LogoCenter} alt="" className="" />
        </div>
        <div className={`${random === 1 ? 'animate-logo-right-1' : 'animate-logo-right-2'}`}>
          <img src={LogoRight} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
