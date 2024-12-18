import { PropsTransaction, setTransaction } from '@/state/transaction';
import { RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

function DispatchTransaction() {
  const dispatch = useDispatch();
  const transaction = useSelector((state: RootState) => state.transaction);
  const onTransaction = useCallback((data: PropsTransaction) => {
    dispatch(setTransaction(data));
  }, [dispatch]);
  return { onTransaction, transaction };
}

export default DispatchTransaction;
