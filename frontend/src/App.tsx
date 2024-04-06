import { Provider } from "react-redux";
import { store } from "./app/store";
import { TodoList } from "./components/TodoList";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
