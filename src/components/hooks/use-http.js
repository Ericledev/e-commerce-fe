import { useReducer, useCallback } from "react";

const reducerHTTP = (state, action) => {
  if (action.type === "SEND") {
    return {
      data: null,
      status: "pending",
      error: null,
    };
  }
  if (action.type === "SUCCESS") {
    return {
      data: action.resData,
      status: "completed",
      error: null,
    };
  }
  if (action.type === "ERROR") {
    return {
      data: null,
      status: "completed",
      error: action.errorMessage,
    };
  }
  return state;
};

const useHTTP = (requestFunction, startWithPending = false) => {
  const [httpState, dispatch] = useReducer(reducerHTTP, {
    data: null,
    status: startWithPending ? "PENDING" : null,
    error: null,
  });

  const sendRequest = useCallback(
    async (reqData) => {
      dispatch({ type: "SEND" });
      try {
        const res = await requestFunction(reqData);
        dispatch({ type: "SUCCESS", resData: res });
      } catch (error) {
        dispatch({ type: "ERROR", errorMessage: error });
      }
    },
    [requestFunction]
  );

  return { sendRequest, ...httpState };
};

export default useHTTP;
