"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type EventItem = {
  id: number;
  title: string;
  date: string;
  doorsOpen?: string;
};

type Reservation = {
  id: number;
  name: string;
  email: string;
  table: string;
  guests: string;
  date: string;
  phone: string;
  eventId?: number;
};

type TableItem = {
  number: string;
  seats: number;
  image: string;
};

type BookTableProps = {
  events: EventItem[];
};

const rowPattern = [
  { seats: 4, image: "/images/table_1.png" },
  { seats: 4, image: "/images/table_1.png" },
  { seats: 6, image: "/images/table_2.png" },
  { seats: 4, image: "/images/table_1.png" },
  { seats: 8, image: "/images/table_3.png" },
];

const tables: TableItem[] = Array.from({ length: 15 }, (_, index) => {
  const pattern = rowPattern[index % 5];

  return {
    number: String(index + 1),
    seats: pattern.seats,
    image: pattern.image,
  };
});

function formatEventDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function TableCard({
  table,
  isSelected,
  isReserved,
  isTooSmall,
  onClick,
}: {
  table: TableItem;
  isSelected: boolean;
  isReserved: boolean;
  isTooSmall: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={isReserved}
      onClick={onClick}
      aria-label={`Table ${table.number}, ${table.seats} seats`}
      className={`relative flex h-[220px] w-[270px] items-center justify-center transition md:h-[105px] md:w-[125px] ${
        isReserved
          ? "cursor-not-allowed opacity-25"
          : "cursor-pointer hover:scale-105"
      }`}
    >
      <img
        src={table.image}
        alt={`Table ${table.number} with ${table.seats} seats`}
        className="h-full w-full object-contain"
      />

      <span
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold md:text-sm ${
          isSelected ? "text-[oklch(0.65_0.25_8)]" : "text-white"
        }`}
      >
        {table.number}
      </span>

      {isTooSmall && !isSelected && !isReserved && (
        <span className="absolute inset-0 border-2 border-yellow-400" />
      )}

      {isSelected && (
        <span className="absolute inset-0 border-2 border-[oklch(0.65_0.25_8)]" />
      )}
    </button>
  );
}

export default function BookTable({ events }: BookTableProps) {
  const [reservedTables, setReservedTables] = useState<string[]>([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [selectedTable, setSelectedTable] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingReservations, setIsLoadingReservations] = useState(false);

  const selectedEvent = useMemo(
    () => events.find((event) => String(event.id) === selectedEventId),
    [events, selectedEventId],
  );

  const selectedTableData = tables.find(
    (table) => table.number === selectedTable,
  );

  const guestsNumber = Number(guests);

  const selectedTableIsTooSmall =
    !!selectedTableData &&
    !!guestsNumber &&
    guestsNumber > selectedTableData.seats;

  useEffect(() => {
    async function loadReservations() {
      if (!selectedEventId) {
        setReservedTables([]);
        return;
      }

      setIsLoadingReservations(true);
      setSelectedTable("");

      try {
        const response = await fetch(
          `/api/reservations?eventId=${selectedEventId}`,
        );

        if (!response.ok) {
          setReservedTables([]);
          return;
        }

        const data: Reservation[] = await response.json();
        setReservedTables(data.map((reservation) => reservation.table));
      } catch {
        setReservedTables([]);
      } finally {
        setIsLoadingReservations(false);
      }
    }

    loadReservations();
  }, [selectedEventId]);

  function handleTableClick(table: TableItem) {
    if (reservedTables.includes(table.number)) return;

    setSelectedTable(table.number);

    if (guestsNumber > table.seats) {
      setMessage(
        `Table ${table.number} only seats ${table.seats} guests. Please choose a larger table.`,
      );
      setMessageType("error");
    } else {
      setMessage("");
      setMessageType("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedGuests = guests.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedGuests) {
      setMessage("Please fill in all required fields.");
      setMessageType("error");
      return;
    }

    if (!selectedEvent) {
      setMessage("Please choose a night.");
      setMessageType("error");
      return;
    }

    if (!selectedTable) {
      setMessage("Please choose a table.");
      setMessageType("error");
      return;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!emailIsValid) {
      setMessage("Please enter a valid email.");
      setMessageType("error");
      return;
    }

    if (!guestsNumber || guestsNumber < 1) {
      setMessage("Please enter a valid number of guests.");
      setMessageType("error");
      return;
    }

    if (reservedTables.includes(selectedTable)) {
      setMessage(`Table ${selectedTable} is already reserved for this event.`);
      setMessageType("error");
      return;
    }

    if (selectedTableIsTooSmall && selectedTableData) {
      setMessage(
        `Table ${selectedTableData.number} only seats ${selectedTableData.seats} guests. Please choose a larger table.`,
      );
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          table: selectedTable,
          guests: trimmedGuests,
          date: selectedEvent.doorsOpen || selectedEvent.date,
          phone: trimmedPhone,
          eventId: selectedEvent.id,
        }),
      });

      if (!response.ok) {
        setMessage("Reservation could not be created. Please try again.");
        setMessageType("error");
        return;
      }

      setMessage("Your table has been reserved!");
      setMessageType("success");
      setReservedTables((current) => [...current, selectedTable]);

      setName("");
      setEmail("");
      setGuests("");
      setPhone("");
      setComment("");
      setSelectedTable("");
    } catch {
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section
        className="relative flex h-[115px] items-center justify-center bg-cover bg-center bg-no-repeat px-8 text-center md:h-[240px]"
        style={{
          backgroundImage: "url('/images/fest.webp')",
        }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold uppercase tracking-[4px] md:text-4xl">
            Book Table
          </h1>

          <img
            src="/images/sline.webp"
            alt=""
            className="mx-auto mt-4 h-auto w-[220px] md:w-[260px]"
          />
        </div>
      </section>

      <section className="bg-[oklch(0.04_0_0)] px-8 py-16 text-white">
        <div className="mx-auto max-w-[980px]">
          <div className="grid grid-cols-1 justify-items-center gap-y-0 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8 md:grid-cols-5">
            {tables.map((table) => {
              const isReserved = reservedTables.includes(table.number);
              const isSelected = selectedTable === table.number;
              const isTooSmall =
                !!guestsNumber && guestsNumber > table.seats && !isReserved;

              return (
                <TableCard
                  key={table.number}
                  table={table}
                  isSelected={isSelected}
                  isReserved={isReserved}
                  isTooSmall={isTooSmall}
                  onClick={() => handleTableClick(table)}
                />
              );
            })}
          </div>

          {isLoadingReservations && (
            <p className="mt-8 text-center text-sm font-medium text-white/80">
              Loading reserved tables...
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-16">
            <h2 className="text-2xl font-bold uppercase">Book A Table</h2>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-14 border border-white/50 bg-transparent px-5 text-sm font-medium text-white outline-none placeholder:text-white focus:border-[oklch(0.65_0.25_8)]"
              />

              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-14 border border-white/50 bg-transparent px-5 text-sm font-medium text-white outline-none placeholder:text-white focus:border-[oklch(0.65_0.25_8)]"
              />

              <input
                type="text"
                placeholder="Table Number"
                value={selectedTable}
                readOnly
                className="h-14 border border-white/50 bg-transparent px-5 text-sm font-medium text-white outline-none placeholder:text-white"
              />

              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Number of Guests"
                value={guests}
                onChange={(event) => {
                  const onlyNumbers = event.target.value.replace(/\D/g, "");
                  setGuests(onlyNumbers);
                }}
                className="h-14 border border-white/50 bg-transparent px-5 text-sm font-medium text-white outline-none placeholder:text-white focus:border-[oklch(0.65_0.25_8)]"
              />

              <div className="relative">
                <select
                  value={selectedEventId}
                  onChange={(event) => setSelectedEventId(event.target.value)}
                  className="h-14 w-full appearance-none border border-white/50 bg-black px-5 pr-12 text-sm font-medium text-white outline-none focus:border-[oklch(0.65_0.25_8)]"
                >
                  <option value="">
                    {events.length === 0 ? "No nights available" : "Choose Night"}
                  </option>

                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title} — {formatEventDate(event.date)}
                    </option>
                  ))}
                </select>

                <span className="pointer-events-none absolute right-5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white" />
              </div>

              <input
                type="tel"
                placeholder="Your Contact Number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="h-14 border border-white/50 bg-transparent px-5 text-sm font-medium text-white outline-none placeholder:text-white focus:border-[oklch(0.65_0.25_8)]"
              />
            </div>

            <div className="relative mt-4">
              <textarea
                placeholder="Your Comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className="block h-[190px] w-full resize-none border border-white/50 bg-transparent px-5 py-5 text-sm font-medium text-white outline-none placeholder:text-white focus:border-[oklch(0.65_0.25_8)]"
              />

              <div className="pointer-events-none absolute bottom-[4px] right-[2px] h-[34px] w-[34px] overflow-hidden">
                <span className="absolute -bottom-[2px] -right-[2px] h-[1px] w-[28px] -rotate-45 bg-white" />
                <span className="absolute bottom-[8px] right-[2px] h-[1px] w-[18px] -rotate-45 bg-white" />
              </div>
            </div>

            {message && (
              <p
                className={`mt-6 text-sm font-bold ${
                  messageType === "success"
                    ? "text-green-400"
                    : message.includes("only seats")
                      ? "text-yellow-400"
                      : "text-[oklch(0.65_0.25_8)]"
                }`}
              >
                {message}
              </p>
            )}

            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-[150px] border-y-2 border-white py-4 text-sm font-bold uppercase tracking-[0.06em] transition hover:border-[oklch(0.65_0.25_8)] hover:text-[oklch(0.65_0.25_8)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Reserve"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}