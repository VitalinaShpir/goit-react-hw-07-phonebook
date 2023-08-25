export const handlePending = state => {
    state.isLoading = true;
  };
  
  export const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  };
  
  export const handleGetAllContactsFulfilled = (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.items = action.payload;
  };
  
  export const handleAddContactFulfilled = (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.items.push(action.payload);
  };
  
  export const handleDeleteContactFulfilled = (state, action) => {
    state.isLoading = false;
    state.error = null;
    const index = state.items.findIndex(item => item.id === action.payload.id);
    state.items.splice(index, 1);
  };