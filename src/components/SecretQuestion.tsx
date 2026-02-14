import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface SecretQuestionProps {
  onSuccess: () => void;
}

const STORAGE_KEY = "valentines-secret-answered";

const SecretQuestion = ({ onSuccess }: SecretQuestionProps) => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  // Check if the user has already answered correctly
  // useEffect(() => {
  //   const hasAnswered = localStorage.getItem(STORAGE_KEY);
  //   if (hasAnswered === "true") {
  //     onSuccess();
  //   }
  // }, [onSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === "top of the world") {
      // Store that the user answered correctly
      localStorage.setItem(STORAGE_KEY, "true");
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 relative z-10">
      {/* Decorative clouds */}
      <div className="absolute top-10 left-10 w-24 h-12 bg-cloud rounded-full opacity-60" />
      <div className="absolute top-20 right-16 w-16 h-8 bg-cloud rounded-full opacity-40" />
      <div className="absolute bottom-20 left-1/4 w-32 h-14 bg-cloud rounded-full opacity-50" />

      <div
        className="animate-fade-in-up"
        style={{ animationDelay: "0.2s", opacity: 0 }}
      >
        <Heart
          className="w-16 h-16 text-primary mx-auto mb-6 animate-gentle-bounce"
          fill="hsl(var(--primary))"
        />
      </div>

      <h1
        className="font-display text-5xl md:text-7xl text-primary mb-3 animate-fade-in-up"
        style={{ animationDelay: "0.4s", opacity: 0 }}
      >
        A Little Secret
      </h1>

      <p
        className="text-muted-foreground text-lg mb-10 text-center max-w-md animate-fade-in-up font-body"
        style={{ animationDelay: "0.6s", opacity: 0 }}
      >
        Only you know the answer to this... 💕
      </p>

      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-sm animate-fade-in-up ${shake ? "animate-shake" : ""}`}
        style={{ animationDelay: "0.8s", opacity: 0 }}
      >
        <label className="block text-center text-foreground font-body font-semibold text-lg mb-4">
          Which restaurant did we first meet at?
        </label>

        <input
          type="text"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setError(false);
          }}
          placeholder="Type your answer..."
          className="w-full px-6 py-4 rounded-full bg-card border-2 border-border text-foreground text-center font-body text-lg placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          autoFocus
        />

        {error && (
          <p className="text-heart text-sm text-center mt-3 font-body animate-fade-in-up" style={{ opacity: 1 }}>
            Hmm, that's not quite right... Try again! 💭
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-6 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold text-lg hover:opacity-90 transition-all duration-300 animate-pulse-glow"
        >
          Unlock My Surprise ❤️
        </button>
      </form>
    </div>
  );
};

export default SecretQuestion;
