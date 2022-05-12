import { isOpenAtom } from './misc';
import { IProduct, ICartProduct } from './../models';
import { PrimitiveAtom, atom } from 'jotai';
import { getProducts } from 'services/products';

type GetProducts = typeof getProducts;

export interface Result {
  loading: boolean;
  error: unknown | null;
  data: IProduct[] | null;
}

export type CartProductAtom = PrimitiveAtom<ICartProduct>;

export const cartProductsAtom = atom<CartProductAtom[]>([]);

export const addProductToCartAtom = atom(null, (get, set, value: IProduct) => {
  const productAtom = get(cartProductsAtom).find((p) =>
    get<IProduct>(p).id === value.id ? p : null
  );
  if (!productAtom) {
    set(cartProductsAtom, (prev) => [...prev, atom({ ...value, quantity: 1 })]);
  } else {
    set(productAtom, (p) => ({ ...p, quantity: (p.quantity += 1) }));
  }
  set(isOpenAtom, true);
});

export const quantityAtom = atom((get) => {
  return get(cartProductsAtom).reduce((acc, p) => {
    acc += get(p).quantity;
    return acc;
  }, 0);
});

export const cartStatsAtom = atom((get) => {
  return get(cartProductsAtom).reduce(
    (acc, p) => {
      const product = get(p);
      // calculate price
      acc.price += product.price * product.quantity;
      // calculate installments
      acc.installments =
        product.installments > acc.installments
          ? product.installments
          : acc.installments;
      return acc;
    },
    { price: 0, installments: 0 }
  );
});

export const removeProductFromCartAtom = atom(
  null,
  (_get, set, update: CartProductAtom) => {
    set(cartProductsAtom, (prev) => prev.filter((p) => p !== update));
  }
);

const resultAtom = atom<Result>({ loading: true, error: null, data: null });

export const fetchProductsAtom = atom(
  (get) => get(resultAtom),
  (_get, set, callback: GetProducts) => {
    const fetchData = async () => {
      set(resultAtom, (prev) => ({ ...prev, loading: true }));
      try {
        const data = await callback();
        set(resultAtom, { loading: false, error: null, data });
      } catch (error) {
        set(resultAtom, { loading: false, error, data: null });
      }
    };
    fetchData();
  }
);

fetchProductsAtom.onMount = (fetchProducts) => {
  fetchProducts(getProducts);
};
