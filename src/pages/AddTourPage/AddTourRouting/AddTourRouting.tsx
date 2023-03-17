import React, { useMemo, useState, createContext, ReactNode } from "react";

export enum pagesMap {
  description = "description",
  travel = "travel",
  control = "control",
}

interface IContext {
  page: string;
  setPage: (page: string) => void;
}

export const RoutingContext = createContext<IContext>({
  page: pagesMap.description.toString(),
  setPage: () => {},
});

export default function AddTourRouting({ children }: { children: ReactNode }) {
  let urlPath = window.location.pathname.slice(1).toLowerCase();

  const [page, setPage] = useState<string>(urlPath || pagesMap.description);

  const value = useMemo(() => ({ page, setPage }), [page, setPage]);

  return (
    <RoutingContext.Provider value={value}>{children}</RoutingContext.Provider>
  );
}
