interface FormulaDecorProps {
  formula: string;
  position?: "left" | "right";
  className?: string;
}

const formulas = {
  euler: "e^{iπ} + 1 = 0",
  goldenRatio: "φ = (1 + √5) / 2",
  pythagorean: "a² + b² = c²",
  quadratic: "x = (-b ± √(b²-4ac)) / 2a",
  pi: "π = 3.14159...",
  infinity: "∞",
};

const FormulaDecor = ({ formula, position = "right", className = "" }: FormulaDecorProps) => {
  const formulaText = formulas[formula as keyof typeof formulas] || formula;
  
  return (
    <div
      className={`
        absolute font-math text-lg md:text-xl text-muted-foreground/15 
        hidden lg:block select-none pointer-events-none
        ${position === "left" ? "left-4" : "right-4"}
        ${className}
      `}
    >
      {formulaText}
    </div>
  );
};

export default FormulaDecor;
