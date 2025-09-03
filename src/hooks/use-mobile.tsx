
import * as React from "react"

// Mobile breakpoint in pixels for responsive design.
const MOBILE_BREAKPOINT = 768

/**
 * Custom React hook to detect if the current viewport is mobile-sized.
 * Listens for window resize and media query changes.
 * @returns {boolean} True if mobile, false otherwise.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Create a media query list for mobile breakpoint.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    // Handler for media query change.
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Return true if mobile, false otherwise.
  return !!isMobile
}
