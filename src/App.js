import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AddUser } from "./features/users/AddUser";
import { EditUser } from "./features/users/EditUser";
import React from "react";
import { UserList } from "./features/users/UserList";
import Header from "./komponen/header";

export default function App() {
  return (
    <Router>
      <Header />
      <div>
        <Switch>
          <Route path="/add-user">
            <AddUser />
          </Route>
          <Route path="/edit-user">
            <EditUser />
          </Route>
          <Route path="/">
            <UserList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
