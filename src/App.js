import React from 'react';
import './App.css';
import styled from 'styled-components';
import { Switch, Route } from 'react-router';
import LandingPage from './views/LandingPage';
import MainDashboard from './views/Dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './actions';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';

function App(props) {
  const user = useSelector(state => state.usersReducer);
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    fetchUser(dispatch);
  };

  return (
    <StyledApp className='App'>
      <Switch>
        <Route exact path={'/'} render={props => <LandingPage {...props} />} />
        <Route path={'/signup'} render={props => <SignUp {...props} />} />
        <Route path={'/signin'} render={props => <SignIn {...props} />} />
        <Route path={'/dashboard'} render={props => <MainDashboard {...props} />} />
      </Switch>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  color: ${props => props.theme.color};
`;

export default App;
