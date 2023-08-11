const createSlice = require('@reduxjs/toolkit').createSlice;
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk;
const axios = require('axios');
// loading用于组件渲染loading状态，user用于存储用户数据，error用于获取数据失败时的错误信息
const _initialState = {
  loading: false,
  user: [],
  error: '',
};
// createAsyncThunk模块用于处理异步请求，第一个参数为action的type，第二个参数为异步请求的回调函数，这里是在定义派发action时的回调函数
const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  const userIDs = response.data.map(user => user.id);
  return userIDs;
});
// createSlice模块用于创建reducer，第一个参数为reducer的名称，第二个参数为reducer的初始状态，第三个参数为reducer的回调函数。builder.addCase用于处理action,在不同的action.type下执行不同的回调函数来更新state
const userSlice = createSlice({
  name: 'user',
  initialState: _initialState,
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  }
});
// 导出reducer和action
module.exports = userSlice.reducer;
module.exports.fetchUser = fetchUser;