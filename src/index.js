import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase';
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom'
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import {createStore} from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import {setUser} from "./actions";


const store = createStore(rootReducer, composeWithDevTools());

class Root extends Component{
  state = {};

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.props.setUser(user);
        this.props.history.push('/');
      }
    })
  }

  render(){

    return(
        <Switch>
          <Route exact path="/" component={App}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
        </Switch>
    );
  }
}

const RootWithAut = withRouter(connect(null,{setUser})(Root));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAut />
    </Router>
  </Provider>,

  document.getElementById('root'));
registerServiceWorker();
