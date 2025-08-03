// File: src/components/ui/button.jsx

/**
 * Reusable Button component with consistent styling.
 * Includes hover, active, and disabled states with transition effects.
 * Cursor defaults to 'pointer' for better UX.
 * 
 * @param {ReactNode} children - Button content.
 * @param {function} onClick - Click event handler.
 * @param {string} className - Additional Tailwind utility classes.
 * @param {boolean} disabled - Disables the button when true.
 */
export const Button = ({ children, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 active:scale-95 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};
