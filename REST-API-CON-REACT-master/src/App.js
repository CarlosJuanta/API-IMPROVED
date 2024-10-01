import React, { Fragment, useState, useEffect } from "react";
import Listadoalumnos from "./Components/Listadoalumnos";
import Form from "./Components/Form";
function App() {
  const [alumno, setAlumno] = useState({
    id: 0,
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    carrera: "",
    promedio: 0,
  });

  const [alumnos, setAlumnos] = useState([]);

  const [listUpdated, setListUpdated] = useState(false);

  useEffect(() => {
    const getalumnos = () => {
      fetch("HTTP://localhost:3000/buscaralumno")
        .then((res) => res.json())
        .then((res) => setAlumnos(res));
    };
    getalumnos();
    setListUpdated(false);
  }, [listUpdated]);

  return (
    <>
      <div className="md:flex space-x-4">
        <div className="flex-none sticky top-0 z-10">
          {" "}
          {/* Formulario fijo en la parte superior */}
          <Form alumno={alumno} setAlumno={setAlumno} />
        </div>
        <div className="flex-grow overflow-y-auto max-h-screen">
          {" "}
          {/* La tabla ocupa el resto y permite scroll */}
          <Listadoalumnos
            alumno={alumno}
            setAlumno={setAlumno}
            alumnos={alumnos}
            setListUpdated={setListUpdated}
          />
        </div>
      </div>
    </>
  );
}

export default App;
