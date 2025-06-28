import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supaBase";
import bgPerpus from "../../assets/perpus1.jpeg";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Password dan konfirmasi tidak sama.");
      return;
    }

    const fullName = `${form.firstName} ${form.lastName}`;

    // ✅ Simpan displayName ke metadata saat signUp
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          display_name: form.displayName,
          full_name: fullName,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // ✅ Insert ke user_profiles TANPA display_name
    const { error: profileError } = await supabase.from("user_profiles").insert([
      {
        id: data.user.id,
        full_name: fullName,
        role: "anggota",
        gender: null,
        birthdate: null,
        address: null,
        phone_number: null,
      },
    ]);

    if (profileError) {
      setError(profileError.message);
      return;
    }

    navigate("/login");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${bgPerpus})` }}
    >
      <motion.div
        className="bg-white/50 backdrop-blur-md p-10 md:p-20 rounded-xl shadow-lg w-full max-w-4xl"
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
          <span className="font-bold" style={{ color: "#579DA5" }}>Perpus</span>
        </motion.h1>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <motion.form
          className="space-y-6"
          onSubmit={handleRegister}
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <motion.div
            className="flex flex-col md:flex-row gap-6"
            variants={fadeInUp}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div className="w-full">
              <label className="block mb-1 text-gray-700 font-semibold">First name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5]"
              />
            </div>
            <div className="w-full">
              <label className="block mb-1 text-gray-700 font-semibold">Last name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5]"
              />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} transition={{ delay: 0.45, duration: 0.7 }}>
            <label className="block mb-1 text-gray-700 font-semibold">Display Name</label>
            <input
              type="text"
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5]"
            />
          </motion.div>

          <motion.div variants={fadeInUp} transition={{ delay: 0.5, duration: 0.7 }}>
            <label className="block mb-1 text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5]"
            />
          </motion.div>

          <motion.div variants={fadeInUp} transition={{ delay: 0.6, duration: 0.7 }}>
            <label className="block mb-1 text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5]"
            />
          </motion.div>

          <motion.div variants={fadeInUp} transition={{ delay: 0.7, duration: 0.7 }}>
            <label className="block mb-1 text-gray-700 font-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5]"
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full text-white py-3 rounded-md font-semibold transition duration-300"
            style={{ backgroundColor: "#579DA5" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Register
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Register;
