import { isOpenAtom } from './misc';
import { IProduct, ICartProduct } from './../models';
import { atom } from 'jotai';
import { getProducts } from 'services/products';

type GetProducts = typeof getProducts;

export interface Result {
  loading: boolean;
  error: unknown | null;
  data: IProduct[] | null;
}

export const cartProductsAtom = atom<readonly ICartProduct[]>([]);

export const cartQuantityAtom = atom((get) =>
  get(cartProductsAtom).reduce((acc, product: ICartProduct) => {
    acc += product.quantity;
    return acc;
  }, 0)
);

export const addProductToCartAtom = atom(
  null,
  (_get, set, update: ICartProduct) => {
    set(cartProductsAtom, (prev) => {
      if (!prev.some((product) => update.id === product.id)) {
        return [...prev, { ...update, quantity: 1 }];
      }

      return prev.map((p) => {
        if (p.id !== update.id) return p;
        return { ...p, quantity: (p.quantity += 1) };
      });
    });
    set(isOpenAtom, true);
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
