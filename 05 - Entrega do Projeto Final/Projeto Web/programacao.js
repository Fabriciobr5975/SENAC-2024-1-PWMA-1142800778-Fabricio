// js para botão do menu lateral
document.getElementById('toggleMenu').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.display === 'block') {
        sidebar.style.display = 'none';
    } else {
        sidebar.style.display = 'block';
    }
  });

  const movies = [
    { date: "2024-04-01", title: "Filme A", time: "14:00", description: "Descrição do Filme A", director: "Diretor A", genre: "Drama" },
    { date: "2024-04-01", title: "Filme B", time: "16:00", description: "Descrição do Filme B", director: "Diretor B", genre: "Comédia" },
    { date: "2024-04-01", title: "Filme C", time: "18:00", description: "Descrição do Filme C", director: "Diretor C", genre: "Ação" },
    { date: "2024-04-02", title: "Filme D", time: "20:00", description: "Descrição do Filme D", director: "Diretor D", genre: "Terror" },
    { date: "2024-04-03", title: "Filme E", time: "14:00", description: "Descrição do Filme E", director: "Diretor E", genre: "Ficção Científica" },
    { date: "2024-04-03", title: "Filme F", time: "16:00", description: "Descrição do Filme F", director: "Diretor F", genre: "Romance" }
];

localStorage.setItem('movies', JSON.stringify(movies));

document.addEventListener("DOMContentLoaded", function () {
  const movies = JSON.parse(localStorage.getItem('movies')) || [];

  const dateSelector = document.getElementById("dateSelector");
  const movieList = document.getElementById("movieList");

  function filterMoviesByDate(date) {
      movieList.innerHTML = "";
      const filteredMovies = movies.filter(movie => movie.date === date);
      if (filteredMovies.length > 0) {
          filteredMovies.forEach(movie => {
              const movieItem = document.createElement("div");
              movieItem.className = "movie-item";
              movieItem.innerHTML = `
                  <h3>${movie.title}</h3>
                  <p>Horário: ${movie.time}</p>
                  <p>Descrição: ${movie.description}</p>
                  <p>Diretor: ${movie.director}</p>
                  <p>Gênero: ${movie.genre}</p>
              `;
              movieList.appendChild(movieItem);
          });
      } else {
          movieList.innerHTML = "<p>Nenhum filme disponível nesta data.</p>";
      }
  }

  dateSelector.addEventListener("change", function () {
      filterMoviesByDate(this.value);
  });

  // Filtrar os filmes inicialmente pela primeira data disponível
  filterMoviesByDate(dateSelector.value);
});

