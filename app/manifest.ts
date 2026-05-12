import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alfaazo — Learn Punjabi",
    short_name: "Alfaazo",
    description:
      "Learn Punjabi with bite-sized lessons. Master Gurmukhi script, everyday phrases, and real-world conversations.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDF6EC",
    theme_color: "#673AB7",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
