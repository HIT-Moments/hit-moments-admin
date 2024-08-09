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
import useReportActions from '@/hooks/useReportActions';
import { convertDate } from '@/utils/convertDate';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

const Report = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { reports, isLoading, totalPage, fetchReports } = useReportActions();

  useEffect(() => {
    fetchReports(10, currentPage);
  }, [currentPage, fetchReports]);

  return (
    <div className="relative w-full p-6">
      <div className="flex items-center justify-between">
        <h1 className="mb-6 text-2xl font-bold">Quản lý khiếu nại</h1>
      </div>
      <div>
        <br />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Người khiếu nại</TableHead>
              <TableHead className="w-1/4">Moment bị khiếu nại</TableHead>
              <TableHead className="w-1/4">Nội dung</TableHead>
              <TableHead className="w-1/4">Thời gian khiếu nại</TableHead>
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
              : reports.map((report) => (
                  <TableRow key={report._id}>
                    <TableCell>{report.user.fullname}</TableCell>
                    <TableCell>
                      <img src={report.moment.image} alt="" className="size-10 object-cover" />
                    </TableCell>
                    <TableCell>{report.description}</TableCell>
                    <TableCell>{convertDate(report.createdAt)}</TableCell>
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

export default Report;
