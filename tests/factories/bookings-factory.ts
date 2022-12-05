import { prisma } from "@/config";

export async function createBookingWithRoomId(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

export async function bookingCount(roomId: number) {
  return await prisma.booking.count({
    where: {
      roomId,
    },
  });
}

export async function findBookingByUserId(userId: number) {
  return await prisma.booking.count({
    where: {
      userId,
    },
  });
}
