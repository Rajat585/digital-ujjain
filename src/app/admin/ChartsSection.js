"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

function groupByDate(bookings) {
  const counts = {};
  bookings.forEach((b) => {
    const date = new Date(b.createdAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
    counts[date] = (counts[date] || 0) + 1;
  });
  return Object.entries(counts).map(([date, count]) => ({ date, count }));
}

function groupByProperty(hotelBookings) {
  const counts = {};
  hotelBookings.forEach((b) => {
    counts[b.propertyName] = (counts[b.propertyName] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

export default function ChartsSection({ hotelBookings, sathiBookings }) {
  const allBookings = [...hotelBookings, ...sathiBookings];
  const bookingsOverTime = groupByDate(allBookings);
  const popularHotels = groupByProperty(hotelBookings);

  if (allBookings.length === 0) {
    return (
      <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-8 text-center">
        <p className="text-ujjain-cream/50">
          Abhi tak koi booking nahi hui — charts data aane ke baad dikhenge.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-5">
        <h3 className="text-ujjain-gold font-semibold mb-4">
          Bookings Over Time
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={bookingsOverTime}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="date" stroke="#D4AF37" fontSize={12} />
            <YAxis stroke="#D4AF37" fontSize={12} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                background: "#1a1a1a",
                border: "1px solid #D4AF37",
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#D4AF37"
              strokeWidth={2}
              name="Bookings"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-5">
        <h3 className="text-ujjain-gold font-semibold mb-4">Popular Hotels</h3>
        {popularHotels.length === 0 ? (
          <p className="text-ujjain-cream/50 text-sm py-16 text-center">
            Abhi tak koi hotel booking nahi hui.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={popularHotels}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis
                dataKey="name"
                stroke="#D4AF37"
                fontSize={10}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis stroke="#D4AF37" fontSize={12} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  background: "#1a1a1a",
                  border: "1px solid #D4AF37",
                }}
              />
              <Bar dataKey="count" fill="#D4AF37" name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
