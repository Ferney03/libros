const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors'); // Agregar el middleware CORS

app.use(bodyParser.json());
app.use(cors()); // Habilitar CORS

// Ruta raíz para mostrar un mensaje de bienvenida
app.get('/', (req, res) => {
  res.send('¡Bienvenido a tu directorio de libros!');
});

// Ruta para obtener todos los libros
app.get('/libros', (req, res) => {
  try {
    const librosData = JSON.parse(fs.readFileSync('libros.json'));
    res.json(librosData);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer los libros' });
  }
});

// Ruta para obtener un libro por su ID
app.get('/libros/:id', (req, res) => {
  const libroId = parseInt(req.params.id);
  try {
    const librosData = JSON.parse(fs.readFileSync('libros.json'));
    const libro = librosData.find((libro) => libro.id === libroId);
    if (libro) {
      res.json(libro);
    } else {
      res.status(404).json({ error: 'Libro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al leer los libros' });
  }
});

// Ruta para agregar un nuevo libro
app.post('/libros', (req, res) => {
  try {
    const librosData = JSON.parse(fs.readFileSync('libros.json'));
    const nuevoLibro = req.body;
    nuevoLibro.id = librosData.length + 1;
    librosData.push(nuevoLibro);
    fs.writeFileSync('libros.json', JSON.stringify(librosData, null, 2));
    res.json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el libro' });
  }
});

// Ruta para actualizar un libro por ID
app.put('/libros/:id', (req, res) => {
  const libroId = parseInt(req.params.id);
  try {
    const librosData = JSON.parse(fs.readFileSync('libros.json'));
    const libroIndex = librosData.findIndex((libro) => libro.id === libroId);
    if (libroIndex !== -1) {
      const libroActualizado = req.body;
      librosData[libroIndex] = libroActualizado;
      fs.writeFileSync('libros.json', JSON.stringify(librosData, null, 2));
      res.json(libroActualizado);
    } else {
      res.status(404).json({ error: 'Libro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
});

// Ruta para eliminar un libro por ID
app.delete('/libros/:id', (req, res) => {
  const libroId = parseInt(req.params.id);
  try {
    const librosData = JSON.parse(fs.readFileSync('libros.json'));
    const libroIndex = librosData.findIndex((libro) => libro.id === libroId);
    if (libroIndex !== -1) {
      const libroEliminado = librosData.splice(libroIndex, 1);
      fs.writeFileSync('libros.json', JSON.stringify(librosData, null, 2));
      res.json(libroEliminado[0]);
    } else {
      res.status(404).json({ error: 'Libro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

