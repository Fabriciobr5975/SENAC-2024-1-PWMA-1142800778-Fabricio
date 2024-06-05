// botão lateral do menu
document.getElementById('toggleMenu').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.display === 'block') {
        sidebar.style.display = 'none';
    } else {
        sidebar.style.display = 'block';
    }
  });

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-container');
    const comentariosList = document.getElementById('comentariosList');

    // Carrega os comentários do localStorage
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

    // Função para exibir os comentários
    function displayComentarios() {
        comentariosList.innerHTML = '';
        comentarios.forEach((comentario, index) => {
            const comentarioDiv = document.createElement('div');
            comentarioDiv.classList.add('comentario');
            comentarioDiv.innerHTML = `
                <h3>${comentario.title}</h3>
                <p><strong>Nota:</strong> ${comentario.rating}</p>
                <p>${comentario.comments}</p>
            `;
            comentariosList.appendChild(comentarioDiv);
        });
    }

    // Exibir os comentários ao carregar a página
    displayComentarios();

    // Adiciona um novo comentário
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('movieTitle').value;
        const rating = document.getElementById('movieRating').value;
        const comments = document.getElementById('movieComments').value;

        const comentario = { title, rating, comments };
        comentarios.push(comentario);
        localStorage.setItem('comentarios', JSON.stringify(comentarios));
        displayComentarios();

        form.reset();
    });
});

