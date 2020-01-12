import { observable, action } from 'mobx';
import config from "../../config/main.config";

import userStore from "../stores/userStore";

class BookStore {
    @observable selectedBook = {}; 
    @action selectBook(book) {

        this.selectedBook = book; 
    }

    @observable booksFromServer = '';
    @observable error = '';

    @action fetchBooks() {
        return fetch('http://localhost:3000/sqliteConnection/books/' + userStore.selectedUser.idUser, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        this.booksFromServer = json.books;
                        console.log("fetched books");
                        console.log(this.booksFromServer);
                    });

                } else {
                    this.error = "Error on fetching in response";
                    console.log(error);
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching books";
                    throw error;
                }
            );
    }

    @action addNewBook(newBook) {
        console.log(userStore.selectedUser);
        return fetch('http://localhost:3000/sqliteConnection/books/new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }, 
            body: JSON.stringify({
                title : newBook.title,
                author : newBook.author, 
                read : newBook.read,
                user : userStore.selectedUser.idUser
            })
          }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log(json);
                        this.fetchBooks(); 
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

    @action deleteBook(bookId) {
        return fetch('http://localhost:3000/sqliteConnection/books/' + bookId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log("book deleted");
                        this.fetchBooks(); 
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

    @action toggleRead(bookId) {
        return fetch('http://localhost:3000/sqliteConnection/books/' + bookId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log("changed state of read");
                        this.fetchBooks(); 
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

}

const store = new BookStore();

export default store;