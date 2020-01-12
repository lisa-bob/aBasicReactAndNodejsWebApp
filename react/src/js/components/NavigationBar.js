import React, { Component } from 'react';

// Elemente von Semantic UI einbinden
import { Menu, Segment } from 'semantic-ui-react';

// Link Element vom React Router einbinden
import { Link } from "react-router-dom";

// Observer einbinden
import {observer} from 'mobx-react';

// User Store einbinden
import userStore from '../stores/userStore';

// mit der Annotation @observer ist die Komponente fähig als Observer zu fungieren.
// ACHTUNG: ohne die observer Annotation reagiert die Kompnente NICHT AUTOMATISCH auf Änderungen der Daten aus den Stores
@observer
export default class MenuExampleBasic extends Component {

  constructor() {
    super();
    if (userStore.loginStatus == "loggedin") {
      this.state = { activeItem: "books" };
    } else {
      this.state = { activeItem: "login" };
    }
  }

  handleItemClick = (e, { name }) => userStore.updateLink(name);

  render() {
    const { currentLink } = userStore;
    const { selectedUser } = userStore;
    const { loginStatus } = userStore;

    return (
      <Segment inverted>
      { loginStatus == "loggedin" ? 
        <Menu inverted pointing secondary>
          <Menu.Item
            as={Link} to='/moreInteraction' 
            name='moreInteraction'
            active={currentLink === 'moreInteraction'}
            onClick={this.handleItemClick}>
            More Interaction
          </Menu.Item>

          <Menu.Item
            as={Link} to='/books' 
            name='books'
            active={currentLink === 'books'}
            onClick={this.handleItemClick}>
            Books
          </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item
              as={Link} to='/user' 
              name='user'
              active={currentLink === 'user'}
              onClick={this.handleItemClick}>
              { selectedUser.name }
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      : <Menu inverted pointing secondary>
          <Menu.Menu position='right'>
            <Menu.Item
              as={Link} to='/login' 
              name='login'
              active={currentLink === 'login'}
              onClick={this.handleItemClick}>
              Login
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      }
      </Segment>
    )
  }
}




/*














import React from "react";
import { Link } from "react-router-dom";
import { observable } from "mobx";
import { observer } from "mobx-react";

import { Menu } from 'semantic-ui-react'

@observer
export default class NavigationBar extends React.Component {

  @observable collapse = true;

  toggleCollapse() {
    this.collapse = !this.collapse;
  }

  render() {
    const navClass = this.collapse ? "collapse" : "";

    return (
        <Menu>
        <Menu.Item
          name='editorials'
          active={activeItem === 'editorials'}
          onClick={this.handleItemClick}
        >
          Editorials
        </Menu.Item>

        <Menu.Item name='reviews' active={activeItem === 'reviews'} onClick={this.handleItemClick}>
          Reviews
        </Menu.Item>

        <Menu.Item
          name='upcomingEvents'
          active={activeItem === 'upcomingEvents'}
          onClick={this.handleItemClick}
        >
          Upcoming Events
        </Menu.Item>
      </Menu>



      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar" />
              <span class="icon-bar" />
              <span class="icon-bar" />
            </button>
          </div>
        </div>
        <div class={"navbar-collapse " + navClass}>
          <ul class="nav navbar-nav">
            <li>
              <Link to="textfromrestcall" onClick={this.toggleCollapse.bind(this)}>TextRest</Link>
            </li>
            <li>
              <Link to="mobxinteraction" onClick={this.toggleCollapse.bind(this)}>Interaction</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

*/