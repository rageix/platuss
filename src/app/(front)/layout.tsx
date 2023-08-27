import { PropsWithChildren } from 'react';
import HeaderFooterLayout from '@/components/layouts/HeaderFooterLayout';

interface Props extends PropsWithChildren {}
export default function Layout(props: Props) {
  return <HeaderFooterLayout>{props.children}</HeaderFooterLayout>;
}
