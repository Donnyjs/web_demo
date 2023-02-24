import { StateCreator } from 'zustand';

export interface UserSlice {
  address: `0x${string}`;
  setAddress: (val: `0x${string}`) => void;
}

export const createUserSlice: StateCreator<
  UserSlice,
  [['zustand/immer', never]],
  [],
  UserSlice
> = (set) => ({
  address: '0x',

  setAddress: (val) =>
    set((state) => {
      state.address = val;
    }),
});
