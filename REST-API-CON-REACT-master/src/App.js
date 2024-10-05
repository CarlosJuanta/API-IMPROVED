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
  const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para búsqueda

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
          <Form alumno={alumno} setAlumno={setAlumno} />
       
        </div>
        <div className="flex-grow overflow-y-auto max-h-screen"> 
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Buscar alumno"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Listadoalumnos
            alumno={alumno}
            setAlumno={setAlumno}
            alumnos={alumnos.filter((alumno) =>
              `${alumno.nombre} ${alumno.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            setListUpdated={setListUpdated}
          />
        </div>
      </div>
    </>
  );
}

export default App;
