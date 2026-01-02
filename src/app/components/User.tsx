import { type User } from '../types/user';

export const UserComponent = ({ user }: { user: User }) => {
  return (
    <div>
      <p>
        {user.name.title}. {user.name.first} {user.name.last}
      </p>
    </div>
  );
};
