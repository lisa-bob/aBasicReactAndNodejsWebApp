import React from "react";

// Komponenten einbinden
import BookList from "../components/BooksList";

// Stylesheets einbinden
require('../../stylesheets/styleBook.css');

export default class Books extends React.Component {

    constructor() {
        super(); 
    }

    render() {
        
        return (
            <div>
                <h2> Your books. </h2>
                <BookList />
            </div>
        );
    }
}
           