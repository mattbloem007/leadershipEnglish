import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/SEO'
import Select from 'react-select';
import { login, isAuthenticated, getProfile } from "../utils/auth"
import Auth0Lock from 'auth0-lock';
import Auth0LockPasswordless from 'auth0-lock-passwordless'
import { usePageContext } from '../../PageContext';
import { Redirect } from '@reach/router'
import utilNav from '../services/utilNav'
import { navigate } from 'gatsby';

let user = null;



class Login extends React.Component {


  constructor(props) {
      super(props);


      this.state = {
      };

  }

  componentWillMount() {
    user = getProfile()
    user = user['https://app.io/user_metadata']
    console.log("user", user)
    if (user == undefined) {
      console.log("in here undefined")
      login()
    }
    else {
      navigate('/us/profile');
    }
  }

    render () {
      // if (isAuthenticated()) {
      //   console.log("IS AUTHENTICATED")
      //
      // }
      // else {
      //  console.log("IS NOT AUTHENTICATED")
        return (
          <Layout>
            <SEO title="About | FEA" desc="This is Future English Academy" />

          </Layout>
        )
    //  }

    }



}

export default Login
