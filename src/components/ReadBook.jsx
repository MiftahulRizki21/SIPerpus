import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supaBase";

const ReadBook = () => {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("file_path")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Gagal mengambil buku:", error);
        return;
      }

      const { data: publicUrl } = supabase.storage.from("buku").getPublicUrl(data.file_path);
      setPdfUrl(publicUrl?.publicUrl + "#toolbar=0&navpanes=0&scrollbar=0"); // toolbar hidden
      setLoading(false);
    };

    fetchBook();
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
