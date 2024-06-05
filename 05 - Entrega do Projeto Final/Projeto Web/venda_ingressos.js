// js para botão do menu lateral
document.getElementById('toggleMenu').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.display === 'block') {
        sidebar.style.display = 'none';
    } else {
        sidebar.style.display = 'block';
    }
  });

  // js para compra de ingressos
  document.addEventListener("DOMContentLoaded", function () {
    const sessions = [
        { id: 1, title: "Filme 1", availableTickets: 100},
        { id: 2, title: "Filme 2", availableTickets: 80 },
        { id: 3, title: "Filme 3", availableTickets: 50 }
    ];

    // Carregar dados do localStorage
    const storedSessions = JSON.parse(localStorage.getItem("sessions"));
    if (storedSessions) {
        storedSessions.forEach((storedSession, index) => {
            sessions[index].availableTickets = storedSession.availableTickets;
        });
    }

    const sessionsContainer = document.getElementById("sessions");

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

    document.querySelectorAll(".btn-buy").forEach(button => {
        button.addEventListener("click", function () {
            const sessionId = this.getAttribute("data-id");
            const session = sessions.find(s => s.id == sessionId);
            if (session.availableTickets > 0) {
                session.availableTickets--;
                document.getElementById(`available-${session.id}`).textContent = session.availableTickets;
                localStorage.setItem("sessions", JSON.stringify(sessions));
                alert("Ingresso comprado com sucesso!");
            } else {
                alert("Ingressos esgotados!");
            }
        });
    });
});
