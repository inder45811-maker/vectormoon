import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../utils/analytics'

/**
 * Custom hook that observes React Router location changes
 * and sends an SPA page_view event to Google Analytics.
 */
export function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    // Delay slightly to allow React 19 to hoist updated document.title
    const timer = setTimeout(() => {
      const path = location.pathname + location.search
      trackPageView(path, document.title)
    }, 100)

    return () => clearTimeout(timer)
  }, [location.pathname, location.search])
}
