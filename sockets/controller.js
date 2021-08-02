const TicketContol = require('../models/ticket');
const ticketControl = new TicketContol();

const socketController = (socket) => {
  socket.emit('last-ticket', ticketControl.lastTicket);
  socket.emit('screen-tickets', ticketControl.screenTickets);
  socket.emit('pending-tickets', ticketControl.tickets.length);

  socket.on('next-ticket', (payload, callback) => {
    const nextTicket = ticketControl.nextTicket();
    socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);
    callback(nextTicket);
  });

  socket.on('attend-ticket', ({ desktop }, callback) => {
    socket.emit('pending-tickets', ticketControl.tickets.length);
    socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);
    if (!desktop) {
      return callback({ ok: false, msg: `El escritorio es obligatorio.` });
    } else {
      const ticket = ticketControl.attendTicket(desktop);
      socket.broadcast.emit('screen-tickets', ticketControl.screenTickets);
      if (!ticket) {
        return callback({ ok: false, msg: `No hay tickets para atender.` });
      } else return callback({ ok: true, ticket });
    }
  });
};

module.exports = {
  socketController,
};
