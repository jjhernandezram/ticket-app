// Referencias de HTML
const desktopName = document.querySelector('#desktop-name');
const btnAttend = document.querySelector('#btn-attend');
const ticketNumber = document.querySelector('small');
const alertMsg = document.querySelector('.alert');
const pendientTickets = document.querySelector('#pendient-tickets');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('El escritorio es obligatorio.');
}

alertMsg.style.display = 'none';

const desktop = searchParams.get('escritorio');
desktopName.innerText = desktop;

const socket = io();

socket.on('connect', () => {
  btnAttend.disabled = false;
});

socket.on('disconnect', () => {
  btnAttend.disabled = true;
});

socket.on('pending-tickets', (ticket) => {
  if (ticket === 0) {
    alertMsg.style.display = '';
  } else {
    alertMsg.style.display = 'none';
  }
  pendientTickets.innerHTML = ticket;
});

btnAttend.addEventListener('click', () => {
  socket.emit('attend-ticket', { desktop }, ({ ok, msg, ticket }) => {
    ticketNumber.innerHTML = `Nadie`;
    if (!ok) {
      alertMsg.style.display = '';
      return (alertMsg.innerHTML = msg);
    } else {
      ticketNumber.innerHTML = `Ticket ${ticket.number}`;
    }
  });
});
