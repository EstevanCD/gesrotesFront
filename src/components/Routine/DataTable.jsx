function TablaDatos(props) {
    return (
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Correo electrónico</th>
          </tr>
        </thead>
        <tbody>
          {props.datos.map(dato => (
            <tr key={dato.id}>
              <td>{dato.nombre}</td>
              <td>{dato.edad}</td>
              <td>{dato.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  