import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

export class ComponentController<T> {
  state: T;
  updateState: Dispatch<SetStateAction<T>>;
  defaultState: T;
  router: AppRouterInstance;
  queryClient: QueryClient;

  onRender = () => {
    [this.state, this.updateState] = useState<T>(this.defaultState);
    this.router = useRouter();
    this.queryClient = useQueryClient();
  };

  setState = (state: T) => {
    this.updateState(state);
  };

}