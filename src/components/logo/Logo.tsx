import logo from './logo.svg';
import Image from 'next/image';

interface Props {
  className: string,
}

export default function Logo(props: Props) {
  return (
    <Image
      {...props}
      src={logo}
      alt="platuss"
    />
  );
}
