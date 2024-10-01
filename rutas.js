const express = require("express");
const { reset } = require("nodemon");
const rutas = express.Router();

//---------------FUNCIÓN PARA AGREGAR REGISTROS A LA BASE DE DATOS

rutas.post("/agregaralumno", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    //console.log (req.body)
    conn.query("insert into alumno set ? ", [req.body], (err) => {
      if (err) return res.send(err);
      res.send("Registro Exitoso");
    });
  });
});

//FUNCIÓN PARA LISTAR TODOS LO ALUMNOS REGISTRADOS
rutas.get("/buscaralumno", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("SELECT * FROM  alumno", (rows) => {
      res.json(rows);
    });
  });
});

//FUNCION PARA BUSCAR ALUMNO POR ID ----------------

rutas.get("/buscaralumno/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).send({ error: err.message });
    conn.query("SELECT * FROM alumno WHERE ?", [req.body], (err, rows) => {
      if (err) return res.status(500).send({ error: err.message });
      if (rows.length === 0) {
        return res
          .status(404)
          .send({ error: "No se encontro ningun alumno con el id" });
      }
      res.json(rows[0]);
    });
  });
});

// ACTUALIZAR REGISTRO ----
rutas.put("/modificaralumno/:id", (req, res) => {
  const id = req.params.id; // Obteniendo el id de la URL
  const { nombre, apellido, fecha_nacimiento, carrera, promedio } = req.body;

  // Agrega este console.log para depuración
  console.log(`ID recibido: ${id}`); // Verifica que el ID se está recibiendo

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "UPDATE alumno SET nombre = ?, apellido = ?, fecha_nacimiento = ?, carrera = ?, promedio = ? WHERE id = ?",
      [nombre, apellido, fecha_nacimiento, carrera, promedio, id], // Asegúrate de incluir 'id' aquí
      (err, result) => {
        if (err) return res.send(err);
        res.send(`Alumno con id ${id} actualizado correctamente`);
      }
    );
  });
});

//BORRAR REGISTRO ---
rutas.delete("/eliminaralumno/:id", (req, res) => {
  const id = req.params.id;
  //console.log para depurar
  console.log(`ID RECIBIDO: ${id}`);

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("DELETE FROM alumno where id= ?", [id], (err, result) => {
      if (err) return res.send(err);

      //verificar si se eliminó el registro
      if (result.affectedRows === 0) {
        return res.status(404).send(`No se encontró un alumno con id ${id}`);
      }
      res.send(`Alumno con id ${id} eliminado correctamente`);
    });
  });
});

module.exports = rutas; // No olvides exportar el router
