import { IonText } from '@ionic/react';
import { useStore } from '../../hooks';
import { Transaction } from '../../models';
import { PopupModal } from '../popup-modal/PopupModal';
import './UploadTransactions.css';
import moment from 'moment';
interface UploadTransactionsProps {
    state: boolean;
    setState: any;
    onModalClose?: () => any;
}

export const UploadTransactions: React.FC<UploadTransactionsProps> = ({
    state,
    setState,
    onModalClose
}) => {
    const { transactions } = useStore();
    const getStatus = (transaction: Transaction) => {
        if (transaction.status == 1) {
            return {
                text: 'Not Uploaded',
                color: 'warning'
            };
        } else if (transaction.status == 2) {
            return {
                text: 'Uploaded',
                color: 'success'
            };
        }

        return {
            text: 'Unknown',
            color: 'dark'
        };
    }
    return (
        <PopupModal
            state={state}
            setState={setState}
            onModalClose={onModalClose}
        >
            <div className='modal-content'>
                <div className='modal-header'>
                    <h3>Transactions</h3>
                </div>
                <div>
                    {
                        transactions.map((transaction: Transaction) => (
                            <div key={transaction.transaction_code} className="transaction-item">
                                <div>{moment(transaction.createdAt).format('lll')}</div>
                                <div>#{transaction.transaction_code}</div>
                                <div>Orders: {transaction.orders.length}</div>
                                <div>Total: P {transaction.total_amount}</div>
                                <div>Status: <IonText color={getStatus(transaction).color}>{getStatus(transaction).text}</IonText></div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </PopupModal>
    );
}