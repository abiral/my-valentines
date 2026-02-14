import { useState, useRef, useEffect } from "react";
import { Heart, X, Volume2, VolumeX } from "lucide-react";
import couplePlaceholder from "@/assets/couple-placeholder.jpg";
import backgroundMusic from "@/assets/background.mp3";

const ValentineGreeting = () => {
  const [showPhoto, setShowPhoto] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMusicLoaded, setIsMusicLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setIsMusicLoaded(true);
      // Auto-play the music with a slight delay
      setTimeout(() => {
        audio.play().then(() => {
          setIsMusicPlaying(true);
        }).catch((error) => {
          console.log("Auto-play was prevented:", error);
          // Auto-play is blocked, user will need to click to play
        });
      }, 1000);
    };

    const handlePlay = () => setIsMusicPlaying(true);
    const handlePause = () => setIsMusicPlaying(false);
    const handleEnded = () => {
      setIsMusicPlaying(false);
      // Loop the music
      audio.currentTime = 0;
      audio.play();
    };

    audio.volume = 0.4; // Set initial volume

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const toggleMusic = (forcePlay = false) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMusicPlaying && !forcePlay) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 relative z-10">
      {/* Background Music */}
      <audio
        ref={audioRef}
        src={backgroundMusic}
        preload="auto"
        loop
      />

      {/* Music Control Button */}
      {isMusicLoaded && (
        <button
          onClick={() => toggleMusic(false)}
          className="fixed top-6 right-6 z-40 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-card transition-all duration-300 shadow-lg"
          title={isMusicPlaying ? "Pause music" : "Play music"}
        >
          {isMusicPlaying ? (
            <Volume2 size={18} className="text-primary" />
          ) : (
            <VolumeX size={18} className="text-muted-foreground" />
          )}
        </button>
      )}
      {/* Decorative clouds */}
      <div className="absolute top-8 left-8 w-28 h-12 bg-cloud rounded-full opacity-50" />
      <div className="absolute top-16 right-12 w-20 h-10 bg-cloud rounded-full opacity-40" />
      <div className="absolute bottom-16 right-1/4 w-36 h-14 bg-cloud rounded-full opacity-45" />

      {/* Main greeting */}
      <div className="text-center max-w-2xl">
        <p
          className="text-muted-foreground uppercase tracking-[0.3em] font-body font-semibold text-sm mb-2 animate-fade-in-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          Happy
        </p>

        <h1
          className="font-display text-6xl md:text-8xl text-primary mb-2 animate-fade-in-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          Valentine's
        </h1>

        <p
          className="text-muted-foreground uppercase tracking-[0.3em] font-body font-semibold text-sm mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          Day
        </p>

        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "0.7s", opacity: 0 }}
        >
          <Heart
            className="w-12 h-12 text-primary mx-auto mb-8 animate-gentle-bounce"
            fill="hsl(var(--primary))"
          />
        </div>

        <p
          className="font-body text-foreground text-xl md:text-2xl leading-relaxed mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.9s", opacity: 0 }}
        >
          To my amazing wife,
        </p>

        <p
          className="font-body text-muted-foreground text-lg md:text-xl leading-relaxed mb-6 max-w-lg mx-auto animate-fade-in-up"
          style={{ animationDelay: "1.1s", opacity: 0 }}
        >
          Every moment with you is a gift I cherish. From that first meeting at 
          <span className="text-primary font-semibold"> Top of the World</span>, 
          to every day since - you make my world brighter. 
        </p>

        <p
          className="font-body text-foreground text-lg md:text-xl leading-relaxed mb-10 animate-fade-in-up"
          style={{ animationDelay: "1.3s", opacity: 0 }}
        >
          I love you more than words can say. 💕
        </p>

        {/* Photo button */}
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "1.5s", opacity: 0 }}
        >
          <button
            onClick={() => {
              toggleMusic(true);
              setShowPhoto(true)
            }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold text-lg hover:opacity-90 transition-all duration-300 animate-pulse-glow"
          >
            <Heart className="w-5 h-5" fill="currentColor" />
            See Our Photo
          </button>
        </div>

        {/* Small decorative hearts */}
        <div
          className="flex justify-center gap-4 mt-12 animate-fade-in-up"
          style={{ animationDelay: "1.7s", opacity: 0 }}
        >
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className="text-primary"
              fill="hsl(var(--primary))"
              size={12 + i * 4}
              style={{ opacity: 0.3 + i * 0.15 }}
            />
          ))}
        </div>
      </div>

      {/* Photo modal */}
      {showPhoto && (
        <div
          className="fixed inset-0 bg-foreground/40 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={() => setShowPhoto(false)}
        >
          <div
            className="relative max-w-md w-full bg-card rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up"
            style={{ opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPhoto(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-card transition-colors"
            >
              <X size={18} />
            </button>

            <img
              src={couplePlaceholder}
              alt="Our special moment together"
              className="w-full aspect-square object-cover"
            />

            <div className="p-6 text-center">
              <p className="font-display text-3xl text-primary mb-2">Us Together</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValentineGreeting;
