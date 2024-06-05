// botão lateral do menu
document.getElementById('toggleMenu').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.display === 'block') {
        sidebar.style.display = 'none'; // Esconde a barra lateral se estiver visível
    } else {
        sidebar.style.display = 'block'; // Mostra a barra lateral se estiver escondida
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-container');
    const comentariosList = document.getElementById('comentariosList');

    // Carrega os comentários do localStorage
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

    // Função para exibir os comentários
    function displayComentarios() {
        comentariosList.innerHTML = ''; // Limpa a lista de comentários
        comentarios.forEach((comentario, index) => {
            const comentarioDiv = document.createElement('div');
            comentarioDiv.classList.add('comentario'); // Adiciona a classe 'comentario' ao div
            comentarioDiv.innerHTML = `
                <h3>${comentario.title}</h3>
                <p><strong>Nota:</strong> ${comentario.rating}</p>
                <p>${comentario.comments}</p>
            `;
            comentariosList.appendChild(comentarioDiv); // Adiciona o div do comentário à lista
        });
    }

    // Exibir os comentários ao carregar a página
    displayComentarios();

    // Adiciona um novo comentário
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Previne o envio do formulário
        const title = document.getElementById('movieTitle').value;
        const rating = document.getElementById('movieRating').value;
        const comments = document.getElementById('movieComments').value;

        const comentario = { title, rating, comments }; // Cria um objeto com os dados do comentário
        comentarios.push(comentario); // Adiciona o novo comentário à lista
        localStorage.setItem('comentarios', JSON.stringify(comentarios)); // Armazena a lista atualizada no localStorage
        displayComentarios(); // Atualiza a exibição dos comentários

        form.reset(); // Reseta o formulário
    });
});
