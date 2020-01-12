import { observable, action } from 'mobx';
import config from "../../config/main.config";

class UserStore {
    @observable currentLink = "login"; 
    @action updateLink(link) {
        this.currentLink = link; 
        console.log(this.currentLink);
    }

    @observable selectedUser = {}; 
    @action selectUser(user) {
        this.selectedUser = user; 
    }

    @observable loginStatus = "loggedout"; 
    @action loginStatusChange(status) {
        this.loginStatus = status;
    }

    @observable usersFromServer = '';
    @observable error = '';

    // http://localhost:3000/sqliteConnection/users
    /*
    @action fetchUsers() {
        return fetch('http://localhost:3000/sqliteConnection/users', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        this.usersFromServer = json.users;
                        console.log(this.usersFromServer);
                    });

                } else {
                    this.error = "Error on fetching in response";
                    console.log(error);
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    throw error;
                }
            );
    }
    */

    @action checkUser(user) {
        return fetch('http://localhost:3000/sqliteConnection/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }, 
            body: JSON.stringify({
                name : user.name,
                password : user.password
            })
          }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log(json);
                        if (json.response == "user and password correct") {
                            this.loginStatus = "loggedin";
                            this.currentLink = "user";
                            this.selectUser(json.user[0]);
                            console.log("this is the user:")
                            console.log(this.selectedUser);
                            console.log("id: " + this.selectedUser.idUser);
                            console.log(this.loginStatus);
                        }
                    });

                } else {
                    this.error = "Error on fetching";
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    throw error;
                }
            );
    }

    @action logout() {
        this.selectedUser = {};
        this.loginStatus = "loggedout";
    }

}

const store = new UserStore();

export default store;