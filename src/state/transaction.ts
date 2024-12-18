import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface PropsTransaction {
  request: HistoryTran
  transaction: PropsTrans
}

export interface VaNumber {
  bank: string;
  va_number: string;
}

export interface HistoryTran {
  id: string,
  productName: string,
  price: number,
  quantity: number,
}

export const initialState: PropsTransaction = {
  request: {
    id: '',
    productName: '',
    price: 0,
    quantity: 0,
  },
  transaction: {
    transaction_id: '',
    order_id: '',
    gross_amount: '',
    payment_type: '',
    transaction_status: '',
    fraud_status: '',
    va_numbers: [{ bank: '', va_number: '' }],
  },
};

export interface PropsTrans {
  transaction_id: string;
  order_id:string;
  gross_amount: string;
  payment_type: string;
  transaction_status: string;
  fraud_status: string;
  va_numbers: VaNumber[];
}

const TransactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransaction: (state, action: PayloadAction<PropsTransaction>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setTransaction } = TransactionSlice.actions;

export default TransactionSlice.reducer;
