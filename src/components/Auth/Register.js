import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';

export default class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users')

  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };


  handleSubmit = (event) => {
    event.preventDefault();
    if(this.isFormValid()){

      this.setState({errors: [], loading: true});

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(createdUser => {
          console.log(createdUser);

          createdUser.user
            .updateProfile({
            displayName: this.state.username,
            photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
          })
            .then(() => {
            this.saveUser(createdUser).then(() => {
              console.log("User Saved")
            })
          })
        })
        .then(() => {
          this.setState({ loading: false })
        })
        .catch(error => {
          console.log(error);
          this.setState({ errors: this.state.errors.concat(error), loading: false })
        });
    }
  };

  saveUser = (createdUser) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    })

  };

  isFormValid = () => {
    let errors = [];
    let error;

    if(this.isFormEmpty(this.state)){
      error = {message: "Fill in all fields"};
      this.setState({errors: errors.concat(error)});
      return false

    }else if (!this.isPasswordValid(this.state))
    {
      error = {message: "Password is Invalid"};
      this.setState({errors: errors.concat(error)});
      return false
    }
    else {
      return true
    }
  };

  isFormEmpty = ({username, email, password, passwordConfirmation}) =>{
    return !username.length || !email.length || !password.length || !passwordConfirmation.length
  };

  isPasswordValid = ({password, passwordConfirmation}) => {
    if(password.length < 6 || passwordConfirmation.length < 6){
      return false
    }else if ( password !== passwordConfirmation ){
      return false
    } else {
      return true
    }
  };

  displayError = (errors) => errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName)
    )
      ? 'error'
      : ''
  };

  render(){
    const {username, email, password, passwordConfirmation, errors,
      loading
    } = this.state;

    return(
      <Grid className="app" textAlign="center" verticalAlign="middle" >
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h2" icon color="blue" textAlign="center">
            <Icon  name='building outline' color='blue'/>
            Register for GKL-jorge
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input fluid name='username' icon='user' iconPosition='left'
                          placeholder='Username' type='text'
                          value={username}
                          onChange={this.handleChange}/>
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
              <Form.Input
                          className={this.handleInputError(errors, 'password')}
                          fluid name='passwordConfirmation' icon='repeat' iconPosition='left'
                          placeholder='Password Confirmation' type='password'
                          value={passwordConfirmation}
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
          <Message>Already a Register? <Link to='/login'>Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
