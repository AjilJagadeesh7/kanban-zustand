import { StoreApi, create } from "zustand";

interface boardAddModalStoreState {
  show: boolean;
  toggleModal: () => void;
}
type BoardModalStoreApi = StoreApi<boardAddModalStoreState>;
const boardAddModalStore = (
  set: BoardModalStoreApi["setState"]
): boardAddModalStoreState => ({
  show: false,
  toggleModal: () =>
    set((store) => {
      return { show: !store.show };
    }),
});
export const useBoardAddModalStore = create(boardAddModalStore);
