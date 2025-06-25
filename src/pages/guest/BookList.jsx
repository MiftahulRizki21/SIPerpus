import React from 'react';
import { motion } from 'framer-motion';
import '../../assets/tailwind.css';
import bookImg from '../../assets/book1.jpeg';

const realTitles = [
  "To Kill a Mockingbird", "1984", "Pride and Prejudice", "The Great Gatsby", "Moby Dick",
  "War and Peace", "The Catcher in the Rye", "The Lord of the Rings", "The Hobbit", "Crime and Punishment",
  "Jane Eyre", "Wuthering Heights", "Brave New World", "Huckleberry Finn", "Anna Karenina",
  "The Brothers Karamazov", "One Hundred Years of Solitude", "Great Expectations", "Little Women", "Fahrenheit 451",
  "The Picture of Dorian Gray", "Dracula", "Frankenstein", "The Odyssey", "The Iliad",
  "Les Misérables", "The Count of Monte Cristo", "Don Quixote", "A Tale of Two Cities", "The Divine Comedy",
  "Alice in Wonderland", "Through the Looking-Glass", "The Metamorphosis", "Heart of Darkness", "The Stranger",
  "The Trial", "Siddhartha", "The Alchemist", "The Old Man and the Sea", "Of Mice and Men",
  "The Sun Also Rises", "Catch-22", "Slaughterhouse-Five", "Beloved", "The Color Purple",
  "Invisible Man", "Native Son", "Things Fall Apart", "The Kite Runner", "Life of Pi",
  "The Book Thief", "A Thousand Splendid Suns", "The Road", "The Giver", "The Hunger Games",
  "Harry Potter and the Sorcerer’s Stone", "Chamber of Secrets", "Prisoner of Azkaban", "Goblet of Fire", "Order of the Phoenix",
  "Half-Blood Prince", "Deathly Hallows", "Percy Jackson: The Lightning Thief", "The Maze Runner", "Divergent",
  "Insurgent", "Allegiant", "Twilight", "New Moon", "Eclipse",
  "Breaking Dawn", "The Fault in Our Stars", "Looking for Alaska", "Paper Towns", "An Abundance of Katherines",
  "The Perks of Being a Wallflower", "Thirteen Reasons Why", "Gone Girl", "The Girl on the Train", "Big Little Lies",
  "The Silent Patient", "Verity", "It Ends with Us", "Ugly Love", "Reminders of Him",
  "The Midnight Library", "The Seven Husbands of Evelyn Hugo", "Daisy Jones & The Six", "Malibu Rising", "Beach Read",
  "People We Meet on Vacation", "Book Lovers", "November 9", "The Love Hypothesis", "The Spanish Love Deception",
  "Twisted Love", "Twisted Games", "Twisted Hate", "Twisted Lies", "Before We Were Strangers"
];


// Buat dummy data
const dummyBooks = realTitles.map((title, i) => ({
  id: i + 1,
  title,
  desc: ['Free to borrow', 'No charge to read', 'Available for free', 'Access freely'][i % 4],
  img: bookImg
}));

// Animasi container untuk grid
const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05, // Delay antar anak (kartu)
    },
  },
};

// Animasi untuk tiap kartu
const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
    },
  },
};

const BookList = () => {
  return (
    <div className="bg-[#eef7f7] min-h-screen px-6 md:px-20 py-10">
      <motion.h1
        className="text-3xl font-bold text-center mb-8 text-gray-800"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        📚 View All Books in <span className="text-[#579DA5]">SIPerpus</span>
      </motion.h1>

      {/* Grid Buku dengan animasi container */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        {dummyBooks.map((book) => (
          <motion.div
            key={book.id}
            className="bg-white rounded-xl shadow hover:shadow-md transition duration-300 overflow-hidden"
            variants={cardVariant}
          >
            <img src={book.img} alt={book.title} className="w-full h-40 object-cover" />
            <div className="p-3">
              <p className="font-semibold text-sm text-gray-800 truncate">{book.title}</p>
              <p className="text-xs text-gray-500">{book.desc}</p>
              <button className="mt-2 w-full bg-red-500 text-white text-xs py-1 rounded hover:bg-red-600 transition">
                Borrow Now!
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BookList;
