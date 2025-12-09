"use client"
import Footer from '@/app/component/footer'
import Header from '@/app/component/header'
import React, { useState } from 'react'
const server = process.env.NEXT_PUBLIC_API_URL

function Highlight() {
      const [isLoading, setIsLoading] = useState(false)
      const [message, setMessage] = useState("")
      const [form, setForm] = useState({
        league: "",
        club_name: "",
        club_logo: null as File | null,
        club_goal: "",
        our_goal: "",
        date: "",
        time: "",
        venue:""
      });
    
     // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle club logo upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm({ ...form, club_logo: e.target.files[0] });
    }
  };
    // Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const formData = new FormData();

    // Append all form fields
    Object.entries(form).forEach(([key, value]) => {
      if (key === "club_logo" && value instanceof File) {
        formData.append("club_logo", value);
      } else {
        formData.append(key, value as string);
      }
    });

    const response = await fetch(`${server}/api/match`, {
      method: "POST",
      body: formData,
    });

    // Parse JSON safely
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.msg || "Failed to upload");
    }

    setMessage(data.msg || "Uploaded successfully");
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Server Error";
    setMessage(errorMessage);
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};
  return (
    <>
    <Header />
    <div className='h-12'/>
          <div className=" flex items-center justify-center bg-opacity-80">
            {/* Optional: Click outside to close */}
            
            {/* Modal Card */}
            <div className="relative bg-gray-900 rounded-2xl shadow-2xl border border-white/10 w-full max-w-lg mx-4 max-h-screen overflow-y-auto">
              {/* Close Button - Top Right */}
         

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <h2 className="text-2xl font-bold text-white text-center">
                  Add New Match
                </h2>

                {/* League */}
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    League
                  </label>
                  <input
                    type="text"
                    name="league"
                    value={form.league}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="e.g. Premier League"
                  />
                </div>
                {/* VENUE */}
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Venue
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={form.venue}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="e.g. Stadium Road, Off Ekenwan Raod, Benin City"
                  />
                </div>

                {/* Opponent Club */}
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Opponent Club
                  </label>
                  <input
                    type="text"
                    name="club_name"
                    value={form.club_name}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="e.g. Manchester United"
                  />
                </div>

                {/* Club Logo */}
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Opponent Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-yellow-500 file:text-black hover:file:bg-yellow-600 cursor-pointer"
                  />
                </div>

                {/* Goals */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Our Goals
                    </label>
                    <input
                      type="number"
                      name="our_goal"
                      value={form.our_goal}
                      onChange={handleChange}
                      className="mt-1 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Opponent Goals
                    </label>
                    <input
                      type="number"
                      name="club_goal"
                      value={form.club_goal}
                      onChange={handleChange}
                      className="mt-1 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      min="0"
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="mt-1 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className="mt-1 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                     <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition flex items-center justify-center"
                      >
                        {isLoading 
                          ? <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                          : "Add Match"
                        }
                      </button>
              </form>
               <div className="text-2xl text-center text-red-500">
                {message}
            </div>
            </div>
           
          </div>
    <Footer />
    </>
  )
}

export default Highlight
