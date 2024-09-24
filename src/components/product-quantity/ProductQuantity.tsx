import { IonRow, IonCol, IonButton, IonIcon, IonBadge } from '@ionic/react';
import { Order, Product } from '../../models';
import { PopupModal } from '../popup-modal/PopupModal';
import './ProductQuanitity.css'
import { useEffect, useState } from 'react';
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { useCart, useDevice } from '../../hooks';

interface ProductQuanitityProps {
    isEdit?: boolean;
    state: boolean;
    setState: (state: boolean) => any;
    product: Product;
    order?: Order;
    onModalClose: () => any;
}

export const ProductQuanitity: React.FC<ProductQuanitityProps> = ({
    state,
    setState,
    product,
    onModalClose,
    isEdit,
    order,
}) => {
    const [quantity, setQuantity] = useState<number>(0);
    const { addToCart, updateCart } = useCart();
    const { user } = useDevice();

    useEffect(() => {
        if (order) {
            setQuantity(order.quantity);
        }
    }, [order])


    const udpateQuantity = (value: number) => {
        if (value < 0) return;

        if (product?.hasStock && value > product.stock) {
            setQuantity(product.stock);
            return;
        }

        setQuantity(value);
    }

    const addOrder = () => {
        const order: Order = {
            transaction_code: '',
            product: product,
            product_id: product?.id,
            branch_id: user.branch_id,
            quantity: quantity,
            price: product?.price,
            name: product?.name,
            status: 1,
            remarks: '',
        };

        addToCart(order);
        setState(false);
    }

    const updateCartOrder = () => {
        let orderQuantity: number = quantity;

        if (orderQuantity > product.stock) {
            orderQuantity = product.stock;
        }

        const order: Order = {
            transaction_code: '',
            product: product,
            product_id: product?.id,
            branch_id: user.branch_id,
            quantity: orderQuantity,
            price: product?.price,
            name: product?.name,
            status: 1,
            remarks: '',
        };

        updateCart(order);
        setState(false);
    }

    const oncClose = () => {
        setQuantity(0);
        onModalClose();
    }



    return (
        <PopupModal state={state} setState={setState} size='small' onModalClose={oncClose}>
            {
                product &&
                <div className='product-item form'>
                    <div className='product-details'>
                        <div className='product-name'>{product.name}</div>
                        <div>
                            <IonBadge color='primary'>{product.category.name}</IonBadge>
                            <IonBadge color='medium'>{product.sub_category.name}</IonBadge>
                        </div>
                        <div className='product-stock'>Stock: <span>{product.stock}</span></div>
                    </div>
                    <div className='quantity-form'>
                        <IonRow class="container ion-justify-content-center">
                            <IonCol class="ion-text-right" size="4">
                                <IonButton fill="clear" onClick={() => udpateQuantity(quantity - 1)}>
                                    <IonIcon size="large" icon={removeCircleOutline} />
                                </IonButton>
                            </IonCol>
                            <IonCol size="4"><input className="input-num" value={quantity}
                                onChange={(e: any) => setQuantity(e.target.value)}
                                type="number" /></IonCol>
                            <IonCol class="ion-text-left" size="4">
                                <IonButton fill="clear" onClick={() => udpateQuantity(quantity + 1)}>
                                    <IonIcon size="large" icon={addCircleOutline} />
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        {
                            !isEdit ?
                                <IonButton disabled={quantity === 0} size="large" expand="block" onClick={addOrder}>Add to
                                    Order</IonButton> :
                                <IonButton disabled={quantity === 0} size="large" expand="block" onClick={updateCartOrder}>Update
                                    Order</IonButton>
                        }
                    </div>
                </div>
            }
        </PopupModal>
    );
}