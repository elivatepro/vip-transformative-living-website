import { createClient } from "@/lib/supabase-server";
import BookingsPage from "@/components/admin/bookings/BookingsPage";
import { Booking } from "@/components/admin/bookings/BookingsPage";

export default async function Page() {
  const supabase = await createClient();

  // Fetch all bookings for client-side filtering/management
  // In a production app with thousands of records, we'd want server-side pagination/filtering
  // but for the admin dashboard initially, client-side is faster and more interactive
  const { data, error } = await supabase
    .from('calendar_bookings')
    .select('*')
    .order('start_time', { ascending: false })
    .limit(100);

  if (error) {
    console.error("Error fetching bookings:", error);
    // In a real app we might want to throw an error or show an error state
  }

  // Cast the data to the Booking type
  // ensuring to handle potential nulls or mismatches if necessary
  const bookings = (data || []) as Booking[];

  return <BookingsPage initialBookings={bookings} />;
}
