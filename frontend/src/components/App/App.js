import './App.css';
import React, {Component, Element} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import Authors from '../Authors/authors';
import Categories from '../Categories/categories';
import Books from '../Books/BookList/books';
import Header from '../Header/header';
import BookAdd from '../Books/BookAdd/bookAdd';
import BookEdit from "../Books/BookEdit/bookEdit";
import LibraryService from "../../repository/libraryRepository";

// import Login from "../Login/login";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors: [],
            selectedBook: {}
        }
    }

    render() {
    return (
        <Router>
          <Header/>
          <main>
            <div className="container">
              {/*<Navigate to={"/products"}/>*/}
              <Routes>
                <Route path={"/authors"} element={
                  <Authors authors={this.state.authors}/>}/>
                <Route path={"/categories"} element={
                  <Categories categories={this.state.categories}/>}/>
                <Route path={"/books/add"} element={
                  <BookAdd categories={this.state.categories}
                              authors={this.state.authors}
                              onAddBook={this.addBook}/>}/>
                <Route path={"/books/edit/:id"} element={
                  <BookEdit categories={this.state.categories}
                            authors={this.state.authors}
                               onEditBook={this.editBook}
                               book={this.state.selectedBook}/>}/>
                <Route path={"/books"} element={
                  <Books books={this.state.books}
                            onDelete={this.deleteBook}
                            onEdit={this.getBook}
                  />}/>
                  <Route path={"/books/mark/:id"} element={
                      <Books onMarkAsTaken={this.markAsTaken}
                             books={this.state.books}
                             book={this.state.selectedBook}/>}/>
                {/*<Route path={"/login"} exact render={() => <Login onLogin={this.fetchData}/>}/>*/}
              </Routes>
              {/*<Navigate to={"/products"}/>*/}
            </div>
          </main>
        </Router>
    );
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    this.loadAuthors();
    this.loadCategories();
    this.loadBooks();
  }

  // loadManufacturers = () => {
  //   EShopService.fetchManufacturers()
  //       .then((data) => {
  //         this.setState({
  //           manufacturers: data.data
  //         })
  //       });
  // }

  loadBooks = () => {
    LibraryService.fetchBooks()
        .then((data) => {
          this.setState({
            books: data.data
          })
        });
  }

    loadAuthors = () => {
        LibraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }

  loadCategories = () => {
    LibraryService.fetchCategories()
        .then((data) => {
          this.setState({
            categories: data.data
          })
        });
  }

  deleteBook = (id) => {
    LibraryService.deleteBook(id)
        .then(() => {
          this.loadBooks();
        });
  }

  addBook = (name, category, author, availableCopies) => {
    LibraryService.addBook(name, category, author, availableCopies)
        .then(() => {
          this.loadBooks();
        });
  }

  getBook = (id) => {
    LibraryService.getBook(id)
        .then((data) => {
          this.setState({
            selectedBook: data.data
          })
        })
  }

  editBook = (id, name, category, author, availableCopies) => {
    LibraryService.editBook(id, name, category, author, availableCopies)
        .then(() => {
          this.loadBooks();
        });
  }

    markAsTaken = (id) => {
        LibraryService.markAsTaken(id)
            .then(() => {
                this.loadBooks();
            });
    }


}

export default App;
