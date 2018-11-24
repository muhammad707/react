import React, {Component} from 'react';
import {getJwt} from "../helpers/jwt";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
class RoleAuthenticated extends Component {
    constructor(props) {
        super(props);
    }

    getPathForRole(role) {
        switch (role) {
          case 'superadmin':
              return '/admin'
          case 'operator':
              return '/operators'
          case 'departament':
              return '/departament'
          default:
              return '/login'
        }
  
      }
      redirectRouteForGivenRole(role) {
          const path = this.getPathForRole(role)
          this.props.history.push(path)
      }
      componentWillMount() {
          axios.get('/user/me', {
              headers: {
                  Authorization: getJwt()
              }
          }).then(user => {
            this.redirectRouteForGivenRole(user.data.role);
          }).catch(err => {
              localStorage.removeItem('token');
              this.props.history.push('/login');
          });
      }
  

    render() {
        // if(this.state.user === undefined) {
        //     return (
        //         <div id="loader">
        //             Please wait...
        //         </div>
        //     );
        // }

        return (
            <div>
                { this.props.children }
            </div>
        );
    }
}

export default withRouter(RoleAuthenticated);