import React, { useState } from "react";
import { MdBrowserUpdated } from "react-icons/md";
import { ImBin } from "react-icons/im";

const Listadoalumnos = ({ alumnos, setListUpdated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState(null);

  const handleUpdate = (id) => {
    const alumnoToUpdate = alumnos.find((a) => a.id === id);
    setSelectedAlumno(alumnoToUpdate);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedAlumno(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedAlumno((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //Editar alumno
  const handleSave = async (e) => {
    e.preventDefault();

    const requestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(selectedAlumno),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/modificaralumno/${selectedAlumno.id}`,
        requestInit
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.text();
      console.log(data);
      handleClose();
      setListUpdated(true);
    } catch (error) {
      console.error(`Error:`, error);
    }
  };

  // 1. Función para manejar la eliminación de un alumno
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/eliminaralumno/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.text();
      console.log(data);
      setListUpdated(true); // Asume que tienes una función para actualizar la lista de alumnos
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <table className="table-auto w-full border-collapse border border-gray-300 overflow-y-auto max-h-96">
        <thead className="bg-blue-500 text-white sticky top-0 z-10">
          <tr>
            <th className="px-4 py-2 border border-gray-300">NOMBRE</th>
            <th className="px-4 py-2 border border-gray-300">APELLIDO</th>
            <th className="px-4 py-2 border border-gray-300">
              FECHA DE NACIMIENTO
            </th>
            <th className="px-4 py-2 border border-gray-300">CARRERA</th>
            <th className="px-4 py-2 border border-gray-300">PROMEDIO</th>
            <th className="px-4 py-2 border border-gray-300">ACTUALIZAR</th>
            <th className="px-4 py-2 border border-gray-300">BORRAR</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno) => (
            <tr key={alumno.id} className="hover:bg-blue-100">
              <td className="px-4 py-2 text-center">{alumno.nombre}</td>
              <td className="px-4 py-2 text-center">{alumno.apellido}</td>
              <td className="px-4 py-2 text-center">
                {(() => {
                  const fecha = new Date(alumno.fecha_nacimiento);
                  const dia = String(fecha.getDate()).padStart(2, "0");
                  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses son 0-indexados
                  const año = fecha.getFullYear();
                  return `${dia}-${mes}-${año}`;
                })()}
              </td>

              <td className="px-4 py-2 text-center">{alumno.carrera}</td>
              <td className="px-4 py-2 text-center">{alumno.promedio}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleUpdate(alumno.id)}
                  className="flex items-center justify-center w-full py-2 bg-green-500 text-white rounded hover:bg-blue-600 transition duration-200"
                >
                  <MdBrowserUpdated />
                  <span className="ml-2">Actualizar</span>
                </button>
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(alumno.id)}
                  className="flex items-center justify-center w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                >
                  <ImBin />
                  <span className="ml-2">Eliminar</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-xl mb-4">Actualizar Alumno</h2>
            <form onSubmit={handleSave}>
              <label className="block mb-2">
                Nombre:
                <input
                  type="text"
                  name="nombre"
                  value={selectedAlumno.nombre}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full px-2 py-1"
                  required
                />
              </label>
              <label className="block mb-2">
                Apellido:
                <input
                  type="text"
                  name="apellido"
                  value={selectedAlumno.apellido}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full px-2 py-1"
                  required
                />
              </label>
              <label className="block mb-2">
                Fecha de Nacimiento:
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={selectedAlumno.fecha_nacimiento}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full px-2 py-1"
                  required
                />
              </label>
              <label className="block mb-2">
                Carrera:
                <input
                  type="text"
                  name="carrera"
                  value={selectedAlumno.carrera}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full px-2 py-1"
                  required
                />
              </label>
              <label className="block mb-2">
                Promedio:
                <input
                  type="text"
                  name="promedio"
                  value={selectedAlumno.promedio}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full px-2 py-1"
                  required
                />
              </label>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listadoalumnos;
