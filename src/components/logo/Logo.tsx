import logo from './logo.svg';
import Image from 'next/image';
import { classNames } from "@/lib/lib";

interface Props {
  className?: string,
}

export default function Logo(props: Props) {
  return (
    <div className={classNames("relative", props.className)}>
      <Image
        src={logo}
        alt="platuss"
        fill={true}
      />
    </div>
  );
}
