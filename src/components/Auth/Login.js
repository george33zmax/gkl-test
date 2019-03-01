import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };


  handleSubmit = (event) => {
    event.preventDefault();
    if ( this.isFormValid(this.state) ) {

      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(sigedInUser => {
          console.log(sigedInUser)
        })
        .catch(err => {
          console.log(err);
          this.setState({errors: this.state.errors.concat(err), loading: false})
        })
    }
  };

  isFormValid = ({email, password}) => email && password;

  displayError = (errors) => errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName)
    )
      ? 'error'
      : ''
  };

  render(){
    const { email, password, errors,
      loading
    } = this.state;

    return(
      <Grid className="app" textAlign="center" verticalAlign="middle" >
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h2" icon color="blue" textAlign="center">
            <Icon  name="code branch" color='blue'/>
            Login To GKL-jorge
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                className={this.handleInputError(errors, 'email')}
                fluid name='email' icon='mail' iconPosition='left'
                placeholder='Email Address' type='email'
                value={email}
                onChange={this.handleChange}/>
              <Form.Input
                className={this.handleInputError(errors, 'password')}
                fluid name='password' icon='lock' iconPosition='left'
                placeholder='Password' type='password'
                value={password}
                onChange={this.handleChange}/>

              <Button className={loading ? 'loading' : ''}
                      disabled={loading}
                      type='submit' fluid color="blue" size="large">Submit</Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayError(errors)}
            </Message>
          )}
          <Message>Don't have an Account? <Link to='/register'>Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
