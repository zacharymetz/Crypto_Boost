import React from 'react';

import AuthUserContext from './context';
import { withParse } from '../parse';

const withAuthentication = Component => {
    
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      console.log("ASDASDASDASDASDASD")
      this.state = {
        user: null,
      };
    }
    componentDidMount() {
     
      //  okay lets figure out what this does so we can get it to set the
      //  current user form Parse 
      //  this is just a then we need to change this to change when
      //  ever something else happens 
      var _this = this;
      
      this.props.parse.parse.onAuthChange( function(user) {
          // do stuff with your user
          user
            ? _this.setState({ user })
            : _this.setState({ user: null });
          console.log(user)
      })
      //  get the first user 
      this.props.parse.parse.User.currentAsync().then(this.props.parse.parse.triggerOnAuthChange);
      
    }

    componentWillUnmount() {
      //  idk we dont need to do anything here i guess since will never get here 
      //  in reality
      //this.listener();
    }
    render() {
        return (
            <AuthUserContext.Provider value={this.state.user}>
                <Component {...this.props} />
            </AuthUserContext.Provider>
        );
    }
  }

   return withParse(WithAuthentication);
};

export default withAuthentication;