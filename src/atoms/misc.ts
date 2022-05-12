import { WritableAtom, atom } from 'jotai';

export function atomWithToggle(
  initialValue?: boolean
): WritableAtom<boolean, boolean | undefined> {
  const anAtom = atom(initialValue, (get, set, nextValue?: boolean) => {
    const update = nextValue ?? !get(anAtom);
    set(anAtom, update);
  });

  return anAtom as WritableAtom<boolean, boolean | undefined>;
}

export const isOpenAtom = atomWithToggle(false);

export const filtersAtom = atom<string[]>([]);

export const selectedFiltersAtom = atom(null, (get, set, filter: string) => {
  set(filtersAtom, (prev) => {
    if (prev.includes(filter)) return prev.filter((p) => p !== filter);
    return [...prev, filter];
  });
});
