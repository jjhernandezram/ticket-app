// Referencias de HTML

const lblTicket1 = document.querySelector('#lbl-ticket-1');
const lblEscritorio1 = document.querySelector('#lbl-desktop-1');
const lblTicket2 = document.querySelector('#lbl-ticket-2');
const lblEscritorio2 = document.querySelector('#lbl-desktop-2');
const lblTicket3 = document.querySelector('#lbl-ticket-3');
const lblEscritorio3 = document.querySelector('#lbl-desktop-3');
const lblTicket4 = document.querySelector('#lbl-ticket-4');
const lblEscritorio4 = document.querySelector('#lbl-desktop-4');

const socket = io();

socket.on('screen-tickets', (payload) => {
  const [ticket1, ticket2, ticket3, ticket4] = payload;

  if (ticket1) {
    lblTicket1.innerText = `Ticket ${ticket1.number}`;
    lblEscritorio1.innerText = `${ticket1.desktop}`;
  }

  if (ticket2) {
    lblTicket2.innerText = `Ticket ${ticket2.number}`;
    lblEscritorio2.innerText = `${ticket2.desktop}`;
  }

  if (ticket3) {
    lblTicket3.innerText = `Ticket ${ticket3.number}`;
    lblEscritorio3.innerText = `${ticket3.desktop}`;
  }

  if (ticket4) {
    lblTicket4.innerText = `Ticket ${ticket4.number}`;
    lblEscritorio4.innerText = `${ticket4.desktop}`;
  }
});
