import { useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface InteractiveFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  iconBg: string;
  puzzle: {
    question: string;
    hint: string;
    answer: string;
  };
  index: number;
}

const InteractiveFeatureCard = ({
  icon: Icon,
  title,
  description,
  gradient,
  iconBg,
  puzzle,
  index,
}: InteractiveFeatureCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div
      className="animate-on-scroll perspective-1000"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <motion.div
        className="relative w-full h-80 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        onHoverStart={() => setIsFlipped(true)}
        onHoverEnd={() => {
          setIsFlipped(false);
          setShowAnswer(false);
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of Card */}
        <motion.div
          className={`absolute inset-0 bg-background rounded-2xl p-8 shadow-card graph-paper border-2 border-primary/10 backface-hidden`}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 rounded-2xl`} />

          <div className="relative z-10">
            <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center mb-6 shadow-button`}>
              <Icon className="w-7 h-7 text-primary-foreground" />
            </div>

            <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>

            <div className="mt-6 flex items-center text-primary font-medium text-sm">
              <span>Tap for puzzle</span>
              <span className="ml-2 animate-bounce">🧩</span>
            </div>
          </div>
        </motion.div>

        {/* Back of Card (Puzzle) */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary to-csir-blue-light rounded-2xl p-8 shadow-card-hover backface-hidden"
          animate={{ rotateY: isFlipped ? 0 : -180 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="h-full flex flex-col justify-between text-primary-foreground">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🧩</span>
                <span className="font-bold text-science-gold">Mini Puzzle!</span>
              </div>

              <p className="text-lg font-medium mb-4">{puzzle.question}</p>

              <div className="bg-white/10 rounded-lg p-3 mb-4">
                <p className="text-sm opacity-80">💡 Hint: {puzzle.hint}</p>
              </div>
            </div>

            <div>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAnswer(!showAnswer);
                }}
                className="w-full py-2 bg-science-gold text-accent-foreground rounded-lg font-semibold text-sm hover:bg-science-gold-dark transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                {showAnswer ? "Hide Answer" : "Reveal Answer"}
              </motion.button>

              {showAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 bg-white/20 rounded-lg text-center font-mono font-bold"
                >
                  {puzzle.answer}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InteractiveFeatureCard;
