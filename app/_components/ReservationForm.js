"use client";

import { useReservation } from "./ReservationContext";

function ReservationForm({ cabin, user }) {
  const { range } = useReservation();
  const { maxCapacity } = cabin;

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

      <form className="p-6 flex flex-col gap-5">
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
          <p className="text-xs text-[#9ca3af]">Start by selecting dates</p>
          <button className="bg-[#d4a55d] hover:bg-[#c4954a] text-[#0c0f14] px-6 py-2 text-sm font-semibold transition">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
