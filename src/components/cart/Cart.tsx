import { IonButton, IonIcon, useIonAlert } from '@ionic/react';
import './Cart.css';
import { useCart, useStore } from '../../hooks';
import { Order } from '../../models';
import { createOutline, trashOutline } from 'ionicons/icons';
import { useEffect, useMemo, useState } from 'react';
import { ProductQuanitity } from '../product-quantity/ProductQuantity';

interface CartProps {
}

export const Cart: React.FC<CartProps> = () => {
    const { items, removeFromCart } = useCart();
    const { saveTransaction, uploadTransactions, transactions } = useStore();
    const [order, setOrder] = useState<Order | undefined>(undefined);
    const [state, setState] = useState(false);
    const [presentAlert] = useIonAlert();


    useEffect(() => {
        uploadTransactions();
    }, [transactions]);

    const editOrder = (item: Order) => {
        setOrder(oldVal => {
            setState(true);
            return item;
        });
    };


    const totalPrice = useMemo(() => {
        const itemPrices = items.map((item: Order) => (item.price! * item.quantity));

        return (itemPrices.reduce((a: number, b: number) => a + b, 0)).toFixed(2);
    }, [items]);

    const onPlaceOrder = () => {
        presentAlert(`Are you sure you want to place this order?`, [
            { text: 'Cancel', role: 'cancel' },
            {
                text: 'Confirm', handler: () => {
                    saveTransaction(items, totalPrice);
                }
            },

        ]);
    }

    return (
        <>
            <div className='cart-wrapper'>
                <div className='order-wrapper'>
                    {
                        items.length > 0 &&
                        items.map((item: Order, index: number) => (
                            <div key={`cart-item-${index}`} className='order-box'>
                                <div className='order-item'>
                                    <div>
                                        {item.product.name} {  !item.product?.isDynamicPrice ? `(x${item.quantity})` : '' }
                                    </div>
                                    <div>
                                        P {item.price}
                                    </div>
                                </div>
                                <div className='action-buttons'>
                                    <IonButton fill='clear' size='small' onClick={() => editOrder(item)}>
                                        <IonIcon icon={createOutline} slot='start' /> Edit
                                    </IonButton>
                                    <IonButton fill='clear' color='danger' size='small' onClick={() => removeFromCart(index)}>
                                        <IonIcon icon={trashOutline} slot='start' /> Remove
                                    </IonButton>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='order-summary'>
                    <div className='order-total'>
                        <span>Total:</span>
                        <span>P {totalPrice}</span>
                    </div>
                    <IonButton expand='block' onClick={onPlaceOrder} disabled={items.length === 0}>
                        Place Order
                    </IonButton>
                </div>
            </div>
            <ProductQuanitity
                state={state}
                product={order?.product}
                setState={setState}
                isEdit={true}
                order={order}
                onModalClose={() => setState(false)}
            />
        </>
    )
}