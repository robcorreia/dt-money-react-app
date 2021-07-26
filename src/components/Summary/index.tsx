import React, {useContext} from 'react';
import IncomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { TransactionsContext } from "../../TransactionsContext";

import { Container } from "../Summary/styles";

export function Summary() {
  const {transactions} = useContext(TransactionsContext);
  console.log(transactions)
  return (
  <Container>
    
    <div>
      <header>
        <p>Entradas</p>
        <img src={IncomeImg} alt="Entradas" />
      </header>
      <strong>R$ 1000,00</strong>
    </div>
    <div>
      <header>
        <p>Saídas</p>
        <img src={outcomeImg} alt="Saidas" />
      </header>
      <strong>- R$ 500,00</strong>
    </div>
    <div className="hightlight-background">
      <header>
        <p>Total</p>
        <img src={totalImg} alt="Total" />
      </header>
      <strong>R$ 500,00</strong>
    </div>
    </Container>
  )
}