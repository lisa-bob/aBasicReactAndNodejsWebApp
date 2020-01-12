import React from "react";

// Elemente von React Router einbinden
import { HashRouter, Route } from 'react-router-dom';

// Komponenten einbinden
import NavigationBar from "../components/NavigationBar";

// verschiedene Seiten (pages) einbinden
import userState from "./userState";
import Books from "../pages/Books";
import MoreInteraction from "./MoreInteraction";

export default class Layout extends React.Component {
    
    render() {

        return (
            <HashRouter>
                <div>
                    <NavigationBar location={location}/>
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12">
                            <Route exact path="/user" component={userState}/>
                            <Route exact path="/login" component={userState}/>
                            <Route exact path="/moreInteraction" component={MoreInteraction}/>
                            <Route exact path="/" component={userState}/>
                            <Route exact path="/books" component={Books}/>
                            </div>
                        </div>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

/*




         
                                
                                

*/