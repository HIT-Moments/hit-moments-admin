import { useEffect, useState } from 'react';

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { convertDate } from '@/utils/convertDate';
import { Skeleton } from '@/components/ui/skeleton';
import useUserActions from '@/hooks/useUserActions';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const User = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  // const [selectedUser, setSelectedUser] = useState(null);

  const { users, isLoading, totalPage, message, fetchUsers, createUser, deleteUser } = useUserActions();

  useEffect(() => {
    fetchUsers(10, currentPage);
  }, [currentPage, fetchUsers]);

  const handleDeleteUser = async (id) => {
    setError(await deleteUser(id));
    setIsUpdate(true);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const user = {
      fullname: e.target.fullname.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phoneNumber: e.target.phoneNumber.value,
    };
    setError(await createUser(user));
    e.target.reset();

    setIsUpdate(true);
  };

  // const handleUpdateUser = async (e) => {
  //   e.preventDefault();
  //   const user = {
  //     fullname: e.target.updateFullname.value,
  //     email: e.target.updateEmail.value,
  //     phoneNumber: e.target.updatePhoneNumber.value,
  //     role: e.target.updateRole.value,
  //   };
  //   setError(await updateUser(selectedUser._id, user));
  //   e.target.reset();

  //   setIsUpdate(true);
  // };

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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Thêm người dùng</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm người dùng</DialogTitle>
            </DialogHeader>
            <DialogDescription></DialogDescription>
            <form onSubmit={handleCreateUser}>
              <div>
                <div>
                  <Label htmlFor="fullname">Họ tên</Label>
                  <Input id="fullname"></Input>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email"></Input>
                </div>
                <div>
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input type="password" id="password"></Input>
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Số điện thoại</Label>
                  <Input id="phoneNumber"></Input>
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button type="submit">Thêm</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <br />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Avatar</TableHead>
              <TableHead className="w-1/4">Họ tên</TableHead>
              <TableHead className="w-1/4">Email</TableHead>
              <TableHead className="w-1/6">Số điện thoại</TableHead>
              <TableHead className="w-32">Role</TableHead>
              <TableHead className="w-60">Created At</TableHead>
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
              : users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={user.avatar} alt="" className="size-10 rounded-full" />
                        <AvatarFallback className="flex size-10 items-center justify-center rounded-full bg-neuturalLight-30">
                          HM
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{user.fullname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{convertDate(user.createdAt)}</TableCell>
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
                              Bạn có chắc chắn muốn xóa người dùng này không?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteUser(user._id)}>Xác nhận</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      {/* <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-background text-primaryDark-10 hover:bg-neuturalLight-40"
                          >
                            Sửa
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Cập nhật người dùng</DialogTitle>
                          </DialogHeader>
                          <DialogDescription></DialogDescription>
                          <form onSubmit={handleUpdateUser}>
                            <div>
                              <div>
                                <Label htmlFor="updateFullname">Họ tên</Label>
                                <Input id="updateFullname" value={selectedUser?.fullname || ''} />
                              </div>
                              <div>
                                <Label htmlFor="updateEmail">Email</Label>
                                <Input type="email" id="updateEmail" value={selectedUser?.email || ''} />
                              </div>
                              <div>
                                <Label htmlFor="updatePhoneNumber">Số điện thoại</Label>
                                <Input id="updatePhoneNumber" value={selectedUser?.phoneNumber || ''}></Input>
                              </div>
                              <div>
                                <Label htmlFor="updateRole">Vai trò</Label>
                                <Input type="password" id="updateRole" value={selectedUser?.role || ''}></Input>
                              </div>
                            </div>
                            <DialogFooter className="mt-4">
                              <Button type="submit">Lưu</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog> */}
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

export default User;
