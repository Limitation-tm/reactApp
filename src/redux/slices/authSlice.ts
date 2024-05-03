import axios from "../../axios";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Status } from "./listSlice";

type TFetchUserDataArgs = {
  fullName?: string;
  email: string;
  password: string;
};

export type TDataUser = {
  _id: string;
  fullName: string;
  email: string;
  role: "User" | "Admin";
  avatarUrl: string;
  token?: string;
};

interface IAuthSlice {
  data: TDataUser | null;
  status: Status;
}

type TFetchData = {};

export const fetchUserRegister = createAsyncThunk(
  "auth/fetchUserRegisterStatus",
  async (params: TFetchUserDataArgs) => {
    const { data } = await axios.post("/auth/register", params);
    console.log("DATA", data);
    return data;
  }
);

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserDataStatus",
  async (params: TFetchUserDataArgs) => {
    const { data } = await axios.post("/auth/login", params); // params - login, password
    return data;
  }
);

export const fetchUserMyData = createAsyncThunk(
  "auth/fetchUserMyDataStatus",
  async () => {
    const { data } = await axios.get("/auth/me");
    console.log(data);
    return data;
  }
);

const initialState: IAuthSlice = {
  data: null,
  status: Status.LOADING,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = Status.LOADING;
        state.data = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.status = Status.ERROR;
        state.data = null;
      })
      .addCase(fetchUserMyData.pending, (state) => {
        state.status = Status.LOADING;
        state.data = null;
      })
      .addCase(fetchUserMyData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchUserMyData.rejected, (state) => {
        state.status = Status.ERROR;
        state.data = null;
      })
      .addCase(fetchUserRegister.pending, (state) => {
        state.status = Status.LOADING;
        state.data = null;
      })
      .addCase(
        fetchUserRegister.fulfilled,
        (state, action: PayloadAction<TDataUser>) => {
          state.data = action.payload;
          state.status = Status.SUCCESS;
        }
      )
      .addCase(fetchUserRegister.rejected, (state) => {
        state.status = Status.ERROR;
        state.data = null;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);

export default authSlice.reducer;
