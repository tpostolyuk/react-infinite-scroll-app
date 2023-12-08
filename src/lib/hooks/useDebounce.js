import { useState, useEffect } from 'react'

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(null)
  useEffect(() => {
    const handler =
      setTimeout(() => {
        setDebounceValue(value)
      }, delay)

    return () => {
      clearInterval(handler)
    }
  }, [value, delay])

  return debounceValue
}
