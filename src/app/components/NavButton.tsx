export const NavButton = ({
  direction,
  href
}: {
  direction: 'prev' | 'next';
  href: string;
}) => {
  return (
    <a
      className='cursor-pointer rounded-lg bg-gray-600 p-2 hover:bg-gray-500'
      href={href}>
      {direction === 'prev' ? <>&larr;</> : <>&rarr;</>}
    </a>
  );
};
