import { formatDate, formatTime, money } from "./format";

export async function downloadInvoice(booking) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();

  doc.setFontSize(24);
  doc.text("StudioSpace", 20, 26);
  doc.setFontSize(12);
  doc.text("Booking Invoice", 20, 35);
  doc.line(20, 40, 190, 40);

  const rows = [
    ["Invoice no.", booking._id.slice(-8).toUpperCase()],
    ["Status", booking.status],
    ["Booked by", `${booking.userName} (${booking.userEmail})`],
    ["Studio", booking.studioTitle],
    ["Location", booking.location],
    ["Host", booking.ownerName],
    ["Date", formatDate(booking.date)],
    ["Time", `${formatTime(booking.startTime)} - ${formatTime(booking.endTime)}`],
    ["Hours", String(booking.hours)],
    ["Hourly rate", money(booking.hourlyRate)],
    ["Studio rent", money(booking.totalPrice)],
    ["Refundable deposit", money(booking.securityDeposit)],
  ];

  let y = 54;
  rows.forEach(([label, value]) => {
    doc.setFontSize(11);
    doc.text(label, 20, y);
    doc.text(String(value), 80, y);
    y += 10;
  });

  doc.line(20, y, 190, y);
  doc.setFontSize(14);
  doc.text("Total to pay", 20, y + 12);
  doc.text(money(booking.totalPrice + booking.securityDeposit), 80, y + 12);
  doc.setFontSize(10);
  doc.text("Thank you for booking with StudioSpace. The deposit is refundable after your session.", 20, y + 28);

  doc.save(`studiospace-invoice-${booking._id.slice(-6)}.pdf`);
}
