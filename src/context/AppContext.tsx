import { createContext, useContext, useMemo, useState } from 'react';
interface Props {
  children: React.ReactNode;
  [key: string]: any;
}
interface IAppContext {
  pageLoading: boolean;
}
export type IUseAppState = {
  state: IAppContext;
  setState: Function;
};
const AppContext = createContext<IUseAppState>({} as IUseAppState);

const initalState = { pageLoading: false};

export const AppContextProvider = ({ children }: Props) => {
  const [state, setState] = useState({
    ...initalState,
  });

  return <AppContext.Provider value={{state, setState}}>{children}</AppContext.Provider>;
};

export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}
