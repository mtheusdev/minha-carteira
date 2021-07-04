import React from 'react'
import ContentHeader from '../../components/ContentHeader'
import { Container } from './style'
import SelectInput from '../../components/SelectInput'

const Dashboard: React.FC = () => {
  const options = [
    {
      value: 'Seila', label: 'seilla'
    }
  ]

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#000">
        <SelectInput options={options}/>
      </ContentHeader>
    </Container>
  )
}

export default Dashboard