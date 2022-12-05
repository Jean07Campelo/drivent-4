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
  return prisma.booking.findFirst({
    where: {
      userId,
    },
  });
}

async function checkBookingByUser(userId: number, bookingId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
      id: bookingId
    }
  });
}

async function update(userId: number, roomId: number, bookingId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      userId,
      roomId,
    }
  });
}

const bookingRepository = {
  create,
  findBookingByRoomId,
  findBookingByUserId,
  checkBookingByUser,
  update,
};

export default bookingRepository;
