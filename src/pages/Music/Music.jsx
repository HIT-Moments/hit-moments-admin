import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useMusicActions from '@/hooks/useMusicActions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

const Music = () => {
  const { musics, isLoading, totalPage, message, searchMusics, deleteMusic } = useMusicActions();

  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdate, setIsUpdate] = useState(false);
  const [keyword, setKeyword] = useState(' ');
  const [error, setError] = useState(null);

  useEffect(() => {
    keyword === '' ? searchMusics(' ', 10, currentPage) : searchMusics(keyword, 10, currentPage);
  }, [searchMusics, currentPage, keyword]);

  const handleDeleteMusic = async (id) => {
    setError(await deleteMusic(id));
    setIsUpdate(true);
  };

  useEffect(() => {
    setIsUpdate(false);
    setCurrentPage(1);
  }, [isUpdate]);

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
    <div className="relative w-full p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý bài hát</h1>
      </div>
      <div className="border-b p-4">
        <Input
          type="text"
          placeholder="Tìm kiếm bài hát..."
          className="w-full"
          onChange={(e) => {
            setTimeout(() => {
              setKeyword(e.target.value);
            }, 1000);
          }}
        />
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Tên bài hát</TableHead>
              <TableHead className="w-1/3">Tác giả</TableHead>
              <TableHead className="w-1/3">Nhạc</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="min-h-[570px]">
            {isLoading
              ? Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={index}>
                      {Array(4)
                        .fill(0)
                        .map((_, index) => (
                          <TableCell key={index}>
                            <Skeleton className="h-10 w-full"></Skeleton>
                          </TableCell>
                        ))}
                    </TableRow>
                  ))
              : musics.map((music) => (
                  <TableRow key={music._id}>
                    <TableCell>{music.name}</TableCell>
                    <TableCell>{music.author}</TableCell>
                    <TableCell>
                      <audio controls className="h-10 w-96">
                        <source src={music.link} />
                      </audio>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
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
                            <AlertDialogDescription>
                              Bạn có chắc chắn muốn xóa bài hát này không?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteMusic(music._id)}>Xác nhận</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <Pagination className="absolute bottom-40 mr-10 pr-12">
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
    </div>
  );
};

export default Music;
