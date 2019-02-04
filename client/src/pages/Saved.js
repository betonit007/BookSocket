import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { SaveList, SaveListItem } from "../components/Savelist";
import io from 'socket.io-client';
import {Animated} from "react-animated-css";

var socket = io.connect();

const styles = {
  saveAlert: {
    position: "relative",
    bottom: "50px",
    visibility: "hidden",
    color: "red"
  }
};

class Saved extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.loadBooks();
    socket.on("savedBook", (data) => {
      this.setState({ savedBook : "📖 Saved By Reader: " + data + " 📖", animate: true });
      setTimeout(() => { this.setState({ animate: false });
        
      }, 3000);
    })
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data }))
        .then(() => console.log(this.state.books))
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
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
          </Col>
          <Col size="md-12 sm-12">
            {this.state.books.length ? (
              <SaveList>
              {this.state.books.map(book=> (
                <SaveListItem
                  key = {book._id}
                  id = {book._id}
                  title = {book.title}
                  href = {book.link}
                  desc = {book.description}
                  authors = {book.authors}
                  thumb = {book.image ? book.image : "https://placehold.it/300x300"} 
                  deleteBook = {this.deleteBook} 
                      
                  />
                 ))}
            </SaveList>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
