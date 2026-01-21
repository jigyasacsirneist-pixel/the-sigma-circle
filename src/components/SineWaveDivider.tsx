interface SineWaveDividerProps {
  className?: string;
  color?: string;
  inverted?: boolean;
}

const SineWaveDivider = ({ className = "", color = "text-primary/20", inverted = false }: SineWaveDividerProps) => {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className={`w-full h-8 ${color} ${inverted ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          d="M0,30 
             Q50,0 100,30 T200,30 T300,30 T400,30 T500,30 T600,30 
             T700,30 T800,30 T900,30 T1000,30 T1100,30 T1200,30"
          className="animate-sine-wave"
        />
      </svg>
    </div>
  );
};

export default SineWaveDivider;
