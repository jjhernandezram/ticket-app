// HTML REFERENCES
const viewLastTicket = document.querySelector('#view-last-ticket');
const createNewTicket = document.querySelector('#btn-new-ticket');

const socket = io();

socket.on('connect', () => {
  createNewTicket.disabled = false;
});

socket.on('disconnect', () => {
  createNewTicket.disabled = true;
});

socket.on('last-ticket', (ticket) => {
  viewLastTicket.innerHTML = `Ticket ${ticket}`;
});

createNewTicket.addEventListener('click', (e) => {
  socket.emit('next-ticket', null, (ticket) => {
    viewLastTicket.innerHTML = ticket;
  });
});
