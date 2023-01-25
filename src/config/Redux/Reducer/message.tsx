const initialStateMessage = {
  message: '',
  isLoading: false,
  type: 'error',
};

export const messageReducer = (state = initialStateMessage, action: any) => {
  if (action.type == 'SET_ERROR') {
    return {
      ...state,
      type: action.value.type,
      message: action.value.message,
    };
  }

  if (action.type == 'SET_LOADING') {
    return {
      ...state,
      isLoading: action.value,
    };
  }
  return state;
};
