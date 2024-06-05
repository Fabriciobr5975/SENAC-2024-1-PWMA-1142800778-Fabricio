// js para botão do menu lateral
document.getElementById('toggleMenu').addEventListener('click', function() {
    // Seleciona o elemento da barra lateral pelo id 'sidebar'
    const sidebar = document.getElementById('sidebar');
    // Verifica se a barra lateral está visível
    if (sidebar.style.display === 'block') {
        // Se estiver visível, oculta a barra lateral
        sidebar.style.display = 'none';
    } else {
        // Se estiver oculta, mostra a barra lateral
        sidebar.style.display = 'block';
    }
});

// js para compra de ingressos
document.addEventListener("DOMContentLoaded", function () {
    // Definição das sessões de filmes com ingressos disponíveis
    const sessions = [
        { id: 1, title: "Filme 1", availableTickets: 100},
        { id: 2, title: "Filme 2", availableTickets: 80 },
        { id: 3, title: "Filme 3", availableTickets: 50 }
    ];

    // Carrega dados do localStorage, se disponíveis
    const storedSessions = JSON.parse(localStorage.getItem("sessions"));
    if (storedSessions) {
        // Atualiza a quantidade de ingressos disponíveis com os dados armazenados
        storedSessions.forEach((storedSession, index) => {
            sessions[index].availableTickets = storedSession.availableTickets;
        });
    }

    // Seleciona o contêiner onde as sessões serão exibidas
    const sessionsContainer = document.getElementById("sessions");

    // Cria e insere os elementos HTML para cada sessão de filme
    sessions.forEach(session => {
        const sessionDiv = document.createElement("div");
        sessionDiv.className = "session";
        sessionDiv.innerHTML = `
            <h3>${session.title}</h3>
            <p>Ingressos Disponíveis: <span id="available-${session.id}">${session.availableTickets}</span></p>
            <button class="btn-buy" data-id="${session.id}">Comprar Ingresso</button>
        `;
        sessionsContainer.appendChild(sessionDiv);
    });

    // Adiciona evento de clique aos botões de compra
    document.querySelectorAll(".btn-buy").forEach(button => {
        button.addEventListener("click", function () {
            // Obtém o ID da sessão a partir do atributo data-id do botão
            const sessionId = this.getAttribute("data-id");
            // Encontra a sessão correspondente no array sessions
            const session = sessions.find(s => s.id == sessionId);
            // Verifica se ainda há ingressos disponíveis
            if (session.availableTickets > 0) {
                // Reduz a quantidade de ingressos disponíveis
                session.availableTickets--;
                // Atualiza a exibição do número de ingressos disponíveis
                document.getElementById(`available-${session.id}`).textContent = session.availableTickets;
                // Armazena o estado atualizado das sessões no localStorage
                localStorage.setItem("sessions", JSON.stringify(sessions));
                // Exibe uma mensagem de sucesso
                alert("Ingresso comprado com sucesso!");
            } else {
                // Exibe uma mensagem de erro se os ingressos estiverem esgotados
                alert("Ingressos esgotados!");
            }
        });
    });
});
