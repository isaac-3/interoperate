import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  modalDisplay: boolean;
  modalType: string;
  modalProps: unknown;
}

const initialState = {
  modalDisplay: false,
  modalType: "",
  modalProps: null,
} as ModalState;

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalDisplay: (state) => {
      state["modalDisplay"] = !state["modalDisplay"];
    },
    setModalType: (state, action: PayloadAction<string>) => {
      state["modalType"] = action.payload;
    },
    setModalProps: (state, action: PayloadAction<unknown>) => {
      state["modalProps"] = action.payload;
    },
    resetModal: (state) => {
      state["modalDisplay"] = false;
      state["modalType"] = "";
      state["modalProps"] = null;
    },
  },
});

export const {
  setModalDisplay,
  setModalType,
  setModalProps,
  resetModal,
} = modalSlice.actions;

export default modalSlice.reducer;
