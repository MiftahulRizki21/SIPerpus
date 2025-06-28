import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supaBase";

const ReadBook = () => {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookAndTrack = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;
      if (!userId) return;

      // Ambil file_path dari buku
      const { data: bookData, error: bookError } = await supabase
        .from("books")
        .select("file_path")
        .eq("id", id)
        .single();

      if (bookError || !bookData) {
        console.error("Gagal mengambil buku:", bookError);
        return;
      }

      // Ambil URL PDF dari storage
      const { data: publicUrl } = supabase
        .storage
        .from("buku")
        .getPublicUrl(bookData.file_path);

      setPdfUrl(publicUrl?.publicUrl + "#toolbar=0&navpanes=0&scrollbar=0");
      setLoading(false);

      // Cek apakah user sudah pernah membaca buku ini
      const { data: historyData, error: checkError } = await supabase
        .from("reading_history")
        .select("id")
        .eq("user_id", userId)
        .eq("book_id", parseInt(id))
        .maybeSingle();

      if (checkError) {
        console.error("Gagal memeriksa riwayat:", checkError);
        return;
      }

      // Insert jika belum ada
      if (!historyData) {
        const { error: insertError } = await supabase
          .from("reading_history")
          .insert([{ user_id: userId, book_id: parseInt(id) }]);

        if (insertError) {
          console.error("Gagal mencatat riwayat baca:", insertError);
        }
      }
    };

    fetchBookAndTrack();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Memuat buku...</p>;

  return (
    <div className="h-screen">
      <iframe
        src={pdfUrl}
        title="Baca Buku"
        className="w-full h-full"
        frameBorder="0"
      />
    </div>
  );
};

export default ReadBook;
