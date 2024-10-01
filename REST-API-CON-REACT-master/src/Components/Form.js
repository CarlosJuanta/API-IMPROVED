import React from "react";

const Form = ({ alumno, setAlumno }) => {
  const handleChange = (e) => {
    setAlumno({
      ...alumno,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const requestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(alumno),
    };
    fetch("HTTP://localhost:3000/agregaralumno", requestInit)
      .then((res) => res.json())
      .then((res) => console.log(res));

    //reiniciar state del libro
    setAlumno({
      id: 0,
      nombre: "",
      apellido: "",
      fecha_nacimiento: "",
      carrera: "",
      promedio: 0,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xs  p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold text-center mb-6">Registro</h1>
      <input
        name="nombre"
        onChange={handleChange}
        type="text"
        id="nombre"
        required
        placeholder="Nombre"
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="apellido"
        onChange={handleChange}
        type="text"
        id="apellido"
        required
        placeholder="Apellido"
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="fecha_nacimiento"
        onChange={handleChange}
        type="date"
        id="fechaNacimiento"
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="carrera"
        onChange={handleChange}
        type="text"
        id="carrera"
        required
        placeholder="Carrera"
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="promedio"
        onChange={handleChange}
        type="text"
        id="promedio"
        required
        placeholder="Promedio"
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        type="submit"
      >
        Registrar
      </button>
    </form>
  );
};

export default Form;
