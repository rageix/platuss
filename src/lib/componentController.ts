import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

export class ComponentController<T> {
  state: T = null as any;
  updateState: Dispatch<SetStateAction<T>> = null as any;
  defaultState: T = null as any;
  router: AppRouterInstance = null as any;
  queryClient: QueryClient = null as any;

  onRender = () => {
    [this.state, this.updateState] = useState<T>(this.defaultState);
    this.router = useRouter();
    this.queryClient = useQueryClient();
  };

  setState = (state: T) => {
    this.updateState(state);
  };
}
