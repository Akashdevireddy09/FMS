/**
 * data.js — Shared In-Memory Data Store
 * AeroNexus Flight Management System
 *
 * All modules import from this file.
 * No localStorage, no external dependencies.
 * Data resets on page refresh (in-memory only).
 */

/* ── Caesar Cipher (shift=3) ── */
const SHIFT = 3;

function caesarEncrypt(str) {
  return str.split('').map(c => {
    if (/[a-z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0) - 97 + SHIFT) % 26) + 97);
    if (/[A-Z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0) - 65 + SHIFT) % 26) + 65);
    return c;
  }).join('');
}

function caesarDecrypt(str) {
  return str.split('').map(c => {
    if (/[a-z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0) - 97 - SHIFT + 26) % 26) + 97);
    if (/[A-Z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0) - 65 - SHIFT + 26) % 26) + 65);
    return c;
  }).join('');
}

/* ── Date helper ── */
function daysFromNow(n) {
  return new Date(Date.now() + n * 86400000).toISOString().split('T')[0];
}

/* ════════════════════════════════════════════════
   SEED DATA
════════════════════════════════════════════════ */

const DB = {

  admins: [
    { id: 1001, name: 'Super Admin', password: caesarEncrypt('Admin@123') }
  ],

  carriers: [
    {
      carrierId: 1, carrierName: 'IndiGo Airlines',
      disc30: 5, disc60: 10, disc90: 15, bulkDiscount: 8,
      refund2: 10, refund10: 50, refund20: 80,
      silverDisc: 3, goldDisc: 6, platinumDisc: 10
    },
    {
      carrierId: 2, carrierName: 'Air India',
      disc30: 7, disc60: 12, disc90: 18, bulkDiscount: 10,
      refund2: 5, refund10: 40, refund20: 75,
      silverDisc: 4, goldDisc: 8, platinumDisc: 12
    },
    {
      carrierId: 3, carrierName: 'SpiceJet',
      disc30: 4, disc60: 9, disc90: 14, bulkDiscount: 6,
      refund2: 8, refund10: 45, refund20: 70,
      silverDisc: 2, goldDisc: 5, platinumDisc: 9
    }
  ],

  flights: [
    { flightId: 101, carrierId: 1, origin: 'Mumbai',    destination: 'Delhi',     airFare: 4500, seatEconomy: 60, seatBusiness: 20, seatExecutive: 10 },
    { flightId: 102, carrierId: 1, origin: 'Delhi',     destination: 'Bangalore', airFare: 5200, seatEconomy: 50, seatBusiness: 15, seatExecutive: 8  },
    { flightId: 103, carrierId: 2, origin: 'Mumbai',    destination: 'Chennai',   airFare: 3800, seatEconomy: 70, seatBusiness: 25, seatExecutive: 12 },
    { flightId: 104, carrierId: 3, origin: 'Hyderabad', destination: 'Kolkata',   airFare: 4100, seatEconomy: 55, seatBusiness: 18, seatExecutive: 7  },
    { flightId: 105, carrierId: 2, origin: 'Pune',      destination: 'Goa',       airFare: 2800, seatEconomy: 40, seatBusiness: 12, seatExecutive: 6  }
  ],

  schedules: [
    { scheduleId: 1001, flightId: 101, dateOfTravel: daysFromNow(3),  bookedEconomy: 12, bookedBusiness: 4, bookedExecutive: 1 },
    { scheduleId: 1002, flightId: 101, dateOfTravel: daysFromNow(10), bookedEconomy: 5,  bookedBusiness: 1, bookedExecutive: 0 },
    { scheduleId: 1003, flightId: 102, dateOfTravel: daysFromNow(5),  bookedEconomy: 20, bookedBusiness: 8, bookedExecutive: 3 },
    { scheduleId: 1004, flightId: 103, dateOfTravel: daysFromNow(7),  bookedEconomy: 30, bookedBusiness: 5, bookedExecutive: 2 },
    { scheduleId: 1005, flightId: 104, dateOfTravel: daysFromNow(14), bookedEconomy: 10, bookedBusiness: 2, bookedExecutive: 0 },
    { scheduleId: 1006, flightId: 105, dateOfTravel: daysFromNow(2),  bookedEconomy: 8,  bookedBusiness: 3, bookedExecutive: 1 },
    { scheduleId: 1007, flightId: 102, dateOfTravel: daysFromNow(20), bookedEconomy: 15, bookedBusiness: 5, bookedExecutive: 2 },
    { scheduleId: 1008, flightId: 103, dateOfTravel: daysFromNow(35), bookedEconomy: 0,  bookedBusiness: 0, bookedExecutive: 0 }
  ],

  users: [
    {
      userId: 2001, userName: 'Priya Sharma', password: caesarEncrypt('Priya@123'),
      role: 'Customer', customerCategory: 'Gold',
      phone: '9876543210', emailId: 'priya@example.com',
      address1: '12 MG Road', address2: '', city: 'Mumbai',
      state: 'Maharashtra', country: 'India', zipCode: '400001', dob: '1995-06-15'
    },
    {
      userId: 2002, userName: 'Rahul Verma', password: caesarEncrypt('Rahul@456'),
      role: 'Customer', customerCategory: 'Silver',
      phone: '9123456789', emailId: 'rahul@example.com',
      address1: '45 Park Street', address2: 'Apt 3B', city: 'Delhi',
      state: 'Delhi', country: 'India', zipCode: '110001', dob: '1992-11-22'
    }
  ],

  bookings: [
    { bookingId: 3001, flightId: 101, scheduleId: 1001, userId: 2001, noOfSeats: 2, seatCategory: 'Economy',  dateOfTravel: daysFromNow(3), bookingStatus: 'Booked', bookingAmount: 8100 },
    { bookingId: 3002, flightId: 103, scheduleId: 1004, userId: 2001, noOfSeats: 1, seatCategory: 'Business', dateOfTravel: daysFromNow(7), bookingStatus: 'Booked', bookingAmount: 4864 },
    { bookingId: 3003, flightId: 102, scheduleId: 1003, userId: 2002, noOfSeats: 1, seatCategory: 'Economy',  dateOfTravel: daysFromNow(5), bookingStatus: 'Booked', bookingAmount: 4888 }
  ],

  /* Auto-increment counters */
  nextUserId:     2003,
  nextCarrierId:  4,
  nextFlightId:   106,
  nextScheduleId: 1009,
  nextBookingId:  3004,

  /* Active session (set on login, cleared on logout) */
  session: null   // { userId, role, name, loginTime }
};
