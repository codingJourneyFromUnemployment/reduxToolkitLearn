const createSlice = require('@reduxjs/toolkit').createSlice;

const _initialState = {
  numOfIcecreams: 20,
};

const iceCreamSlice = createSlice({
  name: 'icecream',
  initialState: _initialState,
  reducers: {
    ordered: (state, action) => {
      state.numOfIcecreams -= action.payload;
    },
    restocked: (state, action) => {
      state.numOfIcecreams += action.payload;
    }
  },
  extraReducers: {
    ['cake/ordered']: (state, action) => {
      state.numOfIcecreams -= action.payload;
    }
  }
});

module.exports = iceCreamSlice.reducer;
module.exports.iceCreamActions = iceCreamSlice.actions;