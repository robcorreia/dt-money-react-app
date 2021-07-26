import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import closeImg from '../../assets/close.svg'

import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useTransactions } from '../../hooks/useTransactions';

// Make sure to bind modal to your appElement
Modal.setAppElement('#root');

interface INewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: INewTransactionModalProps) {
  const {createTransaction} = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title, 
      amount, 
      category,
      type}

    );

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('');
    onRequestClose();
  }

  return (
    <Modal 
    isOpen={isOpen} 
    onRequestClose={onRequestClose}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
  >

    <button type="button" 
      onClick={onRequestClose} 
      className="react-modal-close">
      <img src={closeImg} alt="Fechar modal" />
    </button>

  <Container onSubmit={handleCreateNewTransaction}>
    <h2>Cadastrar transação</h2>

    <input 
      type="text" 
      value={title} 
      placeholder="Título" 
      onChange={event => setTitle(event.target.value)}
    />

    <input 
      type="number" 
      value={amount} 
      placeholder="Valor" 
      onChange={event => setAmount(Number(event.target.value))}
    />

    <TransactionTypeContainer>
    <RadioBox
      type="button"
      onClick={() => setType('deposit')}
      isActive={type === 'deposit'}
      activeColor="green"
    >
    <img src={incomeImg} alt="Entrada" />
    <span>Entrada</span>
    </RadioBox>
    <RadioBox
      type="button"
      onClick={() => setType('withdraw')}
      isActive={type === 'withdraw'}
      activeColor="red"
    >
    <img src={outcomeImg} alt="Saída" />
    <span>Saída</span>
    </RadioBox>
    </TransactionTypeContainer>

    <input 
      type="text" 
      value={category} 
      placeholder="Categoria" 
      onChange={event => setCategory(event.target.value)}
    />

    <button type="submit">Cadastrar</button>

  </Container>
 </Modal>

  );
}