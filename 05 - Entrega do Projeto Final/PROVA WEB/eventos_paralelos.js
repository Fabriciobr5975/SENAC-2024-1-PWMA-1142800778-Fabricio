// Adiciona um evento de clique ao botão de alternância do menu
document.getElementById('toggleMenu').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    // Verifica se a barra lateral está visível e a alterna
    if (sidebar.style.display === 'block') {
        sidebar.style.display = 'none'; // Esconde a barra lateral se estiver visível
    } else {
        sidebar.style.display = 'block'; // Mostra a barra lateral se estiver escondida
    }
});

const eventsList = document.getElementById("eventsList"); // Seleciona o elemento onde os eventos serão listados
const addEventForm = document.getElementById("addEventForm"); // Seleciona o formulário de adição de eventos
const eventName = document.getElementById("eventName"); // Seleciona o campo do nome do evento
const eventDate = document.getElementById("eventDate"); // Seleciona o campo da data do evento
const eventTime = document.getElementById("eventTime"); // Seleciona o campo do horário do evento
const eventLocation = document.getElementById("eventLocation"); // Seleciona o campo do local do evento
const eventDescription = document.getElementById("eventDescription"); // Seleciona o campo da descrição do evento

// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {
    loadEvents(); // Carrega e exibe os eventos salvos

    // Adiciona um evento de envio ao formulário de adição de eventos
    addEventForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
        const newEvent = { // Cria um novo objeto de evento com os valores dos campos
            name: eventName.value,
            date: eventDate.value,
            time: eventTime.value,
            location: eventLocation.value,
            description: eventDescription.value
        };
        const events = JSON.parse(localStorage.getItem('events')) || []; // Obtém os eventos salvos ou cria um array vazio
        events.push(newEvent); // Adiciona o novo evento ao array
        localStorage.setItem('events', JSON.stringify(events)); // Salva o array de eventos no localStorage
        loadEvents(); // Recarrega a lista de eventos para exibir o novo evento
        addEventForm.reset(); // Reseta o formulário para os valores padrão
    });
});

// Função para carregar e exibir os eventos
function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || []; // Obtém os eventos salvos ou cria um array vazio
    eventsList.innerHTML = ""; // Limpa a lista de eventos atual
    const eventsByDate = groupEventsByDate(events); // Agrupa os eventos por data
    for (const date in eventsByDate) { // Itera sobre cada data com eventos
        const dateContainer = document.createElement("div"); // Cria um container para os eventos da data atual
        dateContainer.className = "event-date-container"; // Adiciona uma classe ao container
        
        const dateHeader = document.createElement("h3"); // Cria um cabeçalho para a data
        dateHeader.textContent = formatDate(date); // Define o texto do cabeçalho com a data formatada
        dateContainer.appendChild(dateHeader); // Adiciona o cabeçalho ao container
        
        eventsByDate[date].forEach(event => { // Itera sobre cada evento na data atual
            const eventItem = document.createElement("div"); // Cria um container para o evento
            eventItem.className = "event"; // Adiciona uma classe ao container do evento
            eventItem.innerHTML = `
                <h4>${event.name}</h4>
                <p>Horário: ${event.time}</p>
                <p>Local: ${event.location}</p>
                <p class="description">Descrição: ${event.description}</p>
            `; // Define o HTML interno do container do evento
            dateContainer.appendChild(eventItem); // Adiciona o evento ao container da data
        });
        
        eventsList.appendChild(dateContainer); // Adiciona o container da data à lista de eventos
    }
}

// Função para agrupar eventos por data
function groupEventsByDate(events) {
    return events.reduce((acc, event) => {
        (acc[event.date] = acc[event.date] || []).push(event); // Agrupa eventos por data
        return acc;
    }, {});
}

// Função para formatar a data
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Opções de formatação da data
    return new Date(dateString).toLocaleDateString('pt-BR', options); // Formata a data para o formato brasileiro
}

