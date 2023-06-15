import { createContext, useState } from "react";

export const AsignaturaContext = createContext();

export function AsignaturaContextProvider(props) {
  const [idAsignatura, setIdAsignatura] = useState(null);

  return (
    <AsignaturaContext.Provider
      value={{
        idAsignatura,
        setIdAsignatura,
      }}
    >
      {props.children}
    </AsignaturaContext.Provider>
  );
}
