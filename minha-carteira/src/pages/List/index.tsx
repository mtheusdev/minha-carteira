import React from 'react'
import { Container } from './style'
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
const List: React.FC = () => {
  const options = [
    {
      value: 'Seila', label: 'seilla'
    }
  ]
  return (
    <Container>
      <ContentHeader title="Entradas" lineColor="#484">
          <SelectInput options={options}/>
      </ContentHeader>
    </Container>
  )
}

export default List