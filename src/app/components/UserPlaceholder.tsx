export const UserPlaceholder = () => {
  return (
    <div className='flex min-w-72 items-center gap-2 rounded-md border border-gray-200 bg-white p-1 md:min-w-96 md:p-2 dark:border-gray-700 dark:bg-gray-700'>
      <div className='h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-500' />
      <p className='animate-pulse text-sm text-gray-700 dark:text-gray-300'>
        Loading...
      </p>
    </div>
  );
};
