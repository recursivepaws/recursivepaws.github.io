import type { Video as SanityVideo } from "../utils/sanity";

export function Video({ video }: { video: SanityVideo }) {
  // 13 videos have no stored dimensions; assume 16:9 instead of collapsing to 0px
  const ratio = video.width && video.height ? video.width / video.height : 16 / 9;
  return (
    <div
      className="relative mx-auto"
      // full width, but never taller than --media-h (keeps portrait videos sane)
      style={{
        aspectRatio: ratio,
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
