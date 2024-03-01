import { createStore } from "redux";

const initialSate = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialSate, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

store.dispatch({ type: "account/deposit", payload: 100 });
console.log(store.getState());
store.dispatch({ type: "account/withdraw", payload: 50 });
console.log(store.getState());
store.dispatch({
  type: "account/requestLoan",
  payload: {
    amount: 500,
    purpose: "Home Improvement",
  },
});
console.log(store.getState());

store.dispatch({ type: "account/payLoan" });
console.log(store.getState());
