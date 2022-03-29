import Head from "next/head"
import styled from "styled-components"

const Header = styled.h1`
  ${({ color }) => `
    color: ${color};
    `}
`

export default function Home() {
  return (
    <div>
      <Head>
        <title>Complaza</title>
        <meta name="description" content="Compare products!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        Search page
        <Header color="green">Hi</Header>
      </main>

      <footer></footer>
    </div>
  )
}
