/**
 * Utility function to conditionally join CSS class names
 * @param classes - Array of class names, which can be strings, undefined, null, or false
 * @returns Joined class names as a single string
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Generate navigation link classes based on current page
 * @param currentPage - Current page identifier
 * @param targetPage - Target page identifier for the link
 * @param baseClasses - Base CSS classes to apply
 * @param activeClasses - Additional classes for active state
 * @param inactiveClasses - Additional classes for inactive state
 * @returns Complete class string
 */
export function getNavLinkClasses(
  currentPage: string,
  targetPage: string,
  baseClasses: string = 'transition-colors',
  activeClasses: string = 'text-blue-600 dark:text-blue-400 font-medium',
  inactiveClasses: string = 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
): string {
  return classNames(
    baseClasses,
    currentPage === targetPage ? activeClasses : inactiveClasses
  );
}

/**
 * Generate button variant classes
 * @param variant - Button variant type
 * @param size - Button size
 * @param disabled - Whether button is disabled
 * @returns Complete button class string
 */
export function getButtonClasses(
  variant: 'primary' | 'secondary' | 'ghost' = 'primary',
  size: 'sm' | 'md' | 'lg' = 'md',
  disabled: boolean = false
): string {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantClasses = {
    primary: disabled
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: disabled
      ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
      : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500',
    ghost: disabled
      ? 'text-gray-400 cursor-not-allowed'
      : 'text-gray-700 hover:bg-gray-100 focus:ring-blue-500'
  };

  return classNames(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant]
  );
}