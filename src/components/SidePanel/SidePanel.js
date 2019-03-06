import React from "react";
import { Menu } from "semantic-ui-react";

import UserPanel from "./UserPanel";
import Channels from "./Channels";

class SidePanel extends React.Component {
  render() {
    const { currentUser, primaryColor, queryId } = this.props;

    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: primaryColor, fontSize: "1.2rem" }}
      >
        <UserPanel primaryColor={primaryColor} currentUser={currentUser} />
        <Channels queryId={queryId} currentUser={currentUser} />
      </Menu>
    );
  }
}

export default SidePanel;
