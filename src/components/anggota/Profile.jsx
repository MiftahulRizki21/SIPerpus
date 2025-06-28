import React, { useEffect, useState } from "react";
import '../../assets/tailwind.css';
import bgPerpus from '../../assets/perpus1.jpeg';
import { supabase } from "../../services/supaBase";

const Profile = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    role: "",
    last_login: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        console.error("Session error:", sessionError);
        setLoading(false);
        return;
      }

      const { user } = session;
      const userId = user.id;

      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .select("full_name, role")
        .eq("id", userId)
        .single();

      if (profileError) {
        console.error("Profile error:", profileError);
      }

      setForm({
        full_name: profileData?.full_name || "",
        email: user.email || "",
        role: profileData?.role || "",
        last_login: user.last_sign_in_at
          ? new Date(user.last_sign_in_at).toLocaleString()
          : "-",
      });

      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const userId = session?.user?.id;
      if (!userId) throw new Error("User tidak ditemukan.");

      // Update full_name ke tabel user_profiles
      const { error: updateProfileError } = await supabase
        .from("user_profiles")
        .update({ full_name: form.full_name })
        .eq("id", userId);

      if (updateProfileError) throw updateProfileError;

      // Update email di Auth Supabase
      const { error: updateAuthError } = await supabase.auth.updateUser({
        email: form.email,
      });

      if (updateAuthError) throw updateAuthError;

      setMessage("✅ Profil berhasil diperbarui.");
    } catch (err) {
      console.error("Save error:", err);
      setMessage("❌ Gagal menyimpan perubahan.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${bgPerpus})` }}
    >
      <div className="bg-white/50 backdrop-blur-md p-12 md:p-20 rounded-xl shadow-lg w-full max-w-4xl">
        <h2 className="text-center text-4xl font-bold mb-8 text-gray-800">
          Informasi <span style={{ color: '#579DA5' }}>Profile</span>
        </h2>

        {loading ? (
          <p className="text-center text-gray-700">Memuat data profil...</p>
        ) : (
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Row 1: Nama dan Email */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full">
                <label className="block mb-1 text-gray-700 font-semibold">Nama</label>
                <input
                  name="full_name"
                  type="text"
                  className="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/70 focus:outline-none"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full">
                <label className="block mb-1 text-gray-700 font-semibold">Email</label>
                <input
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/70 focus:outline-none"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Jenis Anggota */}
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">Jenis Anggota</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/70 focus:outline-none"
                value={form.role}
                readOnly
              />
            </div>

            {/* Login Terakhir */}
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">Login Terakhir</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/70 focus:outline-none"
                value={form.last_login}
                readOnly
              />
            </div>

            {/* Tombol Simpan */}
            <button
              type="submit"
              onClick={handleSave}
              disabled={saving}
              className="w-full text-white py-3 rounded-md font-semibold transition duration-300"
              style={{ backgroundColor: '#579DA5' }}
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>

            {/* Pesan Notifikasi */}
            {message && (
              <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
