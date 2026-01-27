# VIP Transformative Living
## Calendly Integration — Step-by-Step Implementation Guide

**Goal:** Capture VIP Discovery Call bookings from Calendly and display them in the Admin Panel

---

# OVERVIEW

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│              │      │              │      │              │      │              │
│   Visitor    │ ───▶ │   Calendly   │ ───▶ │  Your API    │ ───▶ │   Supabase   │
│   Books      │      │   Webhook    │      │  /api/...    │      │   Database   │
│   Call       │      │              │      │              │      │              │
└──────────────┘      └──────────────┘      └──────────────┘      └──────────────┘
                                                                         │
                                                                         ▼
                                                                  ┌──────────────┐
                                                                  │              │
                                                                  │ Admin Panel  │
                                                                  │ /admin/      │
                                                                  │ bookings     │
                                                                  │              │
                                                                  └──────────────┘
```

**What we're capturing:**
- Name
- Email  
- Phone (SMS)
- Preparation notes ("Please share anything...")
- Meeting date/time
- Zoom link
- Booking status (scheduled, cancelled, completed)

---

# STEP 1: CREATE SUPABASE TABLE

## 1.1 Open Supabase Dashboard

1. Go to [supabase.com](https://supabase.com) and log in
2. Select your VIPTL project
3. Click **SQL Editor** in the left sidebar

## 1.2 Run This SQL

Copy and paste this entire SQL block, then click **Run**:

```sql
-- =============================================
-- CALENDLY BOOKINGS TABLE
-- =============================================

CREATE TABLE calendar_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Calendly identifiers (for tracking updates/cancellations)
  calendly_event_uuid VARCHAR(255),
  calendly_invitee_uuid VARCHAR(255) UNIQUE,
  
  -- Event info
  event_type VARCHAR(100) DEFAULT 'discovery_call',
  event_name VARCHAR(255) DEFAULT 'VIP Discovery Call',
  
  -- Invitee details
  invitee_name VARCHAR(255) NOT NULL,
  invitee_email VARCHAR(255) NOT NULL,
  invitee_phone VARCHAR(50),
  invitee_timezone VARCHAR(100),
  
  -- The custom question answer
  preparation_notes TEXT,
  
  -- Scheduling
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  
  -- Meeting details
  zoom_link VARCHAR(500),
  
  -- Status: 'scheduled', 'completed', 'cancelled', 'no_show'
  status VARCHAR(50) DEFAULT 'scheduled',
  cancellation_reason TEXT,
  cancelled_by VARCHAR(50), -- 'invitee' or 'host'
  
  -- Admin use
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INDEXES FOR FASTER QUERIES
-- =============================================

CREATE INDEX idx_bookings_invitee_uuid ON calendar_bookings(calendly_invitee_uuid);
CREATE INDEX idx_bookings_email ON calendar_bookings(invitee_email);
CREATE INDEX idx_bookings_start_time ON calendar_bookings(start_time);
CREATE INDEX idx_bookings_status ON calendar_bookings(status);

-- =============================================
-- AUTO-UPDATE updated_at TRIGGER
-- =============================================

CREATE OR REPLACE FUNCTION update_calendar_bookings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_calendar_bookings_timestamp
    BEFORE UPDATE ON calendar_bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_calendar_bookings_updated_at();

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE calendar_bookings ENABLE ROW LEVEL SECURITY;

-- Admin can do everything (authenticated users)
CREATE POLICY "Admin full access to bookings" ON calendar_bookings
    FOR ALL USING (auth.role() = 'authenticated');

-- Service role can insert (for webhook)
CREATE POLICY "Service role can insert bookings" ON calendar_bookings
    FOR INSERT WITH CHECK (true);

-- Service role can update (for cancellations)
CREATE POLICY "Service role can update bookings" ON calendar_bookings
    FOR UPDATE USING (true);
```

## 1.3 Verify Table Created

1. Click **Table Editor** in the left sidebar
2. You should see `calendar_bookings` in the list
3. Click on it to see the empty table with all columns

✅ **Checkpoint:** Table created successfully

---

# STEP 2: GET SUPABASE CREDENTIALS

You'll need these for the webhook endpoint.

## 2.1 Get Project URL

1. In Supabase, click **Settings** (gear icon) in left sidebar
2. Click **API** under Configuration
3. Copy the **Project URL** (looks like `https://xxxxx.supabase.co`)

## 2.2 Get Service Role Key

On the same API page:
1. Find **Project API keys**
2. Copy the **service_role** key (NOT the anon key)
   - ⚠️ This key has full access — keep it secret!

## 2.3 Add to Environment Variables

In your project's `.env.local` file, add:

```env
# Supabase (you may already have these)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Add this one for webhooks (if not already present)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Calendly (we'll add this in Step 4)
CALENDLY_WEBHOOK_SIGNING_KEY=your-signing-key
```

✅ **Checkpoint:** Environment variables configured

---

# STEP 3: CREATE WEBHOOK API ENDPOINT

## 3.1 Create the API Route File

Create this file in your Next.js project:

**File path:** `app/api/webhooks/calendly/route.ts`

```typescript
// app/api/webhooks/calendly/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Initialize Supabase with service role (bypasses RLS)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Verify Calendly webhook signature
function verifyWebhookSignature(
  payload: string,
  signature: string,
  signingKey: string
): boolean {
  // Calendly uses the format: t=timestamp,v1=signature
  const parts = signature.split(',');
  const timestamp = parts.find(p => p.startsWith('t='))?.split('=')[1];
  const v1Signature = parts.find(p => p.startsWith('v1='))?.split('=')[1];
  
  if (!timestamp || !v1Signature) {
    return false;
  }
  
  // Create the signed payload
  const signedPayload = `${timestamp}.${payload}`;
  
  // Calculate expected signature
  const expectedSignature = crypto
    .createHmac('sha256', signingKey)
    .update(signedPayload)
    .digest('hex');
  
  return v1Signature === expectedSignature;
}

// Extract answer for a specific question
function getQuestionAnswer(
  questionsAndAnswers: Array<{ question: string; answer: string }> | undefined,
  questionContains: string
): string | null {
  if (!questionsAndAnswers) return null;
  
  const qa = questionsAndAnswers.find(
    (q) => q.question.toLowerCase().includes(questionContains.toLowerCase())
  );
  
  return qa?.answer || null;
}

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    const payload = JSON.parse(rawBody);
    
    // Verify webhook signature (recommended for security)
    const signature = request.headers.get('Calendly-Webhook-Signature');
    const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
    
    if (signingKey && signature) {
      const isValid = verifyWebhookSignature(rawBody, signature, signingKey);
      if (!isValid) {
        console.error('Invalid Calendly webhook signature');
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }
    
    const event = payload.event; // 'invitee.created' or 'invitee.canceled'
    const data = payload.payload;
    
    console.log('Calendly webhook received:', event);
    
    // ─────────────────────────────────────────────────────────
    // HANDLE NEW BOOKING
    // ─────────────────────────────────────────────────────────
    if (event === 'invitee.created') {
      
      // Extract data from Calendly payload
      const bookingData = {
        // Calendly identifiers
        calendly_event_uuid: data.event?.uuid || null,
        calendly_invitee_uuid: data.uri?.split('/').pop() || data.uri,
        
        // Event info
        event_type: 'discovery_call',
        event_name: data.event_type?.name || 'VIP Discovery Call',
        
        // Invitee details
        invitee_name: data.name,
        invitee_email: data.email,
        invitee_phone: data.text_reminder_number || null,
        invitee_timezone: data.timezone,
        
        // Custom question: preparation notes
        preparation_notes: getQuestionAnswer(
          data.questions_and_answers,
          'prepare'
        ) || getQuestionAnswer(
          data.questions_and_answers,
          'share'
        ),
        
        // Scheduling
        start_time: data.scheduled_event?.start_time || data.event?.start_time,
        end_time: data.scheduled_event?.end_time || data.event?.end_time,
        
        // Zoom link
        zoom_link: data.scheduled_event?.location?.join_url || null,
        
        // Status
        status: 'scheduled',
      };
      
      console.log('Inserting booking:', bookingData);
      
      const { data: insertedData, error } = await supabase
        .from('calendar_bookings')
        .insert(bookingData)
        .select()
        .single();
      
      if (error) {
        console.error('Error inserting booking:', error);
        
        // If duplicate, that's okay
        if (error.code === '23505') {
          return NextResponse.json({ 
            received: true, 
            message: 'Booking already exists' 
          });
        }
        
        return NextResponse.json(
          { error: 'Failed to save booking', details: error.message },
          { status: 500 }
        );
      }
      
      console.log('Booking saved:', insertedData);
      
      return NextResponse.json({ 
        received: true, 
        booking_id: insertedData.id 
      });
    }
    
    // ─────────────────────────────────────────────────────────
    // HANDLE CANCELLATION
    // ─────────────────────────────────────────────────────────
    if (event === 'invitee.canceled') {
      
      const inviteeUuid = data.uri?.split('/').pop() || data.uri;
      
      const { error } = await supabase
        .from('calendar_bookings')
        .update({
          status: 'cancelled',
          cancellation_reason: data.cancellation?.reason || null,
          cancelled_by: data.cancellation?.canceler_type || 'invitee',
        })
        .eq('calendly_invitee_uuid', inviteeUuid);
      
      if (error) {
        console.error('Error updating cancelled booking:', error);
        return NextResponse.json(
          { error: 'Failed to update booking', details: error.message },
          { status: 500 }
        );
      }
      
      console.log('Booking cancelled:', inviteeUuid);
      
      return NextResponse.json({ 
        received: true, 
        message: 'Booking cancelled' 
      });
    }
    
    // Unknown event type
    console.log('Unhandled Calendly event:', event);
    return NextResponse.json({ received: true, message: 'Event not handled' });
    
  } catch (error) {
    console.error('Calendly webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Calendly may send a GET request to verify the endpoint
export async function GET() {
  return NextResponse.json({ status: 'Calendly webhook endpoint active' });
}
```

## 3.2 Deploy Your Changes

Push this code to your hosting platform (Vercel, etc.) so the endpoint is live.

```bash
git add .
git commit -m "Add Calendly webhook endpoint"
git push
```

Wait for deployment to complete.

## 3.3 Get Your Webhook URL

Your webhook URL will be:
```
https://your-domain.com/api/webhooks/calendly
```

For example:
```
https://viptransformativeliving.com/api/webhooks/calendly
```

✅ **Checkpoint:** API endpoint created and deployed

---

# STEP 4: REGISTER WEBHOOK IN CALENDLY

Now we connect Calendly to your endpoint.

## 4.1 Get Calendly API Access

1. Go to [calendly.com/integrations/api_webhooks](https://calendly.com/integrations/api_webhooks)
   - Or: Login → Integrations → API & Webhooks

2. Under **Personal Access Tokens**, click **Generate New Token**
   - Name it: `VIPTL Website`
   - Click **Create Token**
   - Copy the token (you'll only see it once!)

## 4.2 Create Webhook Subscription

You'll need to use Calendly's API to create a webhook. Here's the easiest way:

### Option A: Use a Tool Like Postman or cURL

**Using cURL (in terminal):**

```bash
curl --request POST \
  --url https://api.calendly.com/webhook_subscriptions \
  --header 'Authorization: Bearer YOUR_PERSONAL_ACCESS_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "url": "https://your-domain.com/api/webhooks/calendly",
    "events": [
      "invitee.created",
      "invitee.canceled"
    ],
    "organization": "https://api.calendly.com/organizations/YOUR_ORG_ID",
    "scope": "organization"
  }'
```

**To get your Organization ID:**

```bash
curl --request GET \
  --url https://api.calendly.com/users/me \
  --header 'Authorization: Bearer YOUR_PERSONAL_ACCESS_TOKEN'
```

Look for `current_organization` in the response.

### Option B: Use Calendly's Webhook UI (if available)

Some Calendly plans have a UI for this:
1. Go to **Integrations** → **Webhooks**
2. Click **Add Webhook**
3. Enter your URL: `https://your-domain.com/api/webhooks/calendly`
4. Select events: `invitee.created`, `invitee.canceled`
5. Save

## 4.3 Get the Webhook Signing Key

After creating the webhook, Calendly will provide a **signing key**.

1. Copy this signing key
2. Add it to your `.env.local`:

```env
CALENDLY_WEBHOOK_SIGNING_KEY=your-signing-key-here
```

3. Redeploy your app so it picks up the new environment variable

✅ **Checkpoint:** Webhook registered in Calendly

---

# STEP 5: TEST THE INTEGRATION

## 5.1 Make a Test Booking

1. Go to your Calendly booking page
2. Book a VIP Discovery Call with test details:
   - Name: Test User
   - Email: test@example.com
   - Phone: 1234567890
   - Preparation notes: "This is a test booking"

## 5.2 Check Supabase

1. Go to Supabase Dashboard
2. Click **Table Editor** → `calendar_bookings`
3. You should see your test booking! 🎉

## 5.3 Check Your Server Logs

If the booking doesn't appear:
1. Check your deployment logs (Vercel dashboard → Deployments → Logs)
2. Look for `Calendly webhook received:` messages
3. Look for any error messages

## 5.4 Test Cancellation

1. Go to your Calendly dashboard
2. Find the test booking
3. Cancel it
4. Check Supabase — the status should now be `cancelled`

## 5.5 Clean Up Test Data

Delete the test booking from Supabase:
```sql
DELETE FROM calendar_bookings WHERE invitee_email = 'test@example.com';
```

✅ **Checkpoint:** Integration working!

---

# STEP 6: ADMIN PANEL BOOKINGS PAGE

Now let's display bookings in the Admin Panel.

## 6.1 Create the Bookings Page

**File:** `app/admin/bookings/page.tsx`

```typescript
// app/admin/bookings/page.tsx

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import BookingsView from '@/components/admin/bookings/BookingsView';

export default async function BookingsPage() {
  const supabase = createServerComponentClient({ cookies });
  
  // Fetch all bookings
  const { data: bookings, error } = await supabase
    .from('calendar_bookings')
    .select('*')
    .order('start_time', { ascending: false });
  
  if (error) {
    console.error('Error fetching bookings:', error);
  }
  
  return (
    <div>
      <BookingsView initialBookings={bookings || []} />
    </div>
  );
}
```

## 6.2 Create the Bookings View Component

**File:** `components/admin/bookings/BookingsView.tsx`

```typescript
// components/admin/bookings/BookingsView.tsx

'use client';

import { useState } from 'react';
import BookingsTable from './BookingsTable';
import BookingsCalendar from './BookingsCalendar';

interface Booking {
  id: string;
  invitee_name: string;
  invitee_email: string;
  invitee_phone: string | null;
  preparation_notes: string | null;
  start_time: string;
  end_time: string;
  zoom_link: string | null;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  admin_notes: string | null;
  created_at: string;
}

interface Props {
  initialBookings: Booking[];
}

export default function BookingsView({ initialBookings }: Props) {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Filter bookings by status
  const filteredBookings = initialBookings.filter((booking) => {
    if (statusFilter === 'all') return true;
    return booking.status === statusFilter;
  });
  
  // Separate upcoming and past
  const now = new Date();
  const upcomingBookings = filteredBookings.filter(
    (b) => new Date(b.start_time) >= now && b.status === 'scheduled'
  );
  const pastBookings = filteredBookings.filter(
    (b) => new Date(b.start_time) < now || b.status !== 'scheduled'
  );
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Bookings</h1>
          <p className="text-gray-400 text-sm mt-1">
            {upcomingBookings.length} upcoming · {pastBookings.length} past
          </p>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex bg-[#1a1a1a] rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                view === 'list'
                  ? 'bg-[#D4AF37] text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                view === 'calendar'
                  ? 'bg-[#D4AF37] text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Calendar
            </button>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'scheduled', 'completed', 'cancelled', 'no_show'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition ${
              statusFilter === status
                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                : 'text-gray-400 border-[#2a2a2a] hover:border-[#3a3a3a]'
            }`}
          >
            {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
          </button>
        ))}
      </div>
      
      {/* Content */}
      {view === 'list' ? (
        <BookingsTable bookings={filteredBookings} />
      ) : (
        <BookingsCalendar bookings={filteredBookings} />
      )}
    </div>
  );
}
```

## 6.3 Create the Table Component

**File:** `components/admin/bookings/BookingsTable.tsx`

```typescript
// components/admin/bookings/BookingsTable.tsx

'use client';

import { useState } from 'react';
import { format, formatDistanceToNow, isPast } from 'date-fns';

interface Booking {
  id: string;
  invitee_name: string;
  invitee_email: string;
  invitee_phone: string | null;
  preparation_notes: string | null;
  start_time: string;
  end_time: string;
  zoom_link: string | null;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  admin_notes: string | null;
}

interface Props {
  bookings: Booking[];
}

export default function BookingsTable({ bookings }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const getStatusBadge = (status: string, startTime: string) => {
    const isUpcoming = !isPast(new Date(startTime));
    
    const styles: Record<string, string> = {
      scheduled: isUpcoming 
        ? 'bg-green-500/10 text-green-400 border-green-500/20'
        : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
      no_show: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    };
    
    const labels: Record<string, string> = {
      scheduled: isUpcoming ? 'Upcoming' : 'Pending',
      completed: 'Completed',
      cancelled: 'Cancelled',
      no_show: 'No Show',
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };
  
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 bg-[#141414] rounded-lg border border-[#2a2a2a]">
        <p className="text-gray-400">No bookings found</p>
      </div>
    );
  }
  
  return (
    <div className="bg-[#141414] rounded-lg border border-[#2a2a2a] overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#2a2a2a]">
            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Invitee
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Date & Time
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <>
              <tr 
                key={booking.id}
                className="border-b border-[#1f1f1f] hover:bg-[#1a1a1a] transition cursor-pointer"
                onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="text-white font-medium">{booking.invitee_name}</p>
                    <p className="text-gray-400 text-sm">{booking.invitee_email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-white">
                      {format(new Date(booking.start_time), 'MMM d, yyyy')}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {format(new Date(booking.start_time), 'h:mm a')} · {' '}
                      {formatDistanceToNow(new Date(booking.start_time), { addSuffix: true })}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(booking.status, booking.start_time)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {booking.zoom_link && (
                      <a
                        href={booking.zoom_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D4AF37] hover:text-[#e5c35a] text-sm font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Join Zoom
                      </a>
                    )}
                    <button className="text-gray-400 hover:text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              
              {/* Expanded Details */}
              {expandedId === booking.id && (
                <tr className="bg-[#0f0f0f]">
                  <td colSpan={4} className="px-6 py-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                          Contact Details
                        </h4>
                        <p className="text-white text-sm">
                          <span className="text-gray-400">Email:</span> {booking.invitee_email}
                        </p>
                        {booking.invitee_phone && (
                          <p className="text-white text-sm">
                            <span className="text-gray-400">Phone:</span> {booking.invitee_phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                          Preparation Notes
                        </h4>
                        <p className="text-white text-sm">
                          {booking.preparation_notes || 'No notes provided'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Admin Notes */}
                    <div className="mt-4 pt-4 border-t border-[#2a2a2a]">
                      <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                        Admin Notes
                      </h4>
                      <textarea
                        defaultValue={booking.admin_notes || ''}
                        placeholder="Add notes about this call..."
                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm resize-none focus:outline-none focus:border-[#D4AF37]"
                        rows={2}
                      />
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="mt-4 flex gap-2">
                      <button className="px-4 py-2 text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition">
                        Mark Completed
                      </button>
                      <button className="px-4 py-2 text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition">
                        Mark No Show
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## 6.4 Create the Calendar Component

**File:** `components/admin/bookings/BookingsCalendar.tsx`

```typescript
// components/admin/bookings/BookingsCalendar.tsx

'use client';

import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';

interface Booking {
  id: string;
  invitee_name: string;
  start_time: string;
  status: string;
}

interface Props {
  bookings: Booking[];
}

export default function BookingsCalendar({ bookings }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Generate calendar days
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const days: Date[] = [];
  let day = calendarStart;
  while (day <= calendarEnd) {
    days.push(day);
    day = addDays(day, 1);
  }
  
  // Get bookings for a specific day
  const getBookingsForDay = (date: Date) => {
    return bookings.filter((booking) =>
      isSameDay(new Date(booking.start_time), date)
    );
  };
  
  return (
    <div className="bg-[#141414] rounded-lg border border-[#2a2a2a] overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a]">
        <h2 className="text-lg font-semibold text-white">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-3 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Day Headers */}
      <div className="grid grid-cols-7 border-b border-[#2a2a2a]">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
          <div
            key={dayName}
            className="px-2 py-3 text-center text-xs font-semibold text-gray-400 uppercase"
          >
            {dayName}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {days.map((date, index) => {
          const dayBookings = getBookingsForDay(date);
          const isCurrentMonth = isSameMonth(date, currentMonth);
          const isCurrentDay = isToday(date);
          
          return (
            <div
              key={index}
              className={`min-h-[100px] p-2 border-b border-r border-[#1f1f1f] ${
                !isCurrentMonth ? 'bg-[#0f0f0f]' : ''
              }`}
            >
              <div
                className={`text-sm mb-1 w-7 h-7 flex items-center justify-center rounded-full ${
                  isCurrentDay
                    ? 'bg-[#D4AF37] text-black font-semibold'
                    : isCurrentMonth
                    ? 'text-white'
                    : 'text-gray-600'
                }`}
              >
                {format(date, 'd')}
              </div>
              
              {/* Bookings for this day */}
              <div className="space-y-1">
                {dayBookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking.id}
                    className={`text-xs px-2 py-1 rounded truncate cursor-pointer ${
                      booking.status === 'cancelled'
                        ? 'bg-red-500/10 text-red-400'
                        : 'bg-[#D4AF37]/10 text-[#D4AF37]'
                    }`}
                    title={`${booking.invitee_name} - ${format(new Date(booking.start_time), 'h:mm a')}`}
                  >
                    {format(new Date(booking.start_time), 'h:mm a')} {booking.invitee_name.split(' ')[0]}
                  </div>
                ))}
                {dayBookings.length > 3 && (
                  <div className="text-xs text-gray-400 px-2">
                    +{dayBookings.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

## 6.5 Add to Sidebar Navigation

In your admin sidebar, add a link to the bookings page:

```typescript
// In your sidebar navigation
{
  name: 'Bookings',
  href: '/admin/bookings',
  icon: CalendarIcon, // From lucide-react or heroicons
}
```

✅ **Checkpoint:** Admin Panel bookings page complete!

---

# STEP 7: EMBED CALENDLY ON YOUR WEBSITE

## 7.1 Get Your Calendly Link

Your Calendly link is something like:
```
https://calendly.com/waynedawsonvip/vip-discovery-call
```

## 7.2 Create the Booking Page Component

**File:** `app/book/page.tsx`

```typescript
// app/book/page.tsx

import CalendlyEmbed from '@/components/CalendlyEmbed';

export default function BookPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <span className="text-[#D4AF37] text-sm font-semibold tracking-widest uppercase">
          Take The First Step
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-white mt-4 mb-6">
          Book Your VIP Discovery Call
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          A free 30-minute conversation to explore where you are, where you want to be, 
          and whether coaching is the right path for you. No pressure. No obligation.
        </p>
      </section>
      
      {/* Calendly Embed */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <CalendlyEmbed url="https://calendly.com/waynedawsonvip/vip-discovery-call" />
      </section>
      
      {/* What to Expect */}
      <section className="bg-[#141414] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif text-white text-center mb-10">
            What to Expect
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#D4AF37] font-semibold">1</span>
              </div>
              <h3 className="text-white font-medium mb-2">Share Your Story</h3>
              <p className="text-gray-400 text-sm">
                Tell me where you are and what's challenging you right now.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#D4AF37] font-semibold">2</span>
              </div>
              <h3 className="text-white font-medium mb-2">Explore Possibilities</h3>
              <p className="text-gray-400 text-sm">
                We'll discuss what transformation could look like for you.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#D4AF37] font-semibold">3</span>
              </div>
              <h3 className="text-white font-medium mb-2">Decide Together</h3>
              <p className="text-gray-400 text-sm">
                If coaching is right, we'll talk next steps. If not, no hard feelings.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
```

## 7.3 Create the Calendly Embed Component

**File:** `components/CalendlyEmbed.tsx`

```typescript
// components/CalendlyEmbed.tsx

'use client';

import { useEffect } from 'react';

interface Props {
  url: string;
}

export default function CalendlyEmbed({ url }: Props) {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <div
      className="calendly-inline-widget"
      data-url={`${url}?hide_gdpr_banner=1&background_color=141414&text_color=ffffff&primary_color=d4af37`}
      style={{
        minWidth: '320px',
        height: '700px',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    />
  );
}
```

**Calendly URL Parameters:**
- `hide_gdpr_banner=1` — Hides GDPR banner for cleaner look
- `background_color=141414` — Dark background to match your site
- `text_color=ffffff` — White text
- `primary_color=d4af37` — Gold accent color

✅ **Checkpoint:** Calendly embedded on your site!

---

# STEP 8: INSTALL DEPENDENCIES

Make sure you have these packages installed:

```bash
npm install date-fns
# or
yarn add date-fns
```

If not already installed:
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

---

# TROUBLESHOOTING

## Webhook Not Receiving Data

1. **Check your webhook URL is correct**
   - Must be `https://` (not `http://`)
   - Must be publicly accessible (deployed, not localhost)

2. **Check Calendly webhook status**
   - Use Calendly API to list your webhooks:
   ```bash
   curl --request GET \
     --url https://api.calendly.com/webhook_subscriptions \
     --header 'Authorization: Bearer YOUR_TOKEN'
   ```
   - Check if state is `active`

3. **Check server logs**
   - Vercel: Dashboard → Project → Deployments → Functions → Logs
   - Look for errors

## Booking Not Appearing in Supabase

1. **Check API endpoint logs** for errors
2. **Verify environment variables** are set correctly in deployment
3. **Check RLS policies** are correct
4. **Try inserting manually** via Supabase SQL Editor to test permissions

## Signature Verification Failing

1. **Make sure signing key is correct** in `.env.local`
2. **Redeploy** after adding the environment variable
3. **Check the key format** — should be a long string from Calendly

---

# SUMMARY CHECKLIST

- [ ] **Step 1:** Supabase table created (`calendar_bookings`)
- [ ] **Step 2:** Environment variables configured
- [ ] **Step 3:** API webhook endpoint created and deployed
- [ ] **Step 4:** Webhook registered in Calendly
- [ ] **Step 5:** Test booking works
- [ ] **Step 6:** Admin Panel bookings page created
- [ ] **Step 7:** Calendly embedded on `/book` page
- [ ] **Step 8:** Dependencies installed

---

*You're all set! Bookings will now flow from Calendly → Your API → Supabase → Admin Panel*
