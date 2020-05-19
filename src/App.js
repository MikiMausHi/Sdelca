import React from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import Nav from "./containers/Nav/Nav";
import AcceptOrder from "./containers/ExpertInterface/AcceptOrder/AcceptOrder";
import ExecuteOrder from "./containers/ExpertInterface/ExecuteOrder/ExecuteOrder";
import ClientInterface from "./containers/ClientInterface/ClientInterface";
import ExpertInterface from "./containers/ExpertInterface/ExpertInterface";
import NewDeal from "./containers/ClientInterface/NewDeal";
import Confirm from "./containers/ClientInterface/confirm";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Nav} />
        <Route path="/client/:listType" exact component={ClientInterface} />
        <Route path="/newDeal" exact component={NewDeal} />
        <Route path="/confirm/:id" exact component={Confirm} />
        <Route path="/expert/:listType" component={ExpertInterface} />
        <Route path="/accept-order/:id" component={AcceptOrder} />
        <Route path="/execute-order/:id" component={ExecuteOrder} />
      </Switch>
    </div>
  );
}

export default App;
