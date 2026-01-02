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
      className='cursor-pointer rounded-lg bg-gray-600 px-3 py-2 transition-colors hover:bg-gray-500'
      href={href}>
      {direction === 'prev' ? <>&larr;</> : <>&rarr;</>}
    </Link>
  );
};
