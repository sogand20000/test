import React, { lazy, Suspense, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Editor, { Monaco } from "@monaco-editor/react";
import SplitPane from "react-split-pane";

function AppEdd() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    //@ts-ignore
    alert(editorRef.current.getValue());
    console.log(editorRef.current);
  }

  return (
    <>
      <button onClick={showValue}>Show value</button>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="console.log('Hello, world!');"
        onMount={handleEditorDidMount}
      />
    </>
  );
}

const About = lazy(() => import("./About"));
const Home = lazy(() => import("./Home"));

const App: React.FC = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <AppEdd />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <SplitPane split="vertical" minSize={50}>
            <Home />
            <SplitPane split="horizontal">
              <Home />
              <Home />
            </SplitPane>
          </SplitPane>
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

export default App;
