import Styles from './error-styles.scss'
import { StockContext } from '@/presentation/pages/stock-list/components'
import React, { useContext } from 'react'

const Error: React.FC = () => {
  const { state, setState } = useContext(StockContext)
  const reload = (): void => {
    setState({ stocks: [], error: '', reload: !state.reload })
  }

  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{state.error}</span>
      <button data-testid="reload" onClick={reload}>Tentar novamente</button>
    </div>
  )
}

export default Error
