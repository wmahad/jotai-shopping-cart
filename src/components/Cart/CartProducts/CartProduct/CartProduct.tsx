import formatPrice from 'utils/formatPrice';

import * as S from './style';
import { useSetAtom, useAtom } from 'jotai';
import { removeProductFromCartAtom, CartProductAtom } from 'atoms';

interface IProps {
  item: CartProductAtom;
}
const CartProduct = ({ item }: IProps) => {
  const [product, setProduct] = useAtom(item);
  const {
    sku,
    title,
    price,
    style,
    currencyId,
    currencyFormat,
    availableSizes,
    quantity,
  } = product;

  const removeProduct = useSetAtom(removeProductFromCartAtom);

  const handleRemoveProduct = () => removeProduct(item);
  const handleIncreaseProductQuantity = () => {
    setProduct((p) => ({ ...p, quantity: (p.quantity += 1) }));
  };
  const handleDecreaseProductQuantity = () => {
    setProduct((p) => ({ ...p, quantity: (p.quantity -= 1) }));
  };

  return (
    <S.Container>
      <S.DeleteButton
        onClick={handleRemoveProduct}
        title="remove product from cart"
      />
      <S.Image
        src={require(`static/products/${sku}-1-cart.webp`)}
        alt={title}
      />
      <S.Details>
        <S.Title>{title}</S.Title>
        <S.Desc>
          {`${availableSizes[0]} | ${style}`} <br />
          Quantity: {quantity}
        </S.Desc>
      </S.Details>
      <S.Price>
        <p>{`${currencyFormat}  ${formatPrice(price, currencyId)}`}</p>
        <div>
          <S.ChangeQuantity
            onClick={handleDecreaseProductQuantity}
            disabled={quantity === 1 ? true : false}
          >
            -
          </S.ChangeQuantity>
          <S.ChangeQuantity onClick={handleIncreaseProductQuantity}>
            +
          </S.ChangeQuantity>
        </div>
      </S.Price>
    </S.Container>
  );
};

export default CartProduct;
