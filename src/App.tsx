import React, { Suspense, lazy } from 'react';
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const RegistrationForm = lazy(() => import('./componets/form/registrationForm'));
const JobCard = lazy(() => import('./componets/job_card/jobCard'));
const Dashboard = lazy(() => import('./pages/dashboard'));
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path='/register' component={RegistrationForm} />
              <Route path='/jobCard' component={JobCard} />
              <Route exact path='/' component={Dashboard} />
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
