'use client';

import { useState } from 'react';
import { format, formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns';
import { 
  Calendar, 
  Clock, 
  Mail, 
  Phone, 
  Globe, 
  Video, 
  ChevronDown, 
  ChevronUp,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  UserX,
  ExternalLink,
  List,
  CalendarDays
} from 'lucide-react';

// Types
export interface Booking {
  id: string;
  invitee_name: string;
  invitee_email: string;
  invitee_phone: string | null;
  invitee_timezone: string | null;
  preparation_notes: string | null;
  start_time: string;
  end_time: string;
  zoom_link: string | null;
  event_name: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  admin_notes: string | null;
  created_at: string;
}

interface Props {
  initialBookings: Booking[];
}

export default function BookingsPage({ initialBookings }: Props) {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [view, setView] = useState<'list' | 'calendar'>('list');

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.invitee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.invitee_email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    upcoming: bookings.filter(b => (b.status === 'scheduled' || !b.status) && !isPast(new Date(b.start_time))).length,
    completed: bookings.filter(b => b.status === 'completed' || (b.status === 'scheduled' && isPast(new Date(b.start_time)))).length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    noShow: bookings.filter(b => b.status === 'no_show').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white flex items-center gap-3">
            <Calendar className="w-6 h-6 text-[#D4AF37]" />
            Bookings
          </h1>
          <p className="text-[#6B7280] text-sm mt-1">
            Manage your discovery calls and coaching sessions
          </p>
        </div>
        
        {/* View Toggle */}
        <div className="flex bg-[#141414] border border-[#2A2A2A] rounded-lg p-1">
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-md transition ${
              view === 'list' 
                ? 'bg-[#D4AF37] text-black' 
                : 'text-[#6B7280] hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`p-2 rounded-md transition ${
              view === 'calendar' 
                ? 'bg-[#D4AF37] text-black' 
                : 'text-[#6B7280] hover:text-white'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          icon={<Clock className="w-5 h-5" />}
          label="Upcoming"
          value={stats.upcoming}
          color="gold"
          active={statusFilter === 'scheduled'}
          onClick={() => setStatusFilter(statusFilter === 'scheduled' ? 'all' : 'scheduled')}
        />
        <StatCard 
          icon={<CheckCircle className="w-5 h-5" />}
          label="Completed"
          value={stats.completed}
          color="green"
          active={statusFilter === 'completed'}
          onClick={() => setStatusFilter(statusFilter === 'completed' ? 'all' : 'completed')}
        />
        <StatCard 
          icon={<XCircle className="w-5 h-5" />}
          label="Cancelled"
          value={stats.cancelled}
          color="red"
          active={statusFilter === 'cancelled'}
          onClick={() => setStatusFilter(statusFilter === 'cancelled' ? 'all' : 'cancelled')}
        />
        <StatCard 
          icon={<UserX className="w-5 h-5" />}
          label="No-Show"
          value={stats.noShow}
          color="gray"
          active={statusFilter === 'no_show'}
          onClick={() => setStatusFilter(statusFilter === 'no_show' ? 'all' : 'no_show')}
        />
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#141414] border border-[#2A2A2A] rounded-lg text-white text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#D4AF37] transition"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-[#141414] border border-[#2A2A2A] rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37] transition appearance-none cursor-pointer min-w-[140px]"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="no_show">No-Show</option>
          </select>
        </div>
      </div>

      {/* Bookings List */}
      {view === 'list' && (
        <div className="space-y-3">
          {filteredBookings.length === 0 ? (
            <EmptyState searchQuery={searchQuery} statusFilter={statusFilter} />
          ) : (
            filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isExpanded={expandedId === booking.id}
                onToggle={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
              />
            ))
          )}
        </div>
      )}

      {/* Calendar View */}
      {view === 'calendar' && (
        <CalendarView bookings={filteredBookings} />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAT CARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'gold' | 'green' | 'red' | 'gray';
  active?: boolean;
  onClick?: () => void;
}

function StatCard({ icon, label, value, color, active, onClick }: StatCardProps) {
  const colors = {
    gold: {
      bg: 'bg-[#D4AF37]/10',
      border: 'border-[#D4AF37]/20',
      activeBorder: 'border-[#D4AF37]',
      text: 'text-[#D4AF37]',
    },
    green: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      activeBorder: 'border-emerald-500',
      text: 'text-emerald-400',
    },
    red: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      activeBorder: 'border-red-500',
      text: 'text-red-400',
    },
    gray: {
      bg: 'bg-gray-500/10',
      border: 'border-gray-500/20',
      activeBorder: 'border-gray-500',
      text: 'text-gray-400',
    },
  };

  const c = colors[color];

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border transition-all text-left w-full ${c.bg} ${
        active ? c.activeBorder : c.border
      } hover:${c.activeBorder}`}
    >
      <div className={`${c.text} mb-2`}>{icon}</div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="text-sm text-[#6B7280]">{label}</div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BOOKING CARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface BookingCardProps {
  booking: Booking;
  isExpanded: boolean;
  onToggle: () => void;
}

function BookingCard({ booking, isExpanded, onToggle }: BookingCardProps) {
  const startDate = new Date(booking.start_time);
  const isPastBooking = isPast(startDate);
  
  // Normalize status if it's missing or if it should be calculated based on time
  let currentStatus = booking.status;
  if (!currentStatus) {
    currentStatus = isPastBooking ? 'completed' : 'scheduled';
  } else if (currentStatus === 'scheduled' && isPastBooking) {
    // If it's scheduled but in the past, treat as completed for display (unless logic says otherwise)
    // But let's stick to the database status if possible, or visually indicate "Pending completion"
    // For now, let's just use what's in the DB, but maybe handle the label
  }

  const isUpcoming = !isPastBooking && currentStatus === 'scheduled';
  const isTodayCall = isToday(startDate);
  const isTomorrowCall = isTomorrow(startDate);

  // Status config
  const statusConfig = {
    scheduled: {
      label: isUpcoming ? (isTodayCall ? 'Today' : isTomorrowCall ? 'Tomorrow' : 'Upcoming') : 'Pending',
      color: isUpcoming ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      dot: isUpcoming ? 'bg-[#D4AF37]' : 'bg-yellow-400',
    },
    completed: {
      label: 'Completed',
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      dot: 'bg-emerald-400',
    },
    cancelled: {
      label: 'Cancelled',
      color: 'bg-red-500/10 text-red-400 border-red-500/20',
      dot: 'bg-red-400',
    },
    no_show: {
      label: 'No-Show',
      color: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
      dot: 'bg-gray-400',
    },
  };

  const status = statusConfig[currentStatus] || statusConfig['scheduled'];

  return (
    <div className={`bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden transition-all ${
      isExpanded ? 'ring-1 ring-[#D4AF37]/30' : 'hover:border-[#3A3A3A]'
    }`}>
      {/* Main Row */}
      <div 
        className="p-4 sm:p-5 flex items-center gap-4 cursor-pointer"
        onClick={onToggle}
      >
        {/* Date Block */}
        <div className="hidden sm:flex flex-col items-center justify-center w-14 h-14 bg-[#0A0A0A] rounded-lg border border-[#2A2A2A] flex-shrink-0">
          <span className="text-[10px] font-semibold text-[#D4AF37] uppercase">
            {format(startDate, 'EEE')}
          </span>
          <span className="text-xl font-bold text-white leading-none">
            {format(startDate, 'd')}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white truncate">
              {booking.invitee_name}
            </h3>
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full border ${status.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </div>
          <p className="text-sm text-[#9CA3AF] truncate">
            {booking.invitee_email}
          </p>
          <p className="text-sm text-[#6B7280] mt-1 flex items-center gap-2">
            <span>{booking.event_name}</span>
            <span>·</span>
            <span>{format(startDate, 'h:mm a')}</span>
            {booking.invitee_timezone && (
              <>
                <span>·</span>
                <span className="hidden sm:inline">{booking.invitee_timezone}</span>
              </>
            )}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {booking.zoom_link && isUpcoming && (
            <a
              href={booking.zoom_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37] text-black text-xs font-semibold rounded-lg hover:bg-[#e5c35a] transition"
            >
              <Video className="w-3.5 h-3.5" />
              Join
            </a>
          )}
          <button className="p-2 text-[#6B7280] hover:text-white transition">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 sm:px-5 pb-5 pt-0 border-t border-[#2A2A2A]">
          <div className="pt-5 grid sm:grid-cols-2 gap-6">
            {/* Contact Details */}
            <div>
              <h4 className="text-[11px] font-semibold tracking-wider uppercase text-[#6B7280] mb-3">
                Contact Details
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  <a href={`mailto:${booking.invitee_email}`} className="text-[#D1D5DB] hover:text-[#D4AF37] transition">
                    {booking.invitee_email}
                  </a>
                </div>
                {booking.invitee_phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    <a href={`tel:${booking.invitee_phone}`} className="text-[#D1D5DB] hover:text-[#D4AF37] transition">
                      {booking.invitee_phone}
                    </a>
                  </div>
                )}
                {booking.invitee_timezone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-[#D1D5DB]">{booking.invitee_timezone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Preparation Notes */}
            <div>
              <h4 className="text-[11px] font-semibold tracking-wider uppercase text-[#6B7280] mb-3">
                Preparation Notes
              </h4>
              <p className="text-sm text-[#D1D5DB] leading-relaxed">
                {booking.preparation_notes || (
                  <span className="text-[#6B7280] italic">No notes provided</span>
                )}
              </p>
            </div>
          </div>

          {/* Admin Notes */}
          <div className="mt-6">
            <h4 className="text-[11px] font-semibold tracking-wider uppercase text-[#6B7280] mb-3">
              Admin Notes
            </h4>
            <textarea
              defaultValue={booking.admin_notes || ''}
              placeholder="Add private notes about this call..."
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#6B7280] resize-none focus:outline-none focus:border-[#D4AF37] transition"
              rows={2}
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-2">
            {booking.zoom_link && (
              <a
                href={booking.zoom_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black text-sm font-semibold rounded-lg hover:bg-[#e5c35a] transition"
              >
                <Video className="w-4 h-4" />
                Join Zoom
              </a>
            )}
            {booking.status === 'scheduled' && (
              <>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-lg border border-emerald-500/20 hover:bg-emerald-500/20 transition">
                  <CheckCircle className="w-4 h-4" />
                  Mark Complete
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500/10 text-gray-400 text-sm font-medium rounded-lg border border-gray-500/20 hover:bg-gray-500/20 transition">
                  <UserX className="w-4 h-4" />
                  No-Show
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 text-sm font-medium rounded-lg border border-red-500/20 hover:bg-red-500/20 transition">
                  <XCircle className="w-4 h-4" />
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EMPTY STATE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface EmptyStateProps {
  searchQuery: string;
  statusFilter: string;
}

function EmptyState({ searchQuery, statusFilter }: EmptyStateProps) {
  const hasFilters = searchQuery || statusFilter !== 'all';

  return (
    <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl py-16 px-6 text-center">
      <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Calendar className="w-8 h-8 text-[#D4AF37]" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        {hasFilters ? 'No bookings found' : 'No bookings yet'}
      </h3>
      <p className="text-[#6B7280] text-sm max-w-sm mx-auto">
        {hasFilters
          ? 'Try adjusting your search or filter to find what you\'re looking for.'
          : 'When someone books a discovery call, it will appear here.'}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CALENDAR VIEW COMPONENT (Simplified)
// ─────────────────────────────────────────────────────────────────────────────

function CalendarView({ bookings }: { bookings: Booking[] }) {
  // Calendar implementation placeholder
  
  return (
    <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6 text-center">
      <p className="text-[#6B7280]">Calendar view component here</p>
      <p className="text-sm text-[#6B7280] mt-2">
        (Use the full BookingsCalendar component from the Calendly Integration Guide)
      </p>
    </div>
  );
}
