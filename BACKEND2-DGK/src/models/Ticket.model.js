import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  purchaseDate: { type: Date, default: () => new Date() },
  totalAmount: { type: Number, required: true },
  purchaserEmail: { type: String, required: true, lowercase: true, trim: true },
});

export const TicketModel = mongoose.model('Ticket', ticketSchema);
