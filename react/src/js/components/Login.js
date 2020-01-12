import React from "react";

// Elemente von Semantic UI einbinden
import { Input, Button } from 'semantic-ui-react';

// Observer einbinden
import {observer} from 'mobx-react'

// User Store einbinden
import userStore from '../stores/userStore';

// Stylesheets einbinden
require('../../stylesheets/slyeLogin.css');

// mit der Annotation @observer ist die Komponente fähig als Observer zu fungieren.
// ACHTUNG: ohne die observer Annotation reagiert die Kompnente NICHT AUTOMATISCH auf Änderungen der Daten aus den Stores
@observer
export default class Login extends React.Component {

    constructor() {
        super();
        this.state = {};
        this.user = {};
    }

    loginUser() {
        console.log("check user");
        userStore.checkUser(this.user);
    }

    nameChanged(e){
        console.log(e.target.value);
        this.user.name = e.target.value;
    }
    passwordChanged(e){
        console.log(e.target.value);
        this.user.password = e.target.value;
    }

    render() {
        return (
            <div id="login">
                <h2> Login here. </h2>
                <Input icon='user' onChange={this.nameChanged.bind(this)} iconPosition='left' placeholder='username' />
                <Input icon='key' onChange={this.passwordChanged.bind(this)} iconPosition='left' placeholder='password' />
                <Button id="loginUser" onClick={this.loginUser.bind(this)}>Login</Button>
            </div>
        );
    }
}