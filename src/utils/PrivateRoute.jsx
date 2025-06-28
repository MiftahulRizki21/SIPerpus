import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { supabase } from "../services/supaBase";

export default function PrivateRoute({ allowedRole }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { data: profile, error } = await supabase
          .from("user_profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (profile && !error) {
          setRole(profile.role);
        }
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  // Jika role cocok, izinkan akses
  if (role === allowedRole) {
    return <Outlet />;
  }

  // Jika user tidak punya hak akses
  return <Navigate to="/" state={{ from: location }} replace />;
}
