import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import bookingService from "@/services/bookings-service";
import roomService from "@/services/rooms-service";

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = Number(req.body.roomId);

  try {
    await bookingService.checkTicket(userId);

    await roomService.findRoomById(roomId);

    await bookingService.validateUserHasBooking(userId);

    await roomService.checkRoomAvailable(roomId);

    const newBooking = await bookingService.createBooking(userId, roomId);

    return res.status(httpStatus.OK).send({ bookingId: newBooking.id });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (error.name === "CannotCreateBookingError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function upsertBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = Number(req.body.roomId);
  const bookingId = Number(req.params.bookingId);

  try {
    const roomIdExists = await roomService.findRoomById(roomId);

    await bookingService.validateIfBookingBelongsUser(userId, bookingId);

    await roomService.checkRoomAvailable(roomId);

    const bookingUpdate = await bookingService.update(userId, roomId, bookingId);

    res.status(httpStatus.OK).send({ bookingId: bookingUpdate.id });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (error.name === "CannotCreateBookingError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
