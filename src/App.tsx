import Button from "./components/atoms/Button";
import TodosPage from "./pages/TodosPage";

// import JsOverview from "./components/JsOverview.jsx";


function App() {

  return (
    <>
      <div>
        <h1>React Typescript</h1>
        {/* <JsOverview /> */}
        <TodosPage />
        <Button variant="primary" size="large">
          Button Primary
        </Button>
      </div>
    </>
  );
}

export default App;
