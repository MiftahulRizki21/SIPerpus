import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supaBase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Optional: lihat session saat halaman dimuat
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log("Current session:", data);
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data: loginData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        setError(loginError.message);
        setLoading(false);
        return;
      }

      const userId = loginData?.user?.id;
      if (!userId) {
        setError("Gagal mendapatkan ID pengguna.");
        setLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (profileError || !profile) {
        setError("Gagal mengambil role pengguna.");
        setLoading(false);
        return;
      }

      const role = profile.role;
      console.log("Login sukses, role:", role);

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "anggota") {
        navigate("/anggota/beranda");
      } else {
        setError("Role tidak dikenali.");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat login.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page flex items-center justify-center h-screen bg-gray-100">
      <div className="login-container bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#379fa3]">
          SI<span className="text-black">Perpus</span>
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              className="w-full border px-4 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              className="w-full border px-4 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#379fa3] text-white py-2 w-full rounded hover:bg-[#2c868a] transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
