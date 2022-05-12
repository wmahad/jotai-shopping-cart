import { IProduct } from './../models/index';
import { atom } from 'jotai';
import { getProducts } from 'services/products';

type GetProducts = typeof getProducts;

export interface Result {
  loading: boolean;
  error: unknown | null;
  data: IProduct[] | null;
}

export const productsAtom = atom([]);

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
