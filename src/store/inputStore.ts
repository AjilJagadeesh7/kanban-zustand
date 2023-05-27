import { StoreApi, create } from "zustand";

interface InputModalStoreState {
  show: boolean;
  state: string;
  toggleModal: () => void;
  selectState: (state: string) => void;
}
type InputModalStoreApi = StoreApi<InputModalStoreState>;
const inputModalStore = (
  set: InputModalStoreApi["setState"]
): InputModalStoreState => ({
  show: false,
  state: "PLANNED",
  toggleModal: () =>
    set((store) => {
      return { show: !store.show };
    }),
  selectState: (state) => set(() => ({ state: state })),
});
export const useInputModalStore = create(inputModalStore);
