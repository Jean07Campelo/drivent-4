import { prisma } from "@/config";

async function create(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

async function findBookingByRoomId(roomId: number) {
  return prisma.booking.count({
    where: {
      roomId,
    },
  });
}

async function findBookingByUserId(userId: number) {
  return prisma.booking.count({
    where: {
      userId,
    },
  });
}

const bookingRepository = {
  create,
  findBookingByRoomId,
  findBookingByUserId,
};

export default bookingRepository;
