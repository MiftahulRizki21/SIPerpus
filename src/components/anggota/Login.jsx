import React, { useState } from "react";
import { supabase } from "../../services/supaBase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      // ✅ Optionally ambil profile user
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      console.log("Logged in as:", data.user);
      console.log("Profile:", profile);
      navigate("/anggota/beranda"); // ganti sesuai route kamu
    }
  };

  return (
    <div className="login-page flex items-center justify-center h-screen bg-gray-100">
      <div className="login-container bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#379fa3]">SI<span className="text-black">Perpus</span></h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input
              type="email"
              className="w-full border px-4 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
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
            className="bg-[#379fa3] text-white py-2 w-full rounded hover:bg-[#2c868a]"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account? <a href="#" className="text-blue-500">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
