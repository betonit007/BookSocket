import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { BookList, BookListItem } from "../components/Booklist";
import { Input, FormBtn } from "../components/Form";
import io from 'socket.io-client';
import {Animated} from "react-animated-css";


var socket = io.connect();



class Books extends Component {
  state = {
    books: [],
    description: "",
    savedBook: "",
    animate: false
  };


  /////listener for socket event from server (when a user saves a book)
  componentWillMount() {
    socket.on("savedBook", (data) => {
      this.setState({ savedBook : "📖 Saved By Reader: " + data + " 📖", animate: true });
      setTimeout(() => { this.setState({ animate: false });
        
      }, 3000);
    })
  }
  searchGoogle = (query) => {
    API.search(query).then(res => this.setState({ books: res.data.items, description: "" }))
    .then(()=>console.log(this.state.books)).catch(err => console.log(err));
  };

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, description: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
  
    this.setState({
      description: event.target.value
    });
    console.log(this.state.description);
  };

  handleDelete=(id)=> {
    console.log(id);
    const books = this.state.books.filter(book => book.id !== id);
    this.setState({ books });
  }
  handleSave=(id)=> {
    console.log(id);
    const saveIt = this.state.books.filter(book=> book.id === id);
    const sendIt = {
      title: saveIt[0].volumeInfo.title,
      authors: saveIt[0].volumeInfo.authors,
      description: saveIt[0].volumeInfo.description,
      image: saveIt[0].volumeInfo.imageLinks.thumbnail,
      link: saveIt[0].volumeInfo.previewLink
    };
    
    API.saveBook(sendIt).then(res => this.handleDelete(id))
    .then(console.log(sendIt.title))
    .then(socket.emit('savedBook', {
      book: sendIt.title
    }))
    .catch(err => console.log(err));
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.description) {
      this.searchGoogle(this.state.description);
    }
  };

  render() {

    
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <img src="https://www.knowerstech.com/wp-content/uploads/2017/01/google-book.png"></img>
              <Animated style={{zIndex: 5, position:"fixed", top: "50%", left: "50%"}} animationIn="bounceInDown" animationOut="bounceOutDown" isVisible={this.state.animate}>
                    <div style={{backgroundColor: "#FF0000", color: "white", fontSize: "25px"}}>
                       {this.state.savedBook}
                    </div>
                </Animated>
            </Jumbotron>
            <form>
              <Input
                value={this.state.description}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!(this.state.description)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-12 sm-12">
            {this.state.books.length ? (
              <BookList>
              {this.state.books.map(book=> (
      
                <BookListItem
                  key = {book.id}
                  id = {book.id}
                  title = {book.volumeInfo.title}
                  href = {book.volumeInfo.infoLink}
                  desc = {book.volumeInfo.description}
                  authors = {book.volumeInfo.authors}
                  thumb = {book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://placehold.it/300x300"} 
                  handleDelete = {this.handleDelete} 
                  handleSave = {this.handleSave}     
                  />
                )
                
                )}

            </BookList>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
