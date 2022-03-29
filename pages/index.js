import styled from "styled-components"
import { Button } from 'antd';

const Header = styled.h1`
  ${({ color }) => `
    color: ${color};
    `}
`

export default function Home() {
  return (
    <div>


      <main>
        Search page
        <Header color="green">Hi</Header>
        <Button type="primary">Button</Button>
      </main>
    </div>
  )
}
