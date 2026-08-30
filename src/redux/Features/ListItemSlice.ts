import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type{ PayloadAction } from "@reduxjs/toolkit";

export interface ListItem {
  title: string;
  category: string;
  notes?: string;
  Quantity: string;
  image?: string;
  id?: number;
  listId: string;
}

interface ListItemState {
  items: ListItem[];
  loading: boolean;
  error: string | null;
  isListModalOpen: boolean;
  editingList: ListItem | null;
}

const initialState: ListItemState = {
  items: [],
  loading: false,
  error: null,
  isListModalOpen: false,
  editingList: null,
};

// FETCH ITEMS FOR ONE LIST
export const fetchListItems = createAsyncThunk(
  "items/fetchListItems",
  async (listId: string,{ rejectWithValue }) => {
    try {
      const response = await fetch( `http://localhost:3000/itemList?listId=${listId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch list items");
      }

      const data: ListItem[] = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  }
);

export const addListItem = createAsyncThunk("items/addListItem",
  async (newItemData: Omit<ListItem, "id">,{ rejectWithValue }) => {
    try {
    
      const response = await fetch( "http://localhost:3000/itemList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItemData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      const data: ListItem = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Something went wrong");
    }
  }
);

export const deleteListItem = createAsyncThunk(
  "items/deleteListItem",
  async (itemId: number | string, { rejectWithValue }) => {
    try {
      const response = await fetch( `http://localhost:3000/itemList/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      return itemId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Something went wrong");
    }
  }
);

export const updateListItem = createAsyncThunk(
  "items/updateListItem",
  async (
    updatedItem: ListItem,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/itemList/${updatedItem.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const data: ListItem = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  }
);

const itemSlice = createSlice({
  name: "items",
  initialState,

  reducers: {
      openListModal: (state) => {
      state.isListModalOpen = true;
    },
    closeListModal: (state) => {
      state.isListModalOpen = false;
    },
    setListModal: (state, action: PayloadAction<boolean>) => {
      state.isListModalOpen = action.payload;
    },
      startEditList: (state, action: PayloadAction<ListItem>) => {
      state.editingList =action.payload;
      state.isListModalOpen = true; 
    },
    clearEditList: (state) => {
      state.editingList = null;
      state.isListModalOpen =false;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchListItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchListItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchListItems.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch list items";
      })

      // ADD
      .addCase(addListItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addListItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })

      .addCase(addListItem.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to add item";
      })

      

            .addCase(deleteListItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        })

        .addCase(deleteListItem.fulfilled, (state, action) => {
        state.loading = false;

        state.items = state.items.filter(
            (item) => item.id !== action.payload
        )
        })

        .addCase(deleteListItem.rejected, (state, action) => {
        state.loading = false;
        state.error =
            typeof action.payload === "string"
            ? action.payload
            : "Failed to delete item";
        })

        // UPDATE
        .addCase(updateListItem.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        .addCase(updateListItem.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.items.findIndex((item) => item.id === action.payload.id);

          if (index !== -1) {
            state.items[index] = action.payload;
          }

          state.editingList = null;
          state.isListModalOpen = false;
        })

        .addCase(updateListItem.rejected, (state, action) => {
          state.loading = false;
          state.error =
            typeof action.payload === "string" ? action.payload : "Failed to update item";
        })
        },
        });

        export const { openListModal, closeListModal, setListModal,  clearEditList, startEditList,  } = itemSlice.actions;
        export default itemSlice.reducer;