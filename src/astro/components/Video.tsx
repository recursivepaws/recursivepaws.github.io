import type { Video as SanityVideo } from "../utils/sanity";

export function Video({ video }: { video: SanityVideo }) {
  const ratio = video.width / video.height;
  return (
    <div
      className="relative mx-auto"
      // full width, but never taller than --media-h (keeps portrait videos sane)
      style={{
        aspectRatio: `${video.width} / ${video.height}`,
        width: `min(100%, calc(var(--media-h) * ${ratio}))`,
      }}
    >
      <iframe
        src={`https://player.mediadelivery.net/embed/${import.meta.env.PUBLIC_BUNNY_LIBRARY_ID}/${video.videoId}?autoplay=false&loop=true&muted=false&preload=true&responsive=true`}
        title={video.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full border-0"
        style={{
          border: 0,
          position: "absolute",
          top: 0,
          height: "100%",
          width: "100%",
        }}
        allow="accelerometer;gyroscope;encrypted-media;picture-in-picture;"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
}
