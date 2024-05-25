import Styles from './item-styles.scss'
import { LoadStockList } from '@/domain/usecases'
import { IconName, Icon } from '@/presentation/components'
import React from 'react'

type Props = {
  stock: LoadStockList.Model
}

const StockItem: React.FC<Props> = ({ stock }: Props) => {
  const iconName = IconName.Up
  return (
    <li className={Styles.stockItemWrap}>
      <div className={Styles.stockContent}>
        <Icon className={Styles.iconWrap} iconName={iconName} />
        <p data-testid="year" className={Styles.ano}>{stock.year}: </p>
        <p data-testid="acronym" className={Styles.acronym}>{stock.acronym}</p>
        <p> <span className={Styles.lucro}>Lucro:</span><span className={Styles.retorno}>{stock.profit}</span></p>
      </div>
      {
        // eslint-disable-next-line react/jsx-no-target-blank
        <footer><a href={stock.stock} target="_blank" className={Styles.link}>Ver ação hoje</a></footer>
      }
    </li>
  )
}

export default StockItem
