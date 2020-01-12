import React from "react";

// Elemente von Semanic UI einbinden
import { Card, Image, Button } from 'semantic-ui-react';

// Observer einbinden
import {observer} from 'mobx-react'

// User Store einbinden
import userStore from '../stores/userStore'

// Stylesheets einbinden
require('../../stylesheets/slyeLogin.css');

// mit der Annotation @observer ist die Komponente fähig als Observer zu fungieren.
// ACHTUNG: ohne die observer Annotation reagiert die Kompnente NICHT AUTOMATISCH auf Änderungen der Daten aus den Stores
@observer
export default class User extends React.Component {

  constructor() {
    super();
  }

  logout() {
    console.log("logout");
    userStore.logout();
  }

  render() {
    const {selectedUser} = userStore;
    return (
      <div id="user">
        <h2> You are logged in. </h2>
        <Card id="userCard">
            <Image src='https://wallup.net/wp-content/uploads/2016/01/287499-nature-landscape-sunset-rock_formation-forest-clouds-sky-hill-trees-Czech_Republic.jpg' wrapped ui={false} />
            <Card.Content>
                <Card.Header> { selectedUser.name } </Card.Header>
                <Card.Meta>
                    <span className='date'> Joined in 2020 </span>
                </Card.Meta>
                <Card.Description>
                    Password: { selectedUser.password }
                </Card.Description>
            </Card.Content>
        </Card>
        <Button id="logout" onClick={this.logout.bind(this)}>Logout</Button>
      </div>
    );
  }
}