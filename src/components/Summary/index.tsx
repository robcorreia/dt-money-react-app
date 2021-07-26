import React, {useContext} from 'react';
import IncomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { TransactionsContext } from "../../TransactionsContext";

import { Container } from "../Summary/styles";

export function Summary() {
  const {transactions} = useContext(TransactionsContext);

  const summary = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'deposit') {
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;
    }
    else {
      acc.withdraws += transaction.amount;
      acc.total -= transaction.amount;
    };

    return acc;
  },{
      deposits: 0, 
      withdraws: 0, 
      total: 0,
  })

  return (
  <Container>
    
    <div>
      <header>
        <p>Entradas</p>
        <img src={IncomeImg} alt="Entradas" />
      </header>
      <strong>{new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(summary.deposits)}</strong>
    </div>
    <div>
      <header>
        <p>Saídas</p>
        <img src={outcomeImg} alt="Saidas" />
      </header>
      <strong>- {new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(summary.withdraws)}</strong>
    </div>
    <div className="hightlight-background">
      <header>
        <p>Total</p>
        <img src={totalImg} alt="Total" />
      </header>
      <strong>{Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(summary.total)}</strong>
    </div>
    </Container>
  )
}