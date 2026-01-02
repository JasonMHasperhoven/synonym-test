'use client';

import { useEffect } from 'react';

import { UserComponent } from '@/app/components/User';
import { selectUsersByPage, useUsersStore } from '@/app/store/usersStore';
import { User, UsersResponse } from '@/app/types/user';

function Main({ usersResp, page }: { usersResp: UsersResponse; page: number }) {
  const { loadUsers, data } = useUsersStore();
  console.log('TCL: Main -> data', data);
  const { users, isLoading, error } = selectUsersByPage(data, page);
  console.log('TCL: Main -> users', users);

  useEffect(() => {
    loadUsers(page, usersResp);
  }, [loadUsers, page, usersResp]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4'>
      <h1 className='text-2xl'>Users</h1>
      <div className='flex flex-col gap-2 rounded-md border border-gray-300 p-4'>
        {users?.map((user: User) => (
          <UserComponent key={user.id.value} user={user} />
        ))}
      </div>
    </main>
  );
}

export default Main;
