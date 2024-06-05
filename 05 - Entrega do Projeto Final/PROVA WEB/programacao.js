// Adiciona um evento de clique ao botão do menu para mostrar/ocultar a barra lateral
document.getElementById('toggleMenu').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar'); // Seleciona a barra lateral
    if (sidebar.style.display === 'block') { // Verifica se a barra lateral está visível
        sidebar.style.display = 'none'; // Esconde a barra lateral se estiver visível
    } else {
        sidebar.style.display = 'block'; // Mostra a barra lateral se estiver escondida
    }
});

// Definição da lista de filmes com data, título, horário, descrição, diretor e gênero
const movies = [
    { date: "2024-04-01", title: "Filme A", time: "14:00", description: "Descrição do Filme A", director: "Diretor A", genre: "Drama" },
    { date: "2024-04-01", title: "Filme B", time: "16:00", description: "Descrição do Filme B", director: "Diretor B", genre: "Comédia" },
    { date: "2024-04-01", title: "Filme C", time: "18:00", description: "Descrição do Filme C", director: "Diretor C", genre: "Ação" },
    { date: "2024-04-02", title: "Filme D", time: "20:00", description: "Descrição do Filme D", director: "Diretor D", genre: "Terror" },
    { date: "2024-04-03", title: "Filme E", time: "14:00", description: "Descrição do Filme E", director: "Diretor E", genre: "Ficção Científica" },
    { date: "2024-04-03", title: "Filme F", time: "16:00", description: "Descrição do Filme F", director: "Diretor F", genre: "Romance" }
];

// Salva a lista de filmes no localStorage
localStorage.setItem('movies', JSON.stringify(movies));

// Evento que é acionado quando o conteúdo do DOM é carregado
document.addEventListener("DOMContentLoaded", function () {
    const movies = JSON.parse(localStorage.getItem('movies')) || []; // Obtém os filmes do localStorage ou cria um array vazio
    const dateSelector = document.getElementById("dateSelector"); // Seleciona o elemento do seletor de datas
    const movieList = document.getElementById("movieList"); // Seleciona o elemento da lista de filmes

    // Função para filtrar os filmes pela data selecionada
    function filterMoviesByDate(date) {
        movieList.innerHTML = ""; // Limpa a lista de filmes
        const filteredMovies = movies.filter(movie => movie.date === date); // Filtra os filmes pela data
        if (filteredMovies.length > 0) {
            // Adiciona os filmes filtrados à lista
            filteredMovies.forEach(movie => {
                const movieItem = document.createElement("div"); // Cria um novo elemento para o filme
                movieItem.className = "movie-item"; // Adiciona a classe CSS ao elemento
                movieItem.innerHTML = `
                    <h3>${movie.title}</h3>
                    <p>Horário: ${movie.time}</p>
                    <p>Descrição: ${movie.description}</p>
                    <p>Diretor: ${movie.director}</p>
                    <p>Gênero: ${movie.genre}</p>
                `; // Define o conteúdo HTML do elemento do filme
                movieList.appendChild(movieItem); // Adiciona o filme à lista
            });
        } else {
            movieList.innerHTML = "<p>Nenhum filme disponível nesta data.</p>"; // Mensagem se não houver filmes na data selecionada
        }
    }

    // Adiciona um evento de mudança ao seletor de datas
    dateSelector.addEventListener("change", function () {
        filterMoviesByDate(this.value); // Filtra os filmes pela data selecionada
    });

    // Filtra os filmes inicialmente pela primeira data disponível
    filterMoviesByDate(dateSelector.value);
});
