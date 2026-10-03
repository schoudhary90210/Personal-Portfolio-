'use client';

interface CornerBracketsProps {
  children: React.ReactNode;
  className?: string;
}

export default function CornerBrackets({ children, className = '' }: CornerBracketsProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Top-left */}
      <div className="absolute -top-1 -left-1 w-5 h-5 border-t border-l border-accent/50" />
      {/* Top-right */}
      <div className="absolute -top-1 -right-1 w-5 h-5 border-t border-r border-accent/50" />
      {/* Bottom-left */}
      <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b border-l border-accent/50" />
      {/* Bottom-right */}
      <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b border-r border-accent/50" />
      {children}
    </div>
  );
}
