import Button from "./components/atoms/Button";

// import JsOverview from "./components/JsOverview.jsx";
function App() {
  const integer: number = 42;
  console.log("🚀 ~ App ~ integer:", integer);

  return (
    <>
      <div>
        <h1>React Typescript</h1>
        {/* <JsOverview /> */}
        <Button variant="primary" size="large">
          Button Primary
        </Button>
      </div>
    </>
  );
}

export default App;
