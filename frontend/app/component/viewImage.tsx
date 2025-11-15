import Image from "next/image";
import { X } from "lucide-react";

interface FullViewProps {
  img: string;
  onClose: () => void;
  alt?: string;
}

export default function FullView({ img, onClose, alt = "Player Image" }: FullViewProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white p-2 rounded-full hover:bg-white/20 transition"
      >
        <X className="w-8 h-8" />
      </button>
      <div className="relative w-full h-full max-w-5xl max-h-full p-4">
        <Image
          src={img}
          alt={alt}
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
