import { notFoundError } from "@/errors";
import { Booking } from "@prisma/client";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketStatus } from "@prisma/client";
import bookingRepository from "@/repositories/booking-repository";
import { cannotCreateBookingError } from "@/errors/cannot-create-booking-error";

async function checkTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const ticketUser = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticketUser || !enrollment) {
    throw notFoundError();
  }

  if (
    ticketUser.status === TicketStatus.RESERVED ||
    ticketUser.TicketType.isRemote ||
    !ticketUser.TicketType.includesHotel
  ) {
    throw cannotCreateBookingError();
  }
  return ticketUser;
}

async function createBooking(userId: number, roomId: number) {
  return bookingRepository.create(userId, roomId);
}

async function validateUserHasBooking(userId: number) {
  const userHaveBooking = await bookingRepository.findBookingByUserId(userId);

  if (userHaveBooking) {
    throw cannotCreateBookingError();
  }

  return userHaveBooking;
}

async function validateIfBookingBelongsUser(userId: number, bookingId: number) {
  const bookingBelongsUser = await bookingRepository.checkBookingByUser(userId, bookingId);

  if (!bookingBelongsUser) {
    throw cannotCreateBookingError();
  }
}

async function update(userId: number, roomId: number, bookingId: number) {
  return bookingRepository.update(userId, roomId, bookingId);
}

async function validateBookingByUserId(userId: number) {
  const userHaveBooking = await bookingRepository.findBookingByUserId(userId);

  if (!userHaveBooking) {
    throw notFoundError();
  }

  return {
    id: userHaveBooking.id,
    Room: userHaveBooking.Room,
  };
}

export type CreateBookingParams = Pick<Booking, "roomId">;

const bookingService = {
  checkTicket,
  createBooking,
  validateUserHasBooking,
  validateIfBookingBelongsUser,
  update,
  validateBookingByUserId,
};

export default bookingService;
