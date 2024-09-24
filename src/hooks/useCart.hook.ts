import { useCartStore } from "../store"

export const useCart = () => {
    const items = useCartStore(state => state.items);
    const addToCart = useCartStore(state => state.addToCart);
    const removeFromCart = useCartStore(state => state.removeFromCart);
    const updateCart = useCartStore(state => state.updateOrder);

    return {
        items,
        addToCart,
        removeFromCart,
        updateCart,
    };
}