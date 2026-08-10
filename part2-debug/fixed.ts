import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

interface BookingRequest {
  studentId: string;
  teacherId: string;
  slot: string; // ISO datetime string
  subject: string;
}

interface BookingResponse {
  success: boolean;
  message?: string;
}

export const bookSession = functions.https.onCall(
  async (data: BookingRequest, context): Promise<BookingResponse> => {
    // Fix 4: The function must verify that the caller is authenticated
    // and that they are booking for their own student account.
    // Without this check, an unauthenticated or malicious client could
    // submit another student's ID and create bookings on their behalf.
    if (!context.auth) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    if (data.studentId !== context.auth.uid) {
      return {
        success: false,
        message: "Unauthorized booking request",
      };
    }

    // Fix 3: TypeScript types do not exist at runtime. A client can still
    // send malformed data, so the callable function must validate the
    // incoming fields before using them or writing them to Firestore.
    if (
      typeof data?.studentId !== "string" ||
      typeof data?.teacherId !== "string" ||
      typeof data?.slot !== "string" ||
      typeof data?.subject !== "string" ||
      !data.studentId.trim() ||
      !data.teacherId.trim() ||
      !data.slot.trim() ||
      !data.subject.trim()
    ) {
      return {
        success: false,
        message: "Invalid booking data",
      };
    }

    const teacherRef = db.collection("teachers").doc(data.teacherId);

    // Fix 1: Firestore get() returns a Promise. The function must await
    // the query before checking its documents. Without await, existing
    // would be a Promise rather than the actual query result.
    const existing = await teacherRef
      .collection("bookings")
      .where("slot", "==", data.slot)
      .get();

    // Prevent booking a slot that is already occupied.
    if (existing.docs.length > 0) {
      return {
        success: false,
        message: "Slot already booked",
      };
    }

    const booking = {
      studentId: data.studentId,
      teacherId: data.teacherId,
      slot: data.slot,
      subject: data.subject,
      status: "confirmed",
      createdAt: new Date(),
    };

    // Fix 2: The Firestore write must be awaited before returning success.
    // Otherwise the function could return success while the database
    // operation is still pending or could eventually fail.
    await db.collection("bookings").add(booking);

    return {
      success: true,
    };
  },
);
