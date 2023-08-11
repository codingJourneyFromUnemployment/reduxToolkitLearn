const createSlice = require('@reduxjs/toolkit').createSlice;

const _initialState = {
  numOfCakes: 10,
};

const cakeSlice = createSlice({
  name: 'cake',
  initialState: _initialState,
  reducers: {
    ordered: (state, action) => {
      state.numOfCakes -= action.payload;
    },
    restocked: (state, action) => {
      state.numOfCakes += action.payload;
    }
  },
});

module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;