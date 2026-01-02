import { UsersResponse } from '@/app/types/user';

import Main from './main';

async function getUsers(page: number) {
  const resp = await fetch(
    `https://randomuser.me/api/?page=${page}&results=10`
  );

  return resp.json() as Promise<UsersResponse>;
}

async function Page({ params }: { params: { number: string } }) {
  const { number } = await params;
  const usersResp = await getUsers(Number(number));

  return <Main usersResp={usersResp} page={Number(number)} />;
}

export default Page;
