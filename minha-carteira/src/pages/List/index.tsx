import React, { useMemo, useState, useEffect } from 'react'
import { Container, Content, Filters } from './style'
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from './../../components/HistoryFinanceCard/index';
import gains from './../../repositories/gains';
import expenses from './../../repositories/expenses';
import formatCurrency from './../../utils/formatCurrent';
import formatDate from './../../utils/formatDate';
import months from '../../utils/months';
import { v4 as uuidv4 } from 'uuid';
interface IRouteParams {
  match: {
    params: {
      type: string;
    }
  }
}

interface IData {
  id: string;
  description: string;
  amountFormated: string;
  frequency: string;
  dataFormated: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth()));
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));

  const { type } = match.params

  const ContentHeaderProps = useMemo(() => {
    return type === 'entry-balance' ? 
      {
        title: 'Entradas',
        lineColor: '#F7931B'
      } :  {
        title: 'Saídas',
        lineColor: '#E44C4E'
      }
  }, [type]);

  const listData = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses
  }, [type])
  
  const listMonths = useMemo(() => {
    return months.map((month: string, index: number)=> {
      return {
        value: index + '',
        label: month
      }
    })
  }, []);

  const years = useMemo(() => {
    let uniqueYears:number[] = [];

    listData.forEach(item => {
      const date = new Date(item.date);

      const year = date.getFullYear();
      
      if(!uniqueYears.includes(year)) {
        uniqueYears.push(year)
      }

    });
    
    return uniqueYears.map(year => {
      return {
        value: year,
        label: year
      }
    })

  }, [listData]);
  
  useEffect(() => {

    const filteredDate = listData.filter(item => {
      const date = new Date(item.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());
      return month === monthSelected && year === yearSelected;
    })
    const formatedDate = filteredDate.map((itemMap) => {
      return  {
        id: uuidv4(),
        description: itemMap.description,
        amountFormated: formatCurrency(Number(itemMap.amount)),
        frequency: itemMap.frequency,
        dataFormated: formatDate(itemMap.date),
        tagColor: itemMap.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
      }
    })
    setData(formatedDate);
  }, [data.length, listData, monthSelected, yearSelected])

  return (
    <Container>
      <ContentHeader title={ContentHeaderProps.title} lineColor={ContentHeaderProps.lineColor}>
          <SelectInput options={listMonths} defaultValue={monthSelected} onChange={(e) => setMonthSelected(e.target.value)}/>
          <SelectInput options={years} defaultValue={yearSelected} onChange={(e) => setYearSelected(e.target.value)}/>
      </ContentHeader>
      <Filters>
        <button 
          type="button"
          className="tag-filter tag-filter-reccurent"
        >
          Recorrentes
        </button>
        <button 
          type="button"
          className="tag-filter tag-filter-eventual"
        >
          Eventuais
        </button>
      </Filters>
      <Content>
        {data.map((item) => (
          <HistoryFinanceCard
            key={item.id}
            tagColor={item.tagColor}
            title={item.description}
            subtitle={item.dataFormated}
            amount={item.amountFormated}
          />
        ))}
      </Content>
    </Container>
  )
}

export default List