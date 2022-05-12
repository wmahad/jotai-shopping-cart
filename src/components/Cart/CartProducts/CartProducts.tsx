import { cartProductsAtom } from 'atoms';
import { useAtomValue } from 'jotai';
import CartProduct from './CartProduct';

import * as S from './style';

const CartProducts = () => {
  const products = useAtomValue(cartProductsAtom);

  return (
    <S.Container>
      {products?.length ? (
        products.map((p) => <CartProduct product={p} key={p.sku} />)
      ) : (
        <S.CartProductsEmpty>
          Add some products in the cart <br />
          :)
        </S.CartProductsEmpty>
      )}
    </S.Container>
  );
};

export default CartProducts;
