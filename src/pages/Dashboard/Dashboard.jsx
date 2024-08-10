import Card from '@/components/Card/Card';
import MomentChart from '@/components/Chart/MomentChart';
import useFeedbackActions from '@/hooks/useFeedbackActions';
import useMomentActions from '@/hooks/useMomentActions';
import useMusicActions from '@/hooks/useMusicActions';
import useReportActions from '@/hooks/useReportActions';
import useUserActions from '@/hooks/useUserActions';
import { ExclamationTriangleIcon, FileTextIcon, ImageIcon, PersonIcon, SpeakerLoudIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';

const Dashboard = () => {
  const { totalUser, fetchUsers } = useUserActions();
  const { totalMoment, moments, fetchMoments } = useMomentActions();
  const { totalMusic, searchMusics: fetchMusics } = useMusicActions();
  const { totalReport, fetchReports } = useReportActions();
  const { totalFeedback, fetchFeedbacks } = useFeedbackActions();

  useEffect(() => {
    fetchUsers();
    fetchMoments();
    fetchMusics();
    fetchReports();
    fetchFeedbacks();
  }, [fetchUsers, fetchMoments, fetchMusics, fetchReports, fetchFeedbacks]);

  return (
    <div className="h-full w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Trang tổng quan</h1>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-around">
          <Card
            title="Người dùng"
            icon={<PersonIcon className="size-16" />}
            color="primaryLight-100"
            total={totalUser}
          />
          <Card title="Moment" icon={<ImageIcon className="size-16" />} color="moment" total={totalMoment} />
          <Card title="Bài hát" icon={<SpeakerLoudIcon className="size-16" />} color="music" total={totalMusic} />
          <Card
            title="Khiếu nại"
            icon={<ExclamationTriangleIcon className="size-16" />}
            color="error"
            total={totalReport}
          />
          <Card title="Nhận xét" icon={<FileTextIcon className="size-16" />} color="success" total={totalFeedback} />
        </div>
        <div className="flex gap-2">
          <div className="w-2/3">
            <MomentChart />
          </div>
          <div className="aspect-auto w-1/3 rounded-xl border p-4 shadow">
            <p className="font-bold">5 moments gần nhất</p>
            {moments.slice(0, 5).map((moment) => (
              <div key={moment.id} className="mt-2 flex items-center gap-4">
                <img src={moment.image} alt="" className="h-20 w-20 rounded-lg object-cover" />
                <div>
                  <p className="font-bold">{moment.user.fullname}</p>
                  <p>{moment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
