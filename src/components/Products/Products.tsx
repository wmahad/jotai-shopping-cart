import Product from './Product';
import { useAtomValue } from 'jotai';
import { productsAtom } from 'atoms';
import * as S from './style';

const Products = () => {
  const products = useAtomValue(productsAtom);

  return (
    <>
      <S.MainHeader>
        <p>{products?.length} Product(s) found</p>
      </S.MainHeader>
      <S.Container>
        {products?.map((p) => (
          <Product product={p} key={p.sku} />
        ))}
      </S.Container>
    </>
  );
};

export default Products;
