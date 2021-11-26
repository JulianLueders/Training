import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SamplePage from './Pages/SamplePage';
import Error404 from './Pages/404';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgotPasswordPage from './Auth/ForgotPassword';
import Analytics from "./Pages/Analytics";
import PrivateRoute from "../util/PrivateRoute";
import Times from "./Pages/Times";
import DetailedTable from "./Pages/DetailedTable";
import Groups from "./Pages/Groups";
import Support from "./Pages/Support";
import Live from "./Pages/Live";
import Config from "./Pages/Config";
import {getCurrentUser, getUserGroups} from "../util/APIUtils";
import DynamicSideBar from "../@jumbo/components/AppLayout/partials/SideBar/DynamicSideBar";
import {GroupLive} from "./Pages/Live/GroupLive";
import MailAnalytics from "./Pages/MailAnalytics";

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {
    return <Redirect to={'/sample-page'} />;
  } else if (authUser && location.pathname === '/signin') {
    return <Redirect to={'/sample-page'} />;
  }


  return (
    <React.Fragment>
      <Switch>
        <Route path="/sample-page" component={SamplePage} />
          <RestrictedRoute path="/analytics" component={Analytics} />
          <RestrictedRoute path="/mail" component={MailAnalytics} />
          <RestrictedRoute path="/projections" component={Times} />
          <RestrictedRoute path="/table" component={DetailedTable} />
          <RestrictedRoute path="/groups" component={Groups} />
          <RestrictedRoute path="/support" component={Support} />
          <RestrictedRoute path="/live" component={Live} />
          <RestrictedRoute path="/config" component={Config} />
          <RestrictedRoute path="/group/:id" component={({match}) => (
              <GroupLive id={match.params.id} />
          )} />

          <Route path="/signin" component={Login} />
        <Route path="/signup" component={Register} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
