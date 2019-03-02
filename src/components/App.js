import React from "react";
import { Grid } from "semantic-ui-react";
import "./App.css";
import { connect } from "react-redux";


import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import logo from '../logo.svg';

const App = ({ currentUser, currentChannel, isPrivateChannel, userPosts, primaryColor, secondaryColor }) => (

  <Grid columns="equal" className="app" style={{ background: secondaryColor }}>
    <SidePanel
      key={currentUser && currentUser.uid}
      currentUser={currentUser}
      primaryColor={primaryColor}
    />

    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
      />
    </Grid.Column>

    <Grid.Column width={4}>
      <img src={logo} alt=""/>
    </Grid.Column>
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  userPosts: state.channel.userPosts,
  primaryColor: state.colors.primaryColor,
  secondaryColor: state.colors.secondaryColor
});

export default connect(mapStateToProps)(App);
