import React from "react";

// Observer einbinden
import {observer} from 'mobx-react'

// Komponenten einbinden
import Login from '../components/Login';
import User from '../components/User';

// User Store einbinden
import userStore from '../stores/userStore';

// mit der Annotation @observer ist die Komponente fähig als Observer zu fungieren.
// ACHTUNG: ohne die observer Annotation reagiert die Kompnente NICHT AUTOMATISCH auf Änderungen der Daten aus den Stores
@observer
export default class UserState extends React.Component {

  render() {
    const {loginStatus} = userStore;

    return (
      <div>
        { loginStatus == "loggedout" ? <Login /> : <User /> }
      </div>
    );
  }
}