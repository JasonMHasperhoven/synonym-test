async function getUsers(page: number) {
    const resp = await fetch(`https://randomuser.me/api/?page=${page}&results=10`);

    return resp.json();
}

async function Page({ params }: { params: { number: string } }) {
    console.log('TCL: Page -> params', params);
    const { number } = await params;
    console.log('TCL: Page -> number', number);
    const users = await getUsers(Number(number));
    console.log('TCL: Page -> users', users);

    return (
        <main className='flex min-h-screen items-center justify-center'>
            <h1 className='text-2xl'>Welcome to the app.</h1>
        </main>
    );
}

export default Page;
