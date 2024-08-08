import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { convertDate } from '@/utils/convertDate';
import { Skeleton } from '@/components/ui/skeleton';
import useMomentActions from '@/hooks/useMomentActions';
import MomentDetail from '@/components/MomentDetail/MomentDetail';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Moment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  const { moments, isLoading, totalPage, message, fetchMoments, deleteMoment } = useMomentActions();

  useEffect(() => {
    fetchMoments(10, currentPage);
  }, [currentPage, fetchMoments]);

  useEffect(() => {
    setIsUpdate(false);
    setCurrentPage(1);
  }, [isUpdate]);

  const handleDeleteUser = async (id) => {
    setError(await deleteMoment(id));
    setIsDelete(false);
    setIsUpdate(true);
  };

  const handleCloseDetail = () => {
    setSelectedMoment(null);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      return;
    }

    if (message) {
      toast.success(message);
    }
  }, [error, message]);

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý moment</h1>
      </div>
      <div>
        <br />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Moment</TableHead>
              <TableHead className="w-1/4">Người đăng</TableHead>
              <TableHead className="w-1/6">Nội dung</TableHead>
              <TableHead className="w-1/6">Thời tiết</TableHead>
              <TableHead className="w-1/6">Vị trí</TableHead>
              <TableHead className="w-1/6">Thời gian đăng</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="min-h-[570px]">
            {isLoading
              ? Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="size-10 rounded-full"></Skeleton>
                      </TableCell>
                      {Array(6)
                        .fill(0)
                        .map((_, index) => (
                          <TableCell key={index}>
                            <Skeleton className="h-10 w-full"></Skeleton>
                          </TableCell>
                        ))}
                    </TableRow>
                  ))
              : moments.map((moment) => (
                  <TableRow
                    key={moment._id}
                    onClick={() => {
                      !isDelete && setSelectedMoment(moment);
                    }}
                  >
                    <TableCell>
                      <img src={moment.image} alt="" className="size-10 object-cover" />
                    </TableCell>
                    <TableCell>{moment.user.fullname}</TableCell>
                    <TableCell>{moment.content}</TableCell>
                    <TableCell>{moment.weather}</TableCell>
                    <TableCell>{moment.location}</TableCell>
                    <TableCell>{convertDate(moment.createdAt)}</TableCell>
                    <TableCell className="flex gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger
                          asChild
                          onClick={(e) => {
                            setIsDelete(true);
                            e.stopPropagation();
                          }}
                        >
                          <Button
                            variant="outline"
                            className="bg-background text-primaryDark-10 hover:bg-neuturalLight-40"
                          >
                            Xóa
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Xoá</AlertDialogTitle>
                            <AlertDialogDescription>Bạn có chắc chắn muốn xóa moment này không?</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setIsDelete(false)}>Hủy bỏ</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteUser(moment._id)}>Xác nhận</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => setCurrentPage(1)}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
              >
                <DoubleArrowLeftIcon />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
                onClick={() => setCurrentPage(currentPage - 1)}
              />
            </PaginationItem>
            {currentPage > 3 && <PaginationEllipsis className="opacity-50" />}
            {Array.from({ length: totalPage }, (_, index) =>
              (index < currentPage && currentPage - index - 1 < 3) ||
              (index + 1 > currentPage && index + 1 - currentPage < 3) ? (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    className={currentPage === index + 1 ? 'bg-primaryLight-100 text-neuturalLight-10' : ''}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ) : null,
            )}
            {currentPage <= totalPage - 3 && <PaginationEllipsis className="opacity-50" />}
            <PaginationItem>
              <PaginationNext
                href="#"
                className={currentPage === totalPage ? 'pointer-events-none opacity-50' : undefined}
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => setCurrentPage(totalPage)}
                className={currentPage === totalPage ? 'pointer-events-none opacity-50' : undefined}
              >
                <DoubleArrowRightIcon />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {selectedMoment && <MomentDetail moment={selectedMoment} onClose={handleCloseDetail} />}
    </div>
  );
};

export default Moment;
