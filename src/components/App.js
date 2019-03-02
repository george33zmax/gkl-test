import React from "react";
import { Grid } from "semantic-ui-react";
import "./App.css";
import { connect } from "react-redux";


// pull here message
import Messages from "./Wall/Messages";


// prettier-ignore
const App = ({ currentUser, currentChannel, isPrivateChannel, userPosts, primaryColor, secondaryColor }) => (
  <Grid columns="equal" className="app" style={{ background: secondaryColor }}>
    {/* wall */}
    <Grid.Column >
      <Messages />
    </Grid.Column>

    {/* Logo */}
    <Grid.Column width={4}>
      <div>aki logo</div>
    </Grid.Column>
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(App);
