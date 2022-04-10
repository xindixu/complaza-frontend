import { useEffect, useState } from "react"
import Head from "next/head"
import "../styles/globals.css"
import "../styles/main.css"
import { Layout } from "antd"
import Amplify from "aws-amplify"
import Navbar from "../components/navbar"
import AuthContext from "../context/auth"
import { getCurrentUser } from "../lib/auth"
import awsconfig from "../src/aws-exports"

const { Content } = Layout

Amplify.configure({
  ...awsconfig,
  ssr: true,
  API: {
    endpoints: [
      {
        name: "default",
        // TODO: consider moving it to env vars and/or auto grep from stack
        endpoint: "https://03zljwt77a.execute-api.us-east-1.amazonaws.com/stage1",
      },
    ],
  },
})

function App({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState({})
  useEffect(() => {
    getCurrentUser().then(setCurrentUser)
  }, [])

  return (
    <>
      <Head>
        <title>Complaza</title>
        <meta name="description" content="Compare products!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthContext.Provider value={currentUser}>
        <Layout>
          <Navbar />
          <Content style={{ padding: "0 50px", marginTop: 64, height: "100%" }}>
            <div style={{ padding: 24, minHeight: 380 }}>
              <Component {...pageProps} />
            </div>
          </Content>
        </Layout>
      </AuthContext.Provider>
    </>
  )
}

export default App
