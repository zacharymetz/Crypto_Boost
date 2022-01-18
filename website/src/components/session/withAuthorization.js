import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import AuthUserContext from './context';
import { withParse } from '../parse';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      //  modify this to use the parse method of onstate state change
      //  maybe it should trigger an auth check ?
      var _this = this;
      
      this.props.parse.parse.onAuthChange( function(user) {
          // do stuff with your user
          if (!condition(user)) {
            _this.props.history.push(ROUTES.SIGN_IN);
          }
      });
      
    }

    componentWillUnmount() {
      // honseslt have no idea why firebase called something 
      // like that here but to each his own i guess tbh 
      //this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withParse,
  )(WithAuthorization);
};

export default withAuthorization;