import React from 'react'
import { Container, TitleContainer, Controlers } from './styles'

interface IContentHeaderProps {
  title: String;
  lineColor: string;
  children: React.ReactNode;
}

const ContentHeader: React.FC<IContentHeaderProps> = ({
  title, lineColor, children
}) => {

  return (
    <Container>
      <TitleContainer lineColor={lineColor}>
        <h1>{title}</h1>
      </TitleContainer>
      <Controlers>
        {children}
      </Controlers>
    </Container>
  )
}

export default ContentHeader