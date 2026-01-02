import Link from 'next/link';

export const NavButton = ({
  direction,
  href
}: {
  direction: 'prev' | 'next';
  href: string;
}) => {
  return (
    <Link
      className='cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700'
      href={href}>
      {direction === 'prev' ? <>&larr;</> : <>&rarr;</>}
    </Link>
  );
};
