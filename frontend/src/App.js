import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import FileDetail from "./pages/FileDetail";
import FileList from "./pages/FileList";
import FileUpload from "./pages/FileUpload";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/:fileId" component={FileDetail} />
          <Route path="/">
            <FileList />
          </Route>
          <Route path="/upload">
            <FileUpload />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

