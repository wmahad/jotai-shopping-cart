import Loader from 'components/Loader';
import Filter from 'components/Filter';
import Products from 'components/Products';
import Cart from 'components/Cart';

import * as S from './style';
import { useAtomValue } from 'jotai';
import { fetchProductsAtom } from 'atoms';

function App() {
  const { loading } = useAtomValue(fetchProductsAtom);

  return (
    <S.Container>
      {loading && <Loader />}
      <S.TwoColumnGrid>
        <S.Side>
          <Filter />
        </S.Side>
        <S.Main>
          <Products />
        </S.Main>
      </S.TwoColumnGrid>
      <Cart />
    </S.Container>
  );
}

export default App;
