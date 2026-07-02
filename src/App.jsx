import { Route, Routes, BrowserRouter } from "react-router";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import DefaultLayout from "./layout/DefaultLayout";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route path="/" Component={TaskList} />
              <Route path="/add_task" Component={AddTask} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
