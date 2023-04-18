import React from "react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import MainViewController from "./presentation/MainView/MainViewController";
import { defaultTheme } from "./theme/defaultTheme";

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={MainViewController} />
          <Route exact path="*" component={MainViewController} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
