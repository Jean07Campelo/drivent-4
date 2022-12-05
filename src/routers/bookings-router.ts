import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createBooking, upsertBooking, getBooking } from "@/controllers";
import { validateBody } from "@/middlewares";
import { createBookingSchema } from "@/schemas";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", validateBody(createBookingSchema), createBooking)
  .put("/:bookingId", validateBody(createBookingSchema), upsertBooking);

export { bookingsRouter };
