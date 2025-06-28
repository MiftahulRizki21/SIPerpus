import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import bgPerpus from '../../assets/perpus1.jpeg';
import '../../assets/tailwind.css';
import { motion } from 'framer-motion';
import { supabase } from "../../services/supaBase";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
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

      // Ambil role dari tabel user_profiles
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
      console.log("Login berhasil sebagai:", role);

      // Arahkan sesuai peran
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
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${bgPerpus})` }}
    >
      <motion.div
        className="bg-white/50 backdrop-blur-md p-10 md:p-16 rounded-xl shadow-lg w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-center text-4xl font-bold mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="text-gray-800">SI</span>
          <span className="font-bold text-[#579DA5]">Perpus</span>
        </motion.h1>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <motion.form
          className="space-y-6"
          onSubmit={handleLogin}
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <motion.div variants={fadeInUp} transition={{ delay: 0.4, duration: 0.7 }}>
            <label className="block mb-1 text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5]"
            />
          </motion.div>

          <motion.div variants={fadeInUp} transition={{ delay: 0.5, duration: 0.7 }}>
            <label className="block mb-1 text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5]"
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full text-white py-3 rounded-md font-semibold transition duration-300"
            style={{ backgroundColor: '#579DA5' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </motion.button>
        </motion.form>

        <motion.p
          className="text-center mt-6 text-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Don’t have an account?{' '}
          <Link to="/register" className="hover:underline text-[#579DA5]">
            Register here
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
