import axios from "../../axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICartItem } from "./cartSlice";
import { TPostsAdmin } from "../../pages/ProductsPanel";

type TFetchBurgersArgs = {
  sortProp: string;
  orderProp: boolean;
  categoryProp: string;
  searchProp: string;
  currentPage: number;
};

type TFetchAdminPostsArgs = {
  delivery?: string;
  currentPage: number;
};

export const fetchBurgers = createAsyncThunk(
  "list/fetchBurgersStatus",
  async (params: TFetchBurgersArgs) => {
    const { sortProp, orderProp, categoryProp, searchProp, currentPage } =
      params;
    const { data } = await axios.get<IPayload>(
      `/products?page=${currentPage}&limit=12${categoryProp}&sort=${sortProp},${
        orderProp ? "desc" : "asc"
      }${searchProp}`
    );

    console.log(currentPage);
    return data;
  }
);
export const fetchUserPosts = createAsyncThunk(
  "list/fetchUserPostsStatus",
  async () => {
    const { data } = await axios.get<TPostsAdmin>("/userposts");
    return data;
  }
);

export const fetchAdminPosts = createAsyncThunk(
  "list/fetchAdminPostsStatus",
  async (params: TFetchAdminPostsArgs) => {
    const { delivery, currentPage } = params;
    const { data } = await axios.get<TPostsAdmin>(
      `/posts/${delivery}?page=${currentPage}&limit=10`
    );
    return data;
  }
);

export type TUser = {
  _id: string;
  fullName: string;
  avatarUrl: string;
};

export interface IProdItem {
  _id: string;
  title: string;
  text: string;
  typeListId: string[];
  sizeList: string[];
  price: number;
  category: number;
  rating: number;
  viewsCount: number;
  user: TUser;
  imageUrl: string;
}

export interface IPostItem {
  _id: string;
  viewsCount: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  user: TUser;
  products: ICartItem[];
  delivery?: TUser;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface IProducts {
  items: IProdItem[];
  status: Status;
  total: number;
}

export interface IPosts {
  items: IPostItem[];
  status: Status;
  total: number;
}

interface IListSlice {
  products: IProducts;
  posts: IPosts;
}

interface IPayload {
  products: IProdItem[];
  total: number;
}

const initialState: IListSlice = {
  products: { items: [], status: Status.LOADING, total: 0 },
  posts: { items: [], status: Status.LOADING, total: 1 },
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IProdItem[]>) {
      state.products.items = action.payload;
    },
    setPosts(state) {
      state.posts.items = [];
      state.posts.total = 1;
    },
    setTotalPosts(state, action) {
      state.posts.total = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurgers.pending, (state) => {
        state.products.status = Status.LOADING;
        state.products.items = [];
        state.products.total = 0;
      })
      .addCase(
        fetchBurgers.fulfilled,
        (state, action: PayloadAction<IPayload>) => {
          state.products.items = action.payload.products;
          state.products.total = action.payload.total;
          state.products.status = Status.SUCCESS;
        }
      )
      .addCase(fetchBurgers.rejected, (state) => {
        state.products.status = Status.ERROR;
        state.products.items = [];
        state.products.total = 0;
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.posts.status = Status.LOADING;
        state.posts.items = [];
        state.posts.total = 0;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload.items;
        state.posts.status = Status.SUCCESS;
        state.posts.total = action.payload.total;
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.posts.status = Status.ERROR;
        state.posts.items = [];
        state.posts.total = 0;
      })
      .addCase(fetchAdminPosts.pending, (state) => {
        state.posts.status = Status.LOADING;
      })
      .addCase(fetchAdminPosts.fulfilled, (state, action) => {
        state.posts.items.push(...action.payload.items);
        state.posts.status = Status.SUCCESS;
        state.posts.total = action.payload.total;
      })
      .addCase(fetchAdminPosts.rejected, (state) => {
        state.posts.status = Status.ERROR;
        state.posts.items = [];
        state.posts.total = 0;
      });
  },
});

export const { setItems, setPosts, setTotalPosts } = listSlice.actions;
export default listSlice.reducer;
