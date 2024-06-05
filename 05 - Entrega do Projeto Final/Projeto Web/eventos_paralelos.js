document.getElementById('toggleMenu').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.display === 'block') {
        sidebar.style.display = 'none';
    } else {
        sidebar.style.display = 'block';
    }
  });

const eventsList = document.getElementById("eventsList");
const addEventForm = document.getElementById("addEventForm");
const eventName = document.getElementById("eventName");
const eventDate = document.getElementById("eventDate");
const eventTime = document.getElementById("eventTime");
const eventLocation = document.getElementById("eventLocation");
const eventDescription = document.getElementById("eventDescription");

document.addEventListener("DOMContentLoaded", function () {
    loadEvents();

    addEventForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const newEvent = {
            name: eventName.value,
            date: eventDate.value,
            time: eventTime.value,
            location: eventLocation.value,
            description: eventDescription.value
        };
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));
        loadEvents();
        addEventForm.reset();
    });
});

function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    eventsList.innerHTML = "";
    const eventsByDate = groupEventsByDate(events);
    for (const date in eventsByDate) {
        const dateContainer = document.createElement("div");
        dateContainer.className = "event-date-container";
        
        const dateHeader = document.createElement("h3");
        dateHeader.textContent = formatDate(date);
        dateContainer.appendChild(dateHeader);
        
        eventsByDate[date].forEach(event => {
            const eventItem = document.createElement("div");
            eventItem.className = "event";
            eventItem.innerHTML = `
                <h4>${event.name}</h4>
                <p>Horário: ${event.time}</p>
                <p>Local: ${event.location}</p>
                <p class="description">Descrição: ${event.description}</p>
            `;
            dateContainer.appendChild(eventItem);
        });
        
        eventsList.appendChild(dateContainer);
    }
}

function groupEventsByDate(events) {
    return events.reduce((acc, event) => {
        (acc[event.date] = acc[event.date] || []).push(event);
        return acc;
    }, {});
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}
