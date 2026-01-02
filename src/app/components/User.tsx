import Image from 'next/image';

import { type User } from '../types/user';

export const UserComponent = ({ user }: { user: User }) => {
  return (
    <div className='flex min-w-72 items-center gap-2 rounded-md bg-gray-600 p-2'>
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
