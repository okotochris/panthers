"use client";

import { useState } from "react";
import { Upload, Plus } from "lucide-react";
import Header from "@/app/component/header";
import Footer from "@/app/component/footer";
const server = process.env.NEXT_PUBLIC_API_URL

interface PlayerForm {
  name: string;
  nationality: string;
  dob: string;
  position: string;
  about: string;
  images: File[];
  card: { yellow: number; red: number };
}

export default function AddPlayerForm() {
  const [isLoading, setIsLoading]= useState(false)
  const [message, setMessage] = useState("")
  const [form, setForm] = useState<PlayerForm>({
    name: "",
    nationality: "",
    dob: "",
    position: "",
    about: "",
    images: [] as File[],
    card: { yellow: 0, red: 0 },
  });

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: value }));
};

  // Handle raw image upload
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;
  const files = Array.from(e.target.files);
  setForm(prev => ({ ...prev, images: [...prev.images, ...files] }));
};



const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const formData = new FormData();

    // Loop through form keys
    Object.entries(form).forEach(([key, value]) => {
      if (key === "images") {
        // Append each file in images array
        (value as File[]).forEach((file) => {
          formData.append("images", file);
        });
      } else if (key === "card") {
        // Convert card object to JSON string
        formData.append(key, JSON.stringify(value));
      } else {
        // Append other fields
        formData.append(key, value as string);
      }
    });

    const result = await fetch(`${server}/api/players`, {
      method: "POST",
      body: formData,
    });
    const data = await result.json();
    if (!result.ok) {
        setMessage(data.error || data.msg || "Something went wrong");
        return;
      }
      setMessage("Uploaded successfully")

  } catch (err) {
    setMessage("Server Error");
    console.error(err);
  } finally {
    setIsLoading(false);
    setForm({
    name: "",
    nationality: "",
    dob: "",
    position: "",
    about: "",
    images: [] as File[],
    card: { yellow: 0, red: 0 },
    })
  }
};



  return (
    <>
    <Header/>
    <div className="h-5"></div>
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 max-w-2xl mx-auto space-y-6 mt-8"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Add New Player
      </h2>

      {/* Name */}
      <div className="space-y-1">
        <label className="font-semibold text-sm text-gray-500">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 bg-black/20 border border-white/20 rounded-xl focus:ring-2 ring-amber-500 outline-none"
          required
        />
      </div>

      {/* Nationality */}
      <div className="space-y-1">
        <label className="font-semibold text-sm text-gray-500">Nationality</label>
        <input
          type="text"
          name="nationality"
          value={form.nationality}
          onChange={handleChange}
          className="w-full p-3 bg-black/20 border border-white/20 rounded-xl focus:ring-2 ring-amber-500 outline-none"
        />
      </div>

      {/* DOB */}
      <div className="space-y-1">
        <label className="font-semibold text-sm text-gray-500">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="w-full p-3 bg-black/20 border border-white/20 rounded-xl focus:ring-2 ring-amber-500 outline-none"
        />
      </div>

      {/* Position */}
      <div className="space-y-1">
        <label className="font-semibold text-sm text-gray-500">Position</label>
        <input
          type="text"
          name="position"
          value={form.position}
          onChange={handleChange}
          className="w-full p-3 bg-black/20 border border-white/20 rounded-xl focus:ring-2 ring-amber-500 outline-none"
        />
      </div>

      {/* About */}
      <div className="space-y-1">
        <label className="font-semibold text-sm text-gray-200">About</label>
        <textarea
          name="about"
          rows={4}
          value={form.about}
          onChange={handleChange}
          className="w-full p-3 bg-black/20 border border-white/20 rounded-xl focus:ring-2 ring-amber-500 outline-none"
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <label className="font-semibold text-sm text-gray-200">Player Images</label>

        <label className="w-full p-6 border-2 border-dashed border-gray-500 rounded-xl flex flex-col items-center gap-3 cursor-pointer hover:bg-white/10 transition">
          <Upload className="w-10 h-10 text-amber-400" />
          <span className="text-gray-300 text-sm">Click to upload player images</span>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {/* Preview thumbnails */}
        {form.images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-3">
            {form.images.map((file, i) => (
              <div key={i} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full h-24 object-cover rounded-xl border border-white/20"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-semibold text-sm text-gray-200">Yellow Cards</label>
          <input
            type="number"
            value={form.card.yellow}
            onChange={(e) =>
              setForm({ ...form, card: { ...form.card, yellow: Number(e.target.value) } })
            }
            className="w-full p-3 bg-black/20 border border-white/20 rounded-xl focus:ring-2 ring-amber-500 outline-none"
          />
        </div>

        <div>
          <label className="font-semibold text-sm text-gray-200">Red Cards</label>
          <input
            type="number"
            value={form.card.red}
            onChange={(e) =>
              setForm({ ...form, card: { ...form.card, red: Number(e.target.value) } })
            }
            className="w-full p-3 bg-black/20 border border-white/20 rounded-xl focus:ring-2 ring-amber-500 outline-none"
          />
        </div>
      </div>

      {/* Submit */}
     <button
      type="submit"
      disabled={isLoading}
      className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition flex items-center justify-center"
    >
      {isLoading 
        ? <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        : "Add Player"
      }
    </button>
      <div className="text-2xl text-center text-red-500">
          {message}
      </div>
    </form>
    <Footer />
    </>
  );
}
