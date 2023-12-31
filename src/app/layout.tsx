import './globals.css';
import type { Metadata } from 'next';
import React, { PropsWithChildren } from 'react';
import Notifications from '@/components/notifications/Notifications';
import { headers } from 'next/headers';
import Providers from '@/lib/providers';

export async function generateMetadata(): Promise<Metadata> {
  const csrfToken = headers().get('X-CSRF-Token') || 'missing';

  return {
    title: 'Create Next App',
    description: 'Generated by create next app',
    other: {
      'x-csrf-token': csrfToken,
    },
  };
}

interface Props extends PropsWithChildren {}

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>platuss</title>
      </head>
      <body className="bg-white">
        <div className="flex flex-col h-screen">
          <Providers>
            {props.children}
            <Notifications />
          </Providers>
        </div>
      </body>
    </html>
  );
}
