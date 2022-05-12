import formatPrice from 'utils/formatPrice';
import CartProducts from './CartProducts';

import * as S from './style';
import { useAtom, useAtomValue } from 'jotai';
import { cartStatsAtom, isOpenAtom } from 'atoms';
import { currencyFormat, currencyId } from 'models';

const Cart = () => {
  const [isOpen, toggle] = useAtom(isOpenAtom);
  const { quantity, price, installments } = useAtomValue(cartStatsAtom);

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

  const handleToggleCart = () => toggle();

  return (
    <S.Container isOpen={isOpen}>
      <S.CartButton onClick={handleToggleCart}>
        {isOpen ? (
          <span>X</span>
        ) : (
          <S.CartIcon>
            <S.CartQuantity title="Products in cart quantity">
              {quantity}
            </S.CartQuantity>
          </S.CartIcon>
        )}
      </S.CartButton>

      {isOpen && (
        <S.CartContent>
          <S.CartContentHeader>
            <S.CartIcon large>
              <S.CartQuantity>{quantity}</S.CartQuantity>
            </S.CartIcon>
            <S.HeaderTitle>Cart</S.HeaderTitle>
          </S.CartContentHeader>

          <CartProducts />

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
        </S.CartContent>
      )}
    </S.Container>
  );
};

export default Cart;
