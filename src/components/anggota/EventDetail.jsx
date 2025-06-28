import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supaBase';

const EventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [animatedContent, setAnimatedContent] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
      if (error) {
        console.error('Error fetching event:', error);
      } else {
        setEvent(data);
      }
    };
    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (!event?.description) return;
    let currentIndex = 0;
    const timer = setInterval(() => {
      setAnimatedContent((prev) => prev + event.description[currentIndex]);
      currentIndex++;
      if (currentIndex >= event.description.length) clearInterval(timer);
    }, 30);

    setTimeout(() => setShowImage(true), 300);
    setTimeout(() => setShowTitle(true), 600);

    return () => clearInterval(timer);
  }, [event]);

  if (!event) {
    return <div className="text-center p-10 text-gray-600">Memuat detail event...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6 lg:px-32">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 bg-white px-4 py-2 rounded-full shadow hover:bg-blue-50 transition duration-300 mb-8"
      >
        <span className="text-lg">←</span>
        Kembali ke Halaman Event
      </button>

      <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
        <img
          src={event.image_url || '/fallback-image.jpg'}
          alt="detail"
          className={`
            w-full h-[600px] object-cover
            transform transition-all duration-1000
            ${showImage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
        />
        <div className="p-10 lg:p-14">
          <p className="text-sm text-gray-500 mb-4">
            {event.location || 'Tanpa Lokasi'} • {new Date(event.start_time).toLocaleDateString('id-ID')}
          </p>
          <h1
            className={`
              text-4xl font-bold text-gray-800 mb-6 leading-tight
              transform transition-all duration-1000
              ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            {event.title}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {animatedContent}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
