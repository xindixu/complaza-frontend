import React, { useState, useEffect, useContext, useCallback } from "react"
import { API } from "aws-amplify"
import { useRouter } from "next/router"
import qs from "qs"
import AuthContext from "../context/auth"
import withProtectedRoute from "../components/protected-route"

function History() {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { userId, token } = useContext(AuthContext)

  const queryFromHistory = useCallback(
    (query) => {
      if (!userId || !token) {
        return
      }
      setIsLoading(true)
      const params = {
        q: query,
      }
      const link = query
        ? `/search/history/${userId}?${qs.stringify(params)}`
        : `/history/${userId}`

      API.get("default", link, {
        headers: {
          Authorization: token,
        },
      }).then((res) => {
        if (res.statusCode !== 200) {
          console.error("error")
        }

        setItems(res.body.items)
        setIsLoading(false)
      })
    },
    [token, userId]
  )

  useEffect(() => {
    queryFromHistory()
  }, [queryFromHistory, token, userId])

  return <div>History</div>
}

export default withProtectedRoute(History)
