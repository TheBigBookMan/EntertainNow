import { createContext, useContext } from "react";

const createCtx = <T extends {}>() => {
  const ctx = createContext<T | null>({} as T);
  const useCtx = () => {
    const value = useContext(ctx);
    if (value === null) throw new Error("Context can't be null");
    return value;
  };
  return [useCtx, ctx.Provider] as const;
};

export default createCtx;
