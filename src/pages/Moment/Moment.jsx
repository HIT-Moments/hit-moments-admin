import userApi from '@/apis/user.api';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useEffect } from 'react';

export default async function Moment() {
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await userApi.getAll({ limit: 10, page: 1 });
        return response.data.data.users;
      } catch (error) {
        console.log(error);
      }
    }

    console.log(fetchUsers());

    const data = fetchUsers();
  }, []);

  return <div className="container mx-auto py-10">{/* <DataTable columns={columns} data={data} /> */}</div>;
}
