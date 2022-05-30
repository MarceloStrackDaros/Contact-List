import { useEffect, useState } from "react";

export const useStorage = (key, defaultValue) => {

  const [state, setState] = useState(() => {
    const dado = window.localStorage.getItem(key)
    return dado ? dado : defaultValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}