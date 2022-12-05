import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createBooking } from "@/controllers";
import { validateBody } from "@/middlewares";
import { createBookingSchema } from "@/schemas";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(createBookingSchema), createBooking);

export { bookingsRouter };
