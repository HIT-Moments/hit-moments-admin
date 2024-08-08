import { convertDate } from '@/utils/convertDate';

const MomentDetail = ({ moment, onClose }) => {
  if (!moment) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center bg-primaryDark-10 bg-opacity-20"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col gap-4 rounded-3xl bg-primaryLight-10 p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex justify-center text-primaryLight-10">
          <img src={moment.image} alt="" className="size-96 rounded-3xl object-cover" />
          {(moment.content || moment.weather || moment.location) && (
            <span className="absolute bottom-4 rounded-full bg-primaryDark-10 bg-opacity-80 px-4 py-2">
              {moment.content || moment.weather || moment.location}
            </span>
          )}
        </div>
        <div className="flex flex-col items-center gap-2 text-xl">
          <span className="font-bold">{moment.user.fullname}</span>
          <span>{convertDate(moment.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default MomentDetail;
