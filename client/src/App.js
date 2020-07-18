import React from "react";
import { Switch } from "react-router-dom";
import AuthenticatedRoute from "./components/routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/routes/UnauthenticatedRoute";
import Home from "./pages/Home";
import EventDetailsPage from "./pages/EventDetailsPage";
import EventSearchPage from "./pages/EventSearchPage";
import BookmarkedPage from "./pages/BookmarkedPage";
import CalendarPage from "./pages/CalendarPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <AuthenticatedRoute exact path="/" component={Home} />
        <AuthenticatedRoute path="/event/:id" component={EventDetailsPage} />
        <AuthenticatedRoute path="/search/:query" component={EventSearchPage} />
        <AuthenticatedRoute path="/bookmark" component={BookmarkedPage} />
        <AuthenticatedRoute path="/calendar" component={CalendarPage} />
        <UnauthenticatedRoute path="/signup" component={SignupPage} />
        <UnauthenticatedRoute path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
};

export default App;
