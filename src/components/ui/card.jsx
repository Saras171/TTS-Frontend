// File: src/components/ui/card.jsx

/**
 * Card wrapper component for consistent layout and styling across the app.
 * Useful for grouping content with padding, rounded corners, and shadow.
 * 
 * @param {ReactNode} children - Card content.
 * @param {string} className - Additional className for customization.
 */
export const Card = ({ children, className }) => {
  return (
    <div
      className={`w-full max-w-2xl shadow-2xl rounded-3xl  ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * CardContent is a container with padding to hold inner content inside a card.
 * Keeps spacing consistent within card layouts.
 * 
 * @param {ReactNode} children - The content wrapped inside the card.
 */
export const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};
