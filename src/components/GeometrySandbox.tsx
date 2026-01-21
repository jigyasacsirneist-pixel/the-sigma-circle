import { useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { X, Maximize2, Minimize2 } from "lucide-react";

interface Shape {
  id: string;
  type: "cube" | "sphere" | "pyramid" | "cylinder";
  x: number;
  y: number;
  color: string;
}

const shapeColors = ["#FFCC00", "#003366", "#4A90D9", "#FF6B6B", "#4ECDC4"];

const GeometrySandbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shapes, setShapes] = useState<Shape[]>([]);

  const addShape = (type: Shape["type"]) => {
    const newShape: Shape = {
      id: `${type}-${Date.now()}`,
      type,
      x: Math.random() * 150 + 50,
      y: Math.random() * 150 + 50,
      color: shapeColors[Math.floor(Math.random() * shapeColors.length)],
    };
    setShapes([...shapes, newShape]);
  };

  const removeShape = (id: string) => {
    setShapes(shapes.filter((s) => s.id !== id));
  };

  const renderShape = (type: Shape["type"], color: string, size: number = 50) => {
    switch (type) {
      case "cube":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill={color} opacity={0.8} />
            <polygon points="50,10 90,30 50,50 10,30" fill={color} opacity={0.9} />
            <line x1="50" y1="50" x2="50" y2="90" stroke={color} strokeWidth="2" opacity={0.6} />
          </svg>
        );
      case "sphere":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <defs>
              <radialGradient id={`sphere-${color}`} cx="30%" cy="30%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="100%" stopColor={color} />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill={`url(#sphere-${color})`} />
          </svg>
        );
      case "pyramid":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon points="50,10 90,80 10,80" fill={color} opacity={0.8} />
            <polygon points="50,10 90,80 50,90" fill={color} opacity={0.6} />
          </svg>
        );
      case "cylinder":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <ellipse cx="50" cy="25" rx="35" ry="15" fill={color} opacity={0.9} />
            <rect x="15" y="25" width="70" height="50" fill={color} opacity={0.7} />
            <ellipse cx="50" cy="75" rx="35" ry="15" fill={color} opacity={0.8} />
          </svg>
        );
    }
  };

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed left-6 bottom-6 z-50 bg-primary text-primary-foreground px-4 py-3 rounded-xl shadow-button flex items-center gap-2 font-semibold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xl">🔷</span>
        <span className="hidden sm:inline">Shape Sandbox</span>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: -100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: -100 }}
      className={`fixed left-6 bottom-6 z-50 bg-background border-2 border-primary/30 rounded-2xl shadow-card-hover overflow-hidden ${
        isExpanded ? "w-96 h-[500px]" : "w-72 h-80"
      }`}
    >
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between">
        <span className="font-bold text-sm">🔷 Shape Sandbox</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsExpanded(!isExpanded)} className="hover:opacity-80">
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button onClick={() => setIsOpen(false)} className="hover:opacity-80">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Shape Buttons */}
      <div className="p-2 border-b border-border flex gap-2 flex-wrap">
        {(["cube", "sphere", "pyramid", "cylinder"] as const).map((type) => (
          <motion.button
            key={type}
            onClick={() => addShape(type)}
            className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={`Add ${type}`}
          >
            {renderShape(type, "#FFCC00", 30)}
          </motion.button>
        ))}
        <button
          onClick={() => setShapes([])}
          className="ml-auto text-xs text-muted-foreground hover:text-destructive"
        >
          Clear all
        </button>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full h-[calc(100%-80px)] bg-gradient-to-br from-muted to-background overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="sandbox-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sandbox-grid)" />
          </svg>
        </div>

        {shapes.map((shape) => (
          <motion.div
            key={shape.id}
            drag
            dragMomentum={false}
            dragElastic={0.1}
            whileDrag={{ scale: 1.2, zIndex: 100 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onDoubleClick={() => removeShape(shape.id)}
            className="absolute cursor-grab active:cursor-grabbing"
            style={{ left: shape.x, top: shape.y }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {renderShape(shape.type, shape.color, 50)}
          </motion.div>
        ))}

        {shapes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            <div className="text-center">
              <p className="text-2xl mb-2">👆</p>
              <p>Click shapes above to add!</p>
              <p className="text-xs mt-1">Drag to move • Double-click to remove</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GeometrySandbox;
