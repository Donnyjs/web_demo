import { create } from 'zustand';
import {
  devtools,
  persist,
  createJSONStorage,
  subscribeWithSelector,
} from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createUserSlice, UserSlice } from './userSlice';
import { createMenuSlice, MenuSlice } from './menuSlice';

// type Store = MenuSlice;
// export const useStore = create<Store>()(
//   immer(
//     devtools((...a) => ({
//       ...createMenuSlice(...a),
//     })),
//   ),
// );

type PersistStore = UserSlice & MenuSlice;
export const usePersistStore = create<PersistStore>()(
  subscribeWithSelector(
    immer(
      devtools(
        persist(
          (...a) => ({
            ...createUserSlice(...a),
            ...createMenuSlice(...a),
          }),
          {
            name: '@web3-game-spike-demo-store',
            storage: createJSONStorage(() => window.localStorage),
          },
        ),
      ),
    ),
  ),
);
