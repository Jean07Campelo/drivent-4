import bookingRepository from "@/repositories/booking-repository";
import roomRepository from "@/repositories/room-repository";
import { notFoundError, cannotCreateBookingError } from "@/errors";

async function findRoomById(roomId: number) {
  const roomIdExists = await roomRepository.findRoom(roomId);

  if (!roomIdExists) {
    throw notFoundError();
  }
}

async function checkRoomAvailable(roomId: number) {
  const occupation = await bookingRepository.findBookingByRoomId(roomId);
  const { capacity } = await roomRepository.findRoom(roomId);

  if (occupation === capacity) {
    throw cannotCreateBookingError();
  }

  return occupation;
}

const roomService = {
  findRoomById,
  checkRoomAvailable,
};

export default roomService;
