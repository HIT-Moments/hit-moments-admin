import LogoLeft from '@/assets/images/left.png';
import LogoRight from '@/assets/images/right.png';
import LogoCenter from '@/assets/images/center.png';

const Loading = () => {
  const random = Math.floor(Math.random() * 2) + 1;

  const suffix = random === 1 ? '1' : '2';

  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <div className="relative flex size-32 items-center justify-center *:absolute *:w-32">
        <div className={`animate-logo-left-${suffix}`}>
          <img src={LogoLeft} alt="" />
        </div>
        <div className={`animate-logo-center-${suffix}`}>
          <img src={LogoCenter} alt="" className="" />
        </div>
        <div className={`animate-logo-right-${suffix}`}>
          <img src={LogoRight} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
