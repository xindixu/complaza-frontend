import Head from "next/head"
import "../styles/globals.css"
import { Layout, Menu } from "antd"
import Navbar from "../components/navbar"

const { Header, Content, Footer } = Layout

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
        <Content className="site-layout" style={{ padding: "0 50px", marginTop: 64 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <Component {...pageProps} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Complaza</Footer>
      </Layout>
    </>
  )
}

export default App
