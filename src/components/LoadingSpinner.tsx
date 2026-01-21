interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner = ({ size = "md", className = "" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      {/* Sierpinski Triangle Spinner */}
      <svg
        viewBox="0 0 100 100"
        className="animate-spin-slow text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        {/* Outer triangle */}
        <polygon points="50,5 95,90 5,90" />
        {/* Inner triangles (level 1) */}
        <polygon points="50,5 72.5,47.5 27.5,47.5" className="text-science-gold" stroke="currentColor" />
        <polygon points="27.5,47.5 50,90 5,90" className="text-csir-blue-light" stroke="currentColor" />
        <polygon points="72.5,47.5 95,90 50,90" className="text-science-gold" stroke="currentColor" />
        {/* Central inverted triangle */}
        <polygon points="27.5,47.5 72.5,47.5 50,90" className="text-primary/50" stroke="currentColor" />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
