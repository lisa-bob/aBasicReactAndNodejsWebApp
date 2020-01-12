import React from "react";

// Button, Table, Icon etc. importieren
import { Button, Table, Icon, Modal, Form, Checkbox } from 'semantic-ui-react';

// observer einbinden
import { observer } from "mobx-react";

// Store einbinden
import bookStore from "../stores/bookStore";

// Stylesheets einbinden
require('../../stylesheets/styleBook.css');

// mit der Annotation @observer ist die Komponente fähig als Observer zu fungieren.
// ACHTUNG: ohne die observer Annotation reagiert die Kompnente NICHT AUTOMATISCH auf Änderungen der Daten aus den Stores
@observer
export default class BooksList extends React.Component {

    // React components automagically render and update  
    // based on a change in this.state or props
    constructor() {
        super(); 
        this.state = {
            modalOpen : false
        }
        this.newBook = {}; 
        bookStore.fetchBooks();
    }

    // handleChange = (e, { value }) => this.setState({ value })

    tableRowClicked(book) {
        bookStore.selectBook(book); 
        console.log(book);
    }

    removeClicked(book) {
        console.log("remove");
        console.log(book);
        bookStore.deleteBook(book.idBook);
        bookStore.fetchBooks();
    }

    readChecked(book) {
        console.log("toggleRead");
        console.log(book.idBook);
        bookStore.toggleRead(book.idBook);
    }

    addNewBook() {
        this.newBook = {}; 
        console.log("New Book: ")
        console.log(this.newBook);
        this.setState({ modalOpen: true });
    }

    // werte die eingegeben werden in newBook zwischenspeichern
    titleChanged(e){
        console.log(e.target.value);
        this.newBook.title = e.target.value;
    }
    authorChanged(e){
        console.log(e.target.value);
        this.newBook.author = e.target.value;
    }
    readChanged(e, {value}){
        console.log("Value od read: ")
        console.log(value);
        if (value == "yes") {
            this.newBook.read = true;
        } else {
            this.newBook.read = false;
        }
        this.setState({ value });
    }

    saveNewBook() {
        // modal schließen
        this.setState({ 
            modalOpen: false,
            value: ""
        }); 
        console.log("new Book: ")
        console.log(this.newBook);
        bookStore.addNewBook(this.newBook); 
    }
    cancel() {
        this.setState({ 
            modalOpen: false,
            value: ""
        }); 
    }

    // nachdem der neue Text geladen wurde, wird die Komponente neu gerendert.
    render() {
        const { value } = this.state;
        // nachdem die Books geladen wurden, wird die Komponenten gerendert
        const {booksFromServer} = bookStore; 
        const booksArray = [...booksFromServer]; 

        console.log("Render Component");
        console.log(booksArray);
        const TableRowsBooks = booksArray.map((book,i) =>  
            <Table.Row key={ book.idBook } onClick={this.tableRowClicked.bind(this, book)}>
                <Table.Cell> <span class="bookTitle"> { book.title } </span> </Table.Cell>
                <Table.Cell> { book.author } </Table.Cell>
                <Table.Cell collapsing> 
                    <span class="readBook"> { book.read == 1 ? "yes" : "no" } </span> 
                    <Checkbox slider onChange={this.readChecked.bind(this, book)} checked={book.read == 1 ? true : false} /> 
                </Table.Cell>
                <Table.Cell class="removeCell" collapsing onClick={this.removeClicked.bind(this, book)} textAlign="center"> 
                    <Icon name='trash alternate' />
                </Table.Cell>
            </Table.Row>);   

        return (
            <div>
                <Table celled id="bookTable">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Author</Table.HeaderCell>
                            <Table.HeaderCell>Read</Table.HeaderCell>
                            <Table.HeaderCell>Remove</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {  TableRowsBooks  }
                    </Table.Body>
                </Table>

                <div id="addBookButtonWrapper">
                    <Button animated='vertical' id="addBookButton" onClick={this.addNewBook.bind(this)}>
                                <Button.Content visible> 
                                    <Icon name='add' /> 
                                </Button.Content>
                                <Button.Content hidden>
                                    Add
                                </Button.Content>
                    </Button>
                </div>
                
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.close}
                >
                    <Modal.Header> Add a new book </Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                        <Form>
                            <Form.Field>
                                <label>Title</label>
                                <input placeholder='Title' onChange={this.titleChanged.bind(this)} />
                            </Form.Field>
                            <Form.Field>
                                <label>Author</label>
                                <input placeholder='Author' onChange={this.authorChanged.bind(this)} />
                            </Form.Field>
                            <Form.Group inline>
                                <label>You already read it?</label>
                                <Form.Radio
                                    label='Yes'
                                    value='yes'
                                    checked={value === 'yes'}
                                    onChange={this.readChanged.bind(this)}
                                />
                                <Form.Radio
                                    label='No'
                                    value='no'
                                    checked={value === 'no'}
                                    onChange={this.readChanged.bind(this)}
                                />
                            </Form.Group>
                        </Form>
                        <Button id="saveNewBook" onClick={this.saveNewBook.bind(this)}>Save</Button>
                        <Button class="cancel" onClick={this.cancel.bind(this)}>Cancel</Button>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
        </div>
        
        );
    }
}
           