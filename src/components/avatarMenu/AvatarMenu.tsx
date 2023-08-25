import { Menu, Transition } from "@headlessui/react";
import Avatar from "@/components/avatar/Avatar";
import React, { Fragment } from "react";
import { classNames } from "@/lib/lib";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";

interface Navigation {
  name: string,
  href: string
}

const userNavigation: Navigation[] = [
  {name: 'Dashboard', href: '/dashboard'},
  {name: 'Your profile', href: '/dashboard/profile'},
]

interface Props {
  user?: User
}

export default function AvatarMenu(props: Props) {
  const queryClient = useQueryClient();

  async function logout(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    await fetch('/api/logout');
    await queryClient.invalidateQueries({
      queryKey: ['/api/currentUser'],
    });
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="-m-1.5 flex items-center p-1.5">
        <span className="sr-only">Open user menu</span>
        <Avatar user={props.user}/>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({active}) => (
                <Link
                  href={item.href}
                  className={classNames(
                    active ? 'bg-gray-50' : '',
                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                  )}
                >
                  {item.name}
                </Link>
              )}
            </Menu.Item>
          ))}
          <Menu.Item>
            {({active}) => (
              <Link
                href="#"
                className={classNames(
                  active ? 'bg-gray-50' : '',
                  'block px-3 py-1 text-sm leading-6 text-gray-900'
                )}
                onClick={logout}
              >
                Log out
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )

}