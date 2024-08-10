import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

const Card = ({ title, icon, color, total }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  if (isLoading) {
    return (
      <Skeleton className={`flex h-56 min-w-52`}>
        <div className="hidden bg-moment bg-music text-moment text-music text-primaryLight-100 text-success"></div>
      </Skeleton>
    );
  }

  return (
    <div
      className={`flex min-w-52 flex-col items-center gap-4 rounded-lg border border-primaryDark-10 p-4 shadow-lg bg-${color} bg-opacity-20`}
    >
      <div className={`text-${color}`}>{icon}</div>
      <div className="mt-2 text-center text-4xl">{total}</div>
      <div className={`mt-2 text-center text-2xl font-bold text-${color}`}>{title}</div>
    </div>
  );
};

export default Card;
