import { useState, useEffect } from 'react'

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(null)
  useEffect(() => {
    console.log('lalalal', value)
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
