import "./App.css";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Lyrics from "./components/Lyrics";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={Container} />
          <Route exact path="/lyrics/track/:id" component={Lyrics} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
