// Este es un ejemplo de cómo podrías usar jQuery para interactuar con la API REST
$(document).ready(function () {
  // Obtener todos los libros y mostrarlos en la tabla
  $.get('http://localhost:3000/libros', function (data) {
    const librosList = $('#librosList');
    librosList.empty();
    data.forEach(function (libro) {
      librosList.append(`
        <tr>
          <td>${libro.titulo}</td>
          <td>${libro.autor}</td>
          <td>
            <button class="btn btn-warning editar" data-id="${libro.id}">Editar</button>
            <button class="btn btn-danger eliminar" data-id="${libro.id}">Eliminar</button>
          </td>
        </tr>
      `);
    });
  });

  // Agregar un nuevo libro
  $('#agregarLibroForm').submit(function (event) {
    event.preventDefault();
    const titulo = $('#titulo').val();
    const autor = $('#autor').val();
    $.post('http://localhost:3000/libros', { titulo, autor }, function (libro) {
      // Recargar la lista de libros después de agregar uno nuevo
      window.location.reload();
    });
  });

  // Implementar lógica para editar un libro
  $('#librosList').on('click', '.editar', function () {
    const libroId = $(this).data('id');
    // Aquí puedes implementar la lógica para editar un libro
  });

  // Implementar lógica para eliminar un libro
  $('#librosList').on('click', '.eliminar', function () {
    const libroId = $(this).data('id');
    $.ajax({
      url: `http://localhost:3000/libros/${libroId}`,
      type: 'DELETE',
      success: function (libroEliminado) {
        // Recargar la lista de libros después de eliminar uno
        window.location.reload();
      },
      error: function () {
        alert('Error al eliminar el libro');
      },
    });
  });
});

  