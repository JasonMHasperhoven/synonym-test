import { UsersError, UsersResponse } from '@/app/types/user';

import Main from './main';

function isUsersError(resp: UsersResponse | UsersError): resp is UsersError {
  return (resp as UsersError).error !== undefined;
}

async function getUsers(page: number) {
  try {
    const resp = await fetch(
      `https://randomuser.me/api/?page=${page}&results=10`
    );

    return resp.json() as Promise<UsersResponse>;
  } catch (err) {
    // potentially no internet!
    return {
      error: err instanceof Error ? err.message : 'Something went wrong!'
    } as UsersError;
  }
}

async function Page({ params }: { params: { number: string } }) {
  const { number } = await params;
  const usersResp = await getUsers(Number(number));
  const isError = isUsersError(usersResp);

  return (
    <Main
      usersResp={isError ? null : usersResp}
      ssrError={isError ? usersResp.error : null}
      page={Number(number)}
    />
  );
}

export default Page;
