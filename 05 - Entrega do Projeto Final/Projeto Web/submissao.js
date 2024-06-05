// js para botão do menu lateral
document.getElementById('toggleMenu').addEventListener('click', function() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.style.display === 'block') {
      sidebar.style.display = 'none';
  } else {
      sidebar.style.display = 'block';
  }
});

  // Formulario submission
$("#submissaoForm").submit(function (e) {
      e.preventDefault();

      // receber os dados
      const movieTitle = $("#movieTitle").val();
      const director = $("#director").val();
      const synopsis = $("#synopsis").val();
      
      // Create a new movie object
      const newMovie = {
          movieTitle: movieTitle,
          director: director,
          synopsis: synopsis
      };

      // Pegando os filmes da localStorage
      let movies = JSON.parse(localStorage.getItem('movies')) || [];
      
      // Adicionando o filme para o array
      movies.push(newMovie);
      
      // Salvando os filmes na localStorage
      localStorage.setItem('movies', JSON.stringify(movies));
      
      // reset do formulario
      $("#submissaoForm")[0].reset();

      alert("Filme enviado com sucesso!");
});

