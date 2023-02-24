import { StateCreator } from 'zustand';

interface MenuState {
  isCollapse: boolean;
  menuList: Menu.MenuOptions[];
}

export interface MenuSlice extends MenuState {
  updateCollapse: (val: MenuState['isCollapse']) => void;
  setMenuList: (val: MenuState['menuList']) => void;
}

export const createMenuSlice: StateCreator<
  MenuSlice,
  [['zustand/immer', never]],
  [],
  MenuSlice
> = (set) => ({
  isCollapse: false,
  menuList: [],

  updateCollapse: (val) =>
    set((state) => {
      state.isCollapse = val;
    }),

  setMenuList: (val) =>
    set((state) => {
      state.menuList = val;
    }),
});
