import React from 'react'
import { Container, Content } from './style'
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from './../../components/HistoryFinanceCard/index';

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
      <Content>
        <HistoryFinanceCard
          tagColor="#E44C4E"
          title="Conta de luz"
          subtitle="27/07/2020"
          amount="R$ 130,00"
        />
      </Content>
    </Container>
  )
}

export default List