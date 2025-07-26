const JsOverview = () => {
  // JavaScript এ
  function greet(name) {
    return "Hello " + name.toUpperCase();
  }

  greet(123); // Runtime error!

  return <div>JsOverview</div>;
};

export default JsOverview;
