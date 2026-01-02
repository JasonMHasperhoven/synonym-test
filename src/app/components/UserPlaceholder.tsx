export const UserPlaceholder = () => {
  return (
    <div className='flex min-w-72 items-center gap-2 rounded-md bg-gray-600 p-2'>
      <div className='h-8 w-8 rounded-full bg-gray-500' />
      <p className='animate-pulse text-sm text-gray-300'>Loading...</p>
    </div>
  );
};
