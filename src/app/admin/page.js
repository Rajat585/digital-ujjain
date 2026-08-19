"use client";
import { useState, useEffect } from "react";
import ChartsSection from "./ChartsSection";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-5 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold text-ujjain-gold">{value}</div>
      <div className="text-ujjain-cream/60 text-xs mt-1">{label}</div>
    </div>
  );
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("du_admin_key");
    if (saved) {
      setAdminKey(saved);
      fetchAll(saved);
    }
  }, []);

  async function fetchAll(key) {
    setLoading(true);
    setError("");
    try {
      const headers = { "x-admin-key": key };
      const [hotelRes, sathiRes, feedbackRes, appsRes, reportsRes] =
        await Promise.all([
          fetch(`${API_BASE_URL}/api/admin/hotel-bookings`, { headers }),
          fetch(`${API_BASE_URL}/api/admin/sathi-bookings`, { headers }),
          fetch(`${API_BASE_URL}/api/admin/feedback`, { headers }),
          fetch(`${API_BASE_URL}/api/admin/sathi-applications`, { headers }),
          fetch(`${API_BASE_URL}/api/admin/reports`, { headers }),
        ]);

      if (hotelRes.status === 401) {
        setError("Galat admin key. Please check karo.");
        setAuthed(false);
        setLoading(false);
        return;
      }

      const hotelBookings = await hotelRes.json();
      const sathiBookings = await sathiRes.json();
      const feedback = await feedbackRes.json();
      const applications = await appsRes.json();
      const reports = await reportsRes.json();

      setData({
        hotelBookings,
        sathiBookings,
        feedback,
        applications,
        reports,
      });
      setAuthed(true);
      sessionStorage.setItem("du_admin_key", key);
    } catch (err) {
      setError(
        "Server se connect nahi ho paaya. Backend chal raha hai check karo.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    fetchAll(adminKey);
  }

  function handleLogout() {
    sessionStorage.removeItem("du_admin_key");
    setAuthed(false);
    setAdminKey("");
    setData(null);
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ujjain-dark px-4">
        <form
          onSubmit={handleLogin}
          className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-8 w-full max-w-sm"
        >
          <h1 className="text-2xl font-bold text-ujjain-gold mb-6 text-center">
            Admin Login
          </h1>
          <input
            type="password"
            placeholder="Admin Key"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            className="w-full bg-black/30 border border-ujjain-gold/30 rounded-lg px-4 py-3 text-ujjain-cream mb-4 outline-none focus:border-ujjain-gold"
            required
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ujjain-gold text-ujjain-dark font-semibold py-3 rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <AdminDashboard
      data={data}
      onLogout={handleLogout}
      onRefresh={() => fetchAll(adminKey)}
      loading={loading}
    />
  );
}

function AdminDashboard({ data, onLogout, onRefresh, loading }) {
  const { hotelBookings, sathiBookings, feedback, applications, reports } =
    data;

  const totalRevenue =
    hotelBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0) +
    sathiBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  return (
    <div className="min-h-screen bg-ujjain-dark px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-ujjain-gold">
            Admin Dashboard
          </h1>
          <div className="flex gap-3">
            <button
              onClick={onRefresh}
              disabled={loading}
              className="text-ujjain-cream/70 hover:text-ujjain-gold text-sm border border-ujjain-gold/30 px-4 py-2 rounded-lg"
            >
              {loading ? "Refreshing..." : "🔄 Refresh"}
            </button>
            <button
              onClick={onLogout}
              className="text-ujjain-cream/70 hover:text-red-400 text-sm border border-ujjain-gold/30 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <StatCard
            icon="🏨"
            label="Hotel Bookings"
            value={hotelBookings.length}
          />
          <StatCard
            icon="🧭"
            label="Sathi Bookings"
            value={sathiBookings.length}
          />
          <StatCard
            icon="💰"
            label="Total Revenue"
            value={`₹${totalRevenue.toLocaleString("en-IN")}`}
          />
          <StatCard icon="💬" label="Feedback" value={feedback.length} />
          <StatCard icon="🚨" label="Reports" value={reports.length} />
        </div>

        <ChartsSection
          hotelBookings={hotelBookings}
          sathiBookings={sathiBookings}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <RecentList
            title="Recent Hotel Bookings"
            items={hotelBookings
              .slice(-5)
              .reverse()
              .map((b) => `${b.propertyName} — ${b.guestName}`)}
          />
          <RecentList
            title="Recent Sathi Applications"
            items={applications
              .slice(-5)
              .reverse()
              .map((a) => `${a.name} — ${a.phone}`)}
          />
        </div>
      </div>
    </div>
  );
}

function RecentList({ title, items }) {
  return (
    <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-5">
      <h3 className="text-ujjain-gold font-semibold mb-3">{title}</h3>
      {items.length === 0 ? (
        <p className="text-ujjain-cream/50 text-sm">Koi data nahi hai abhi.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="text-ujjain-cream/80 text-sm border-b border-white/5 pb-2"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
