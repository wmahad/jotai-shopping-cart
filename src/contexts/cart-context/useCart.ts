import { useCartContext } from './CartContextProvider';
import useCartTotal from './useCartTotal';

const useCart = () => {
  const { products } = useCartContext();
  const { total, updateCartTotal } = useCartTotal();

  return {
    products,
    total,
    updateCartTotal,
  };
};

export default useCart;
