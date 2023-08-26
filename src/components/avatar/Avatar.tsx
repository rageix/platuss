import { useUser } from '@/hooks/user';
import defaultUser from './defaultUser.svg';
import Image from 'next/image';
import { User } from '@/types/user';
import { classNames } from '@/lib/lib';

interface Props {
  user?: User | null;
  className?: string;
}

export default function Avatar(props: Props) {
  const user = useUser(props.user);
  return (
    <div
      className={classNames(
        'relative h-8 w-8 rounded-full bg-gray-100',
        props.className ? props.className : null,
      )}
    >
      <Image
        src={user?.data?.image ? user.data.image : defaultUser}
        alt={user?.data?.email || ''}
        fill={true}
      />
    </div>
  );
}
