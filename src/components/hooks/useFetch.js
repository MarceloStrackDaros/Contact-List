import { useCallback, useState } from "react"

export default function useFetch(url) {
  const ulrBase = url || "http://localhost:5000/v1/"
  const [loading, setLoading] = useState(null)

  const request = useCallback(async (rota, options) => {

    const headers = new Headers()
    headers.append("Content-type", "application/json")
    headers.append("Access-Control-Allow-Methods", "*")
    headers.append("Access-Control-Allow-Origin", "*")
    headers.append("Access-Control-Allow-Headers", "*")
    options.headers = headers
    
    let response
    let json

    try {
      setLoading(true)
      response = await fetch(ulrBase + rota, options)
      json = await response.json()
    }
    catch (error) {
      json = null
      console.log("Error: ", error)
    }
    finally {
      setLoading(false)
      return { response, json }
    }
  }, [])

  return { loading, request }
}