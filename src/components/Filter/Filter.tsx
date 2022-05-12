import { selectedFiltersAtom } from 'atoms';
import { useSetAtom } from 'jotai';

import * as S from './style';

export const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

const Filter = () => {
  const filterProducts = useSetAtom(selectedFiltersAtom);

  return (
    <S.Container>
      <S.Title>Sizes:</S.Title>
      {availableSizes.map((label) => (
        <S.Checkbox label={label} handleOnChange={filterProducts} key={label} />
      ))}
    </S.Container>
  );
};

export default Filter;
