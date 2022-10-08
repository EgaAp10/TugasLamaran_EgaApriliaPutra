import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://61601920faa03600179fb8d2.mockapi.io/pegawai");
  const users = await response.json();
  return users.slice(11, users.length);
});
export const updateUsers = createAsyncThunk(
  "users/updateUsers",
  async (data) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      "https://61601920faa03600179fb8d2.mockapi.io/pegawai/%7Bid%7D" + data.id,
      requestOptions
    );
    const users = await response.json();
    return users;
  }
);

export const addUsers = createAsyncThunk("users/addUsers", async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    "https://61601920faa03600179fb8d2.mockapi.io/pegawai",
    requestOptions
  );
  const users = await response.json();
  return users;
});
const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    userAdded(state, action) {
      addUsers(action.payload);
      state.entities.push(action.payload);
    },
    userUpdated(state, action) {
      const { id, nama } = action.payload;
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        existingUser.nama = nama;
        
      }
    },
    userDeleted(state, action) {
      const { id } = action.payload;
      fetch("https://61601920faa03600179fb8d2.mockapi.io/pegawai/%7Bid%7D" + id, {
        method: "DELETE",
      }).then(() => console.log("Berhasil"));
      state.entities = state.entities.filter((user) => user.id !== id);
    },
  },
  extraReducers: {
    [addUsers.fulfilled]: (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload);
    },
    [updateUsers.fulfilled]: (state, action) => {
      console.log("dadasdasdasdas");
      console.log(action.payload);
      console.log(state);
      const { id } = action.payload;
      // // Add user to the state array
      state.entities = state.entities.filter((user) => user.id !== id);
      state.entities.push(action.payload);
    },
    [fetchUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { userAdded, userUpdated, userDeleted } = usersSlice.actions;

export default usersSlice.reducer;
