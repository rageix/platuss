'use client';

import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props extends PropsWithChildren {}

export default function Providers(props: Props) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>{props.children}</QueryClientProvider>
  );
}