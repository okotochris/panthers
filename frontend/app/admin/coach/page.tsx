"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import Header from "@/app/component/header";
import Footer from "@/app/component/footer";

const server = process.env.NEXT_PUBLIC_API_URL;

export default function AddPlayerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    position: "",
    image: null as File | null, // Single file only
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle single image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, image: file });
    }
  };

  // Optional: Allow removing the selected image
  const removeImage = () => {
    setForm({ ...form, image: null });
    // Reset the input value so user can re-select the same file
    const input = document.getElementById("image-upload") as HTMLInputElement;
    if (input) input.value = "";
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("position", form.position || "");

    if (form.image) {
      formData.append("image", form.image); // single image
    }

    try {
      const result = await fetch(`${server}/api/coach`, {
        method: "POST",
        body: formData,
      });

      const data = await result.json();

      if (!result.ok) {
        setMessage(data.msg || "Failed to upload. Try again.");
      } else {
        setMessage(data.msg || "Coach added successfully!");
        // Optional: reset form on success
        setForm({ name: "", position: "", image: null });
        removeImage();
      }
    } catch (err) {
      setMessage("Server error. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="h-5"></div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 max-w-2xl mx-auto space-y-6 mt-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Add Coach
        </h2>

        {/* Name */}
        <div className="space-y-1">
          <label className="font-semibold text-sm text-gray-500">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 bg-black/20 border border-white/20 rounded-xl focus:ring-2 ring-amber-500 outline-none text-white"
            required
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
            className="w-full p-3 bg-black/20 border border-white/20 rounded-xl focus:ring-2 ring-amber-500 outline-none text-white"
            placeholder="e.g. Head Coach, Assistant Coach"
          />
        </div>

        {/* Single Image Upload */}
        <div className="space-y-3">
          <label className="font-semibold text-sm text-gray-200">Coach Image</label>

          {!form.image ? (
            <label className="w-full p-8 border-2 border-dashed border-gray-500 rounded-xl flex flex-col items-center gap-3 cursor-pointer hover:bg-white/10 transition">
              <Upload className="w-12 h-12 text-amber-400" />
              <span className="text-gray-300">Click to upload image</span>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative">
              <img
                src={URL.createObjectURL(form.image)}
                alt="Coach preview"
                className="w-full max-h-96 object-contain rounded-xl border border-white/20"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !form.name || !form.image}
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-600 text-black font-bold rounded-xl transition flex items-center justify-center"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Add Coach"
          )}
        </button>

        {message && (
          <div
            className={`text-center text-xl font-medium ${
              message.includes("success") || message.includes("added")
                ? "text-green-400"
                : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}
      </form>

      <Footer />
    </>
  );
}