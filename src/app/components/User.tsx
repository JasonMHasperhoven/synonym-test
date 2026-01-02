import Image from 'next/image';

import { type User } from '../types/user';

export const UserComponent = ({ user }: { user: User }) => {
  return (
    <div className='flex min-w-72 items-center gap-2 rounded-md border border-gray-200 bg-white p-1 md:min-w-96 md:p-2 dark:border-gray-700 dark:bg-gray-700'>
      <Image
        src={user.picture.thumbnail}
        alt={`${user.name.title}. ${user.name.first} ${user.name.last}`}
        width={32}
        height={32}
        className='rounded-full'
      />
      <p>
        {user.name.title}. {user.name.first} {user.name.last}
      </p>
    </div>
  );
};
