import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createBooking, upsertBooking } from "@/controllers";
import { validateBody } from "@/middlewares";
import { createBookingSchema } from "@/schemas";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(createBookingSchema), createBooking)
  .put("/:bookingId", validateBody(createBookingSchema), upsertBooking);

export { bookingsRouter };
