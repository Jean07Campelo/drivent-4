import { ApplicationError } from "@/protocols";

export function cannotCreateBookingError(): ApplicationError {
  return {
    name: "CannotCreateBookingError",
    message: "Cannot create booking!",
  };
}
