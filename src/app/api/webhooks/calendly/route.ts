import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface CalendlyWebhookPayload {
  event: string;
  payload: {
    event?: { uuid?: string; start_time?: string; end_time?: string };
    event_type?: { name?: string };
    name?: string;
    email?: string;
    text_reminder_number?: string | null;
    timezone?: string;
    questions_and_answers?: Array<{ question: string; answer: string }>;
    scheduled_event?: {
      start_time?: string;
      end_time?: string;
      location?: { join_url?: string | null };
    };
    uri?: string;
    cancellation?: {
      reason?: string | null;
      canceler_type?: string | null;
    };
  };
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseClient =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

function verifyWebhookSignature(
  payload: string,
  signature: string,
  signingKey: string
): boolean {
  const parts = signature.split(",");
  const timestamp = parts.find((part) => part.startsWith("t="))?.split("=")[1];
  const v1Signature = parts.find((part) => part.startsWith("v1="))?.split("=")[1];

  if (!timestamp || !v1Signature) {
    return false;
  }

  const signedPayload = `${timestamp}.${payload}`;

  const expectedSignature = crypto
    .createHmac("sha256", signingKey)
    .update(signedPayload)
    .digest("hex");

  return v1Signature === expectedSignature;
}

function getQuestionAnswer(
  questionsAndAnswers: Array<{ question: string; answer: string }> | undefined,
  questionContains: string
): string | null {
  if (!questionsAndAnswers) {
    return null;
  }

  const match = questionsAndAnswers.find((entry) =>
    entry.question.toLowerCase().includes(questionContains.toLowerCase())
  );

  return match?.answer ?? null;
}

export async function POST(request: NextRequest) {
  try {
    if (!supabaseClient || !supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Supabase service role credentials are missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const rawBody = await request.text();
    const payload = JSON.parse(rawBody) as CalendlyWebhookPayload;

    const signature = request.headers.get("Calendly-Webhook-Signature");
    const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;

    if (signingKey && signature) {
      const isValid = verifyWebhookSignature(rawBody, signature, signingKey);
      if (!isValid) {
        console.error("Invalid Calendly webhook signature");
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 }
        );
      }
    }

    const calendlyEvent = payload.event;
    const data = payload.payload;

    console.log("Calendly webhook received:", calendlyEvent);

    if (calendlyEvent === "invitee.created") {
      const bookingData = {
        calendly_event_uuid: data.event?.uuid ?? null,
        calendly_invitee_uuid: data.uri?.split("/").pop() ?? data.uri,
        event_type: "discovery_call",
        event_name: data.event_type?.name ?? "VIP Discovery Call",
        invitee_name: data.name,
        invitee_email: data.email,
        invitee_phone: data.text_reminder_number ?? null,
        invitee_timezone: data.timezone,
        preparation_notes:
          getQuestionAnswer(data.questions_and_answers, "prepare") ??
          getQuestionAnswer(data.questions_and_answers, "share"),
        start_time: data.scheduled_event?.start_time ?? data.event?.start_time,
        end_time: data.scheduled_event?.end_time ?? data.event?.end_time,
        zoom_link: data.scheduled_event?.location?.join_url ?? null,
        status: "scheduled",
      };

      console.log("Inserting booking:", bookingData);

      const { data: insertedData, error } = await supabaseClient
        .from("calendar_bookings")
        .insert(bookingData)
        .select()
        .single();

      if (error) {
        console.error("Error inserting booking:", error);

        if (error.code === "23505") {
          return NextResponse.json({
            received: true,
            message: "Booking already exists",
          });
        }

        return NextResponse.json(
          { error: "Failed to save booking", details: error.message },
          { status: 500 }
        );
      }

      console.log("Booking saved:", insertedData);

      return NextResponse.json({
        received: true,
        booking_id: insertedData.id,
      });
    }

    if (calendlyEvent === "invitee.canceled") {
      const inviteeUuid = data.uri?.split("/").pop() ?? data.uri;

      const { error } = await supabaseClient
        .from("calendar_bookings")
        .update({
          status: "cancelled",
          cancellation_reason: data.cancellation?.reason ?? null,
          cancelled_by: data.cancellation?.canceler_type ?? "invitee",
        })
        .eq("calendly_invitee_uuid", inviteeUuid);

      if (error) {
        console.error("Error updating cancelled booking:", error);
        return NextResponse.json(
          { error: "Failed to update booking", details: error.message },
          { status: 500 }
        );
      }

      console.log("Booking cancelled:", inviteeUuid);

      return NextResponse.json({
        received: true,
        message: "Booking cancelled",
      });
    }

    console.log("Unhandled Calendly event:", calendlyEvent);
    return NextResponse.json({ received: true, message: "Event not handled" });
  } catch (error) {
    console.error("Calendly webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "Calendly webhook endpoint active" });
}
