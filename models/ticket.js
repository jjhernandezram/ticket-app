const path = require('path');
const fs = require('fs');

class Ticket {
  constructor(number, desktop) {
    this.number = number;
    this.desktop = desktop;
  }
}

class TicketContol {
  constructor() {
    this.lastTicket = 0;
    this.date = new Date().getDate();
    this.tickets = [];
    this.screenTickets = [];

    this.init();
  }

  get toJson() {
    return {
      lastTicket: this.lastTicket,
      date: this.date,
      tickets: this.tickets,
      screenTickets: this.screenTickets,
    };
  }
  init() {
    const { lastTicket, date, tickets, screenTickets } = require('../db/data.json');
    if (date === this.date) {
      this.lastTicket = lastTicket;
      this.tickets = tickets;
      this.screenTickets = screenTickets;
    } else {
      this.saveDB();
    }
  }

  saveDB() {
    const dbPath = path.join(__dirname, '../db/data.json');
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  nextTicket() {
    this.lastTicket += 1;
    const ticket = new Ticket(this.lastTicket, null);
    this.tickets.push(ticket);

    this.saveDB();
    return `Ticket ${ticket.number}`;
  }

  attendTicket(desktop) {
    if (this.tickets.length === 0) {
      return null;
    }

    const ticket = this.tickets.shift();
    ticket.desktop = desktop;

    this.screenTickets.unshift(ticket);

    if (this.screenTickets.length > 4) {
      this.screenTickets.splice(-1, 1);
    }
    this.saveDB();
    return ticket;
  }
}

module.exports = TicketContol;
