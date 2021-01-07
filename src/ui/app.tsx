import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './components/home';
const App = () => {
    const darkTheme = createMuiTheme({
        palette: {
            type: "dark"
        }
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <Router>
                <Switch>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;