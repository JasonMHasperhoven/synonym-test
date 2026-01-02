import { User, UsersResponse } from '@/app/types/user';

async function getUsers(page: number) {
  const resp = await fetch(`https://randomuser.me/api/?page=${page}&results=10`);

  return resp.json() as Promise<UsersResponse>;
}

async function Page({ params }: { params: { number: string } }) {
  const { number } = await params;
  const users = await getUsers(Number(number));

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4'>
      <h1 className='text-2xl'>Users</h1>
      <div className='flex flex-col gap-2 rounded-md border border-gray-300 p-4'>
        {users.results.map((user: User) => (
          <div key={user.id.value}>
            <p>
              {user.name.title}. {user.name.first} {user.name.last}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Page;
