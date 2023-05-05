const initialStateLogin = {
  userList: [],
  isLogin: null,
  existedUser: null,
};
// user={
//     name: string
//     email: String
//     pass: String
//     phone: string
//     active: false
// }
const loginReducer = (state = initialStateLogin, action) => {
  switch (action.type) {
    case "ON_LOGIN":
      const updatedUserList = state.userList.map((user) => {
        if (user.email === action.payload.email) {
          user.active = true;
        }
        return user;
      });
      return {
        userList: [...updatedUserList],
        isLogin: true,
        existedUser: null,
      };

    case "ON_LOGOUT":
      const refeshUserList = state.userList.map((user) => {
        user.active = false;
        return user;
      });
      return {
        userList: [...refeshUserList],
        isLogin: false,
        existedUser: null,
      };

    case "CHECK_EXISTED_USER":
      const index = state.userList.find(
        (user) => user.email === action.payload.email
      );
      if (!index) {
        // console.log("CHECK INDEX !existed: ", !index);
        return {
          userList: [...state.userList],
          isLogin: null,
          existedUser: false,
        };
      } else {
        // console.log("CHECK INDEX existed: ", index);
        return {
          userList: [...state.userList],
          isLogin: null,
          existedUser: true,
        };
      }
    case "ADD_NEW_USER":
      return {
        userList: [...state.userList, action.payload],
        isLogin: null,
        existedUser: null,
      };
    default:
      return state;
  }
};

export default loginReducer;
