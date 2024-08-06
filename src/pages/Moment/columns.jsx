// export const columns = [
//   {
//     accessorKey: 'image',
//     header: 'Moment',
//   },
//   {
//     accessorKey: 'user',
//     header: 'Người đăng',
//   },
//   {
//     accessorKey: 'content',
//     header: 'Nội dung',
//   },
//   {
//     accessorKey: 'createdAt',
//     header: 'Ngày tạo',
//   },
// ];

import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export const columns = [
  {
    accessorKey: 'avatar',
    header: 'Avatar',
  },
  {
    accessorKey: 'fullname',
    header: 'Fullname',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Số điện thoại',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'createdAt',
    header: 'Ngày tạo',
  },
];
