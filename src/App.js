import React, { memo } from "react";
import Contents from "./components/Contents";
import { Provider } from "react-redux";
import store from "./store/index";
import "./App.css";
const App = memo(() => {
  return (
    <div>
      <Provider store={store}>
        <Contents />
      </Provider>
    </div>
  );
});

export default App;
