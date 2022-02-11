import { combineReducers } from "redux";

import { reducer as componentsReducer } from "../components/store/index";
//合并
const reducer = combineReducers({
  components: componentsReducer,
});

export default reducer;
