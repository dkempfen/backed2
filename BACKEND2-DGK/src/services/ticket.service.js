import { TicketModel } from '../models/Ticket.model.js';
import crypto from 'crypto';

export const generateTicket = async (total, buyerEmail) => {
  const uniqueCode = crypto.randomBytes(6).toString('hex');

  const newTicket = await TicketModel.create({
    code: uniqueCode,
    amount: total,
    purchaser: buyerEmail,
  });

  return newTicket;
};
