import axios from 'axios'

const API_URL = "https://kkpzxbzmhbtnoqgrurnl.supabase.co/rest/v1/notes"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrcHp4YnptaGJ0bm9xZ3J1cm5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MzA1NzEsImV4cCI6MjA2NDUwNjU3MX0.V4J1W6XmmyZ_QiEjMQbK5SyNE8XkR4jkdFh7_-iexn4"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },
    async deleteNote(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    },
    async updateNote(id, data) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
        return response.data;
    }

}

const insertBook = async () => {
  const response = await fetch('https://krwqxkvndsbvydigcaxd.supabase.co/rest/v1/books', {
    method: 'POST',
    headers: {
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyd3F4a3ZuZHNidnlkaWdjYXhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzk4OTgsImV4cCI6MjA2NTY1NTg5OH0.vWBEjABWzfcG0alL6xb1S1r74GiHoPbOc0Y2_KXNm84',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyd3F4a3ZuZHNidnlkaWdjYXhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzk4OTgsImV4cCI6MjA2NTY1NTg5OH0.vWBEjABWzfcG0alL6xb1S1r74GiHoPbOc0Y2_KXNm84',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      title: 'Contoh Judul Buku',
      author: 'Nama Penulis',
      publisher: 'Penerbit Buku',
      year: 2024,
      isbn: '978-1234567890',
      description: 'Ini adalah deskripsi buku.',
      file_path: '/files/book.pdf',
      available_copies: 5,
      file_url: 'https://...supabase.storage.url...',
      uploaded_by: 'UUID_USER', 
      upload_status: 'pending'
    })
  });

  const data = await response.json();
  console.log(data);
};