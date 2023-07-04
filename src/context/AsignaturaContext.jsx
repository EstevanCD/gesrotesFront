import { createContext, useState } from "react";

export const AsignaturaContext = createContext();

// Este proveedor debe ser renombrado para que sirva como administrador de variables
// en todo el alcance del módulo de asignaturas
export function AsignaturaContextProvider(props) {
  const [idAsignatura, setIdAsignatura] = useState(1);
  const [idGrupo, setIdGrupo] = useState(null);
  const [idCiclo, setIdCiclo] = useState(null);
  const [infoRotes, setInfoRotes] = useState(null);

  return (
    <AsignaturaContext.Provider
      value={{
        idAsignatura,
        setIdAsignatura,
        infoRotes,
        setInfoRotes,
        idGrupo,
        setIdGrupo,
        idCiclo,
        setIdCiclo,
      }}
    >
      {props.children}
    </AsignaturaContext.Provider>
  );
}
