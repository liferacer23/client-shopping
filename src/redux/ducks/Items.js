export const GET_ITEMS = "GET_ITEMS";
const SET_ITEMS = "SET_ITEMS";


export const getItems = () => ({
  type: GET_ITEMS,
});
export const setItems = (items) => ({
  type: SET_ITEMS,
  items: items,
});



const initialState = {
  items: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      const { items } = action;
      return { ...state, items: items };

    default:
      return state;
  }
};
