import formatPrice from 'utils/formatPrice';
import CartProducts from './CartProducts';

import * as S from './style';
import { useAtom, useAtomValue } from 'jotai';
import { cartStatsAtom, isOpenAtom, quantityAtom } from 'atoms';
import { currencyFormat, currencyId } from 'models';

function CartIcon({ large, title }: { large?: boolean; title?: string }) {
  const quantity = useAtomValue(quantityAtom);

  return (
    <S.CartIcon large={large}>
      <S.CartQuantity title={title}>{quantity}</S.CartQuantity>
    </S.CartIcon>
  );
}

function CartHeader() {
  return (
    <S.CartContentHeader>
      <CartIcon large />
      <S.HeaderTitle>Cart</S.HeaderTitle>
    </S.CartContentHeader>
  );
}

function CartFooter() {
  const quantity = useAtomValue(quantityAtom);
  const { price, installments } = useAtomValue(cartStatsAtom);

  const handleCheckout = () => {
    if (quantity) {
      alert(
        `Checkout - Subtotal: ${currencyFormat} ${formatPrice(
          price,
          currencyId
        )}`
      );
    } else {
      alert('Add some product in the cart!');
    }
  };

  return (
    <S.CartFooter>
      <S.Sub>SUBTOTAL</S.Sub>
      <S.SubPrice>
        <S.SubPriceValue>{`${currencyFormat} ${formatPrice(
          price,
          currencyId
        )}`}</S.SubPriceValue>
        <S.SubPriceInstallment>
          {installments && (
            <span>
              {`OR UP TO ${installments} x ${currencyFormat} ${formatPrice(
                price / installments,
                currencyId
              )}`}
            </span>
          )}
        </S.SubPriceInstallment>
      </S.SubPrice>
      <S.CheckoutButton onClick={handleCheckout} autoFocus>
        Checkout
      </S.CheckoutButton>
    </S.CartFooter>
  );
}

const Cart = () => {
  const [isOpen, toggle] = useAtom(isOpenAtom);
  const handleToggleCart = () => toggle();

  return (
    <S.Container isOpen={isOpen}>
      <S.CartButton onClick={handleToggleCart}>
        {isOpen ? (
          <span>X</span>
        ) : (
          <CartIcon title="Products in cart quantity" />
        )}
      </S.CartButton>

      {isOpen && (
        <S.CartContent>
          <CartHeader />
          <CartProducts />
          <CartFooter />
        </S.CartContent>
      )}
    </S.Container>
  );
};

export default Cart;
