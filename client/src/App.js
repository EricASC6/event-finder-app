import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Home from "./pages/Home";
import EventDetailsPage from "./pages/EventDetailsPage";
import EventSearchPage from "./pages/EventSearchPage";
import BookmarkedPage from "./pages/BookmarkedPage";
import VenuesPage from "./pages/VenuesPage";
import CalendarPage from "./pages/CalendarPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/event/:id" component={EventDetailsPage} />
        <PrivateRoute path="/search/:query" component={EventSearchPage} />
        <PrivateRoute path="/bookmark" component={BookmarkedPage} />
        <PrivateRoute path="/venues" component={VenuesPage} />
        <PrivateRoute path="/calendar" component={CalendarPage} />
        <PublicRoute path="/signup" component={SignupPage} />
        <PublicRoute path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
};

export default App;
