const initialStateChat = {
  chatRoom: null,
};

const chatReducer = (state = initialStateChat, action) => {
  //   const { total, listCart } = state;
  //   console.log("CHECK listCart in action: ", action);
  switch (action.type) {
    case "GET_ROOM":
      return {
        chatRoom: { ...action.payload },
      };
    default:
      return state;
  }
};

export default chatReducer;
