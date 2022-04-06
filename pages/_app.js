import Head from "next/head"
import "../styles/globals.css"
import { Layout, Menu } from "antd"
import Amplify from "aws-amplify"
import Navbar from "../components/navbar"

import awsconfig from "../src/aws-exports"

const { Content } = Layout

Amplify.configure({ ...awsconfig, ssr: true })
function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Complaza</title>
        <meta name="description" content="Compare products!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar />
        <Content style={{ padding: "0 50px", marginTop: 64, height: "100%" }}>
          <div style={{ padding: 24, minHeight: 380 }}>
            <Component {...pageProps} />
          </div>
        </Content>
      </Layout>
    </>
  )
}

export default App
