import { useCallback, useId, useRef, useState } from 'react';

interface ProjectVideoPlayerProps {
  src: string;
}

export function ProjectVideoPlayer({ src }: ProjectVideoPlayerProps) {
  const playGradientId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }, []);

  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);
  const handleEnded = useCallback(() => setIsPlaying(false), []);
  const handleLoadedData = useCallback(() => setIsLoaded(true), []);

  return (
    <div
      className={`project-video${isLoaded ? ' project-video--loaded' : ''}`}
    >
      <video
        ref={videoRef}
        className="project-video__canvas"
        src={src}
        preload="metadata"
        playsInline
        muted={false}
        onLoadedData={handleLoadedData}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onClick={togglePlay}
      />

      <button
        type="button"
        className={`project-video__overlay${
          isPlaying ? ' project-video__overlay--hidden' : ''
        }`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause Nebulance preview' : 'Play Nebulance preview'}
      >
        <span className="project-video__play-ring">
          <span className="project-video__play-glow" aria-hidden="true" />
          <svg
            className="project-video__play-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={playGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e0e7ff" />
                <stop offset="50%" stopColor="#c4b5fd" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
            <path d="M8 5.14v13.72L19 12 8 5.14z" fill={`url(#${playGradientId})`} />
          </svg>
        </span>
      </button>
    </div>
  );
}
