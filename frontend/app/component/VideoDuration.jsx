import { useEffect, useState } from "react";

export default function VideoDuration({ url }) {
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (!url) return;

    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = url;

    video.onloadedmetadata = () => {
      const total = video.duration;
      const minutes = Math.floor(total / 60);
      const seconds = Math.floor(total % 60).toString().padStart(2, "0");
      setDuration(`${minutes}:${seconds}`);
    };

    video.onerror = () => setDuration("?");
  }, [url]);

  return <>{duration || "..."}</>;
}
