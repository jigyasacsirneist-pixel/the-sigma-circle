import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const operators = ["+", "-", "×", "÷", "="];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

interface FallingElement {
  id: number;
  char: string;
  x: number;
  delay: number;
  type: "number" | "operator";
}

const EquationBalancer = () => {
  const [elements, setElements] = useState<FallingElement[]>([]);
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const items: FallingElement[] = [];
    for (let i = 0; i < 20; i++) {
      const isOperator = Math.random() > 0.6;
      items.push({
        id: i,
        char: isOperator
          ? operators[Math.floor(Math.random() * operators.length)]
          : numbers[Math.floor(Math.random() * numbers.length)],
        x: Math.random() * 100,
        delay: Math.random() * 2,
        type: isOperator ? "operator" : "number",
      });
    }
    setElements(items);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity }}
    >
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className={`absolute font-math text-2xl md:text-4xl ${
            el.type === "operator" ? "text-science-gold/30" : "text-primary/20"
          }`}
          style={{
            left: `${el.x}%`,
            y,
          }}
          initial={{ y: -100, rotate: 0 }}
          animate={{
            y: ["-10vh", "110vh"],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            delay: el.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {el.char}
        </motion.div>
      ))}

      {/* Balanced Equation at Bottom */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-8 py-4 rounded-2xl border-2 border-science-gold/30 shadow-card"
        style={{
          opacity: useTransform(scrollYProgress, [0.5, 0.8], [0, 1]),
        }}
      >
        <p className="font-math text-2xl md:text-3xl text-foreground">
          <span className="text-primary">2</span>
          <span className="text-science-gold mx-2">+</span>
          <span className="text-primary">2</span>
          <span className="text-muted-foreground mx-2">=</span>
          <span className="text-science-gold font-bold">4</span>
        </p>
        <p className="text-center text-xs text-muted-foreground mt-2">✨ Perfectly Balanced!</p>
      </motion.div>
    </motion.div>
  );
};

export default EquationBalancer;
