import React, { useEffect, useState } from 'react';
import perpusImage from '../../assets/perpus1.jpeg';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../services/supaBase';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

const headlineVariants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const EventGuest = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_by', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize);

      if (error) {
        console.error('Failed to fetch events:', error);
      } else {
        setEvents(data);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [page]);

  const headline = events[0];
  const otherEvents = events.slice(1);

  return (
    <div className="eventguest min-h-screen bg-[#f8fafc]">
      {/* Banner */}
      <div className="relative">
        <motion.img
          src={perpusImage}
          alt="Banner"
          className="w-full h-[480px] object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <motion.h1
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Event
        </motion.h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 lg:p-10">
        {/* Card Besar */}
        {headline && (
          <motion.div
            variants={headlineVariants}
            initial="hidden"
            whileHover={{ scale: 1.05 }}
            animate="show"
            onClick={() => navigate(`/anggota/event/${headline.id}`)}

            className="bg-white rounded-2xl shadow-xl overflow-hidden relative h-[500px] w-full"
          >
            <img
              src={headline.image_url || perpusImage}
              alt="Headline"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-white text-blue-700 font-bold px-3 py-1 text-xs rounded-full shadow">
              Headline
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <h2 className="text-white text-xl lg:text-2xl font-bold leading-snug">
                {headline.title}
              </h2>
            </div>
          </motion.div>
        )}

        {/* Kartu Kecil */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {otherEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/anggota/event/${event.id}`)}
              className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden h-[250px]"
            >
              <img
                src={event.image_url || perpusImage}
                alt={event.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">General</p>
                <p className="text-xs text-gray-500">
                  {new Date(event.start_time).toLocaleDateString('id-ID', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-[#579DA5] text-white rounded hover:bg-[#478c94]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventGuest;
