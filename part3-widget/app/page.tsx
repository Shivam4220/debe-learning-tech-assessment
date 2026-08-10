"use client";

import { useState } from "react";

type Session = {
  id: number;
  subject: string;
  teacher: string;
  date: string;
  time: string;
  startsAt: string;
};

type Slot = {
  id: number;
  startsAt: string;
  available: boolean;
};

const initialSessions: Session[] = [
  {
    id: 1,
    subject: "Mathematics",
    teacher: "Rahul Sharma",
    date: "Tuesday, August 11",
    time: "4:00 PM",
    startsAt: "2026-08-11T16:00:00Z",
  },
  {
    id: 2,
    subject: "Data Structures",
    teacher: "Ankit Verma",
    date: "Wednesday, August 12",
    time: "11:00 AM",
    startsAt: "2026-08-12T11:00:00Z",
  },
  {
    id: 3,
    subject: "Database Management",
    teacher: "Priya Singh",
    date: "Thursday, August 13",
    time: "3:30 PM",
    startsAt: "2026-08-13T15:30:00Z",
  },
];

const availableSlots: Slot[] = [
  {
    id: 1,
    startsAt: "2026-08-11T10:00:00Z",
    available: true,
  },
  {
    id: 2,
    startsAt: "2026-08-11T11:00:00Z",
    available: false,
  },
  {
    id: 3,
    startsAt: "2026-08-11T12:00:00Z",
    available: true,
  },
  {
    id: 4,
    startsAt: "2026-08-11T14:00:00Z",
    available: false,
  },
  {
    id: 5,
    startsAt: "2026-08-11T15:00:00Z",
    available: true,
  },
  {
    id: 6,
    startsAt: "2026-08-11T16:00:00Z",
    available: true,
  },
  {
    id: 7,
    startsAt: "2026-08-11T17:00:00Z",
    available: false,
  },
];

const formatSlot = (startsAt: string) => {
  const date = new Date(startsAt);

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const formatDate = (startsAt: string) => {
  const date = new Date(startsAt);

  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
};

const formatTime = (startsAt: string) => {
  const date = new Date(startsAt);

  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);

  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [isRescheduling, setIsRescheduling] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const openReschedule = (session: Session) => {
    setSelectedSession(session);
    setSelectedSlot(null);
    setSuccessMessage("");
  };

  const closeReschedule = () => {
    if (isRescheduling) return;

    setSelectedSession(null);
    setSelectedSlot(null);
  };

const isSlotAllowed = (slot: Slot) => {
  const slotTime = new Date(slot.startsAt).getTime();

  const minimumTime = Date.now() + 2 * 60 * 60 * 1000;

  // Don't allow the session to be rescheduled to its current slot
  if (
    selectedSession &&
    new Date(selectedSession.startsAt).getTime() === slotTime
  ) {
    return false;
  }

  return slotTime >= minimumTime;
};

  const confirmReschedule = () => {
    if (!selectedSession || !selectedSlot || isRescheduling) {
      return;
    }

    setIsRescheduling(true);

    setTimeout(() => {
      const newDate = formatDate(selectedSlot.startsAt);
      const newTime = formatTime(selectedSlot.startsAt);

      setSessions((currentSessions) =>
        currentSessions.map((session) =>
          session.id === selectedSession.id
            ? {
                ...session,
                date: newDate,
                time: newTime,
              }
            : session,
        ),
      );

      setIsRescheduling(false);
      setSelectedSession(null);
      setSelectedSlot(null);

      setSuccessMessage(
        `Session rescheduled to ${formatSlot(selectedSlot.startsAt)}`,
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    }, 700);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium text-blue-600">
            Student Dashboard
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Upcoming Sessions
          </h1>

          <p className="mt-2 text-slate-600">
            View your upcoming tutoring sessions and manage your schedule.
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            ✓ {successMessage}
          </div>
        )}

        {/* Upcoming Sessions */}
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {session.subject}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    with {session.teacher}
                  </p>

                  <div className="mt-4 flex flex-col gap-1 text-sm text-slate-700 sm:flex-row sm:gap-4">
                    <span>📅 {session.date}</span>
                    <span>🕐 {session.time}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openReschedule(session)}
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                  Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reschedule Modal */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Reschedule Session
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedSession.subject} with {selectedSession.teacher}
                </p>
              </div>

              <button
                type="button"
                onClick={closeReschedule}
                disabled={isRescheduling}
                className="text-xl text-slate-400 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ×
              </button>
            </div>

            {/* Current Session */}
            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">
                Current session
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {selectedSession.date}
              </p>

              <p className="text-sm text-slate-600">{selectedSession.time}</p>
            </div>

            {/* Available Slots */}
            <div className="mt-6">
              <h3 className="mb-3 font-semibold text-slate-900">
                Available time slots
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {availableSlots.map((slot) => {
                  const allowed = isSlotAllowed(slot);

                  return (
                    <button
                      type="button"
                      key={slot.id}
                      onClick={() => {
                        if (allowed && !isRescheduling) {
                          setSelectedSlot(slot);
                        }
                      }}
                      disabled={!allowed || isRescheduling}
                      className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                        selectedSlot?.id === slot.id
                          ? "border-slate-900 bg-slate-900 text-white"
                          : allowed
                            ? "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                            : "cursor-not-allowed border-slate-100 bg-slate-100 text-slate-400"
                      }`}
                    >
                      {formatSlot(slot.startsAt)}

                      {!allowed && (
                        <span className="mt-1 block text-xs">
                          {!slot.available ? "Booked" : "Too soon"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={closeReschedule}
                disabled={isRescheduling}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmReschedule}
                disabled={!selectedSlot || isRescheduling}
                className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isRescheduling ? "Rescheduling..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
