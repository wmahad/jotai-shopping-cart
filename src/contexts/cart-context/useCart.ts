import useCartProducts from './useCartProducts';
import useCartTotal from './useCartTotal';

const useCart = () => {
  const { products, removeProduct, decreaseProductQuantity } =
    useCartProducts();
  const { total, updateCartTotal } = useCartTotal();

  return {
    products,
    removeProduct,
    decreaseProductQuantity,
    total,
    updateCartTotal,
  };
};

export default useCart;
