"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="bg-primary-900 text-primary-100 text-sm">
      <div className="bg-primary-800 text-primary-300 px-4 py-2 text-xs flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        // action={createBookingWithData}
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="p-6 flex flex-col gap-5"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests" className="text-sm">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full bg-primary-200 text-primary-800 border border-[#4b5563] text-sm px-4 py-2"
            required
          >
            <option value="">Select number of guests...</option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations" className="text-sm">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            rows={4}
            className="w-full bg-primary-200 text-primary-800 border border-[#4b5563] text-sm px-4 py-2 placeholder:text-[#6b7280]"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-between items-center pt-2">
          {!(startDate && endDate) ? (
            <p className="text-xs text-[#9ca3af]">Start by selecting dates</p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
