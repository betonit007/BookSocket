import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";
import DeleteBtn from "../DeleteBtn";

// Exporting both RecipeList and RecipeListItem from this file

// RecipeList renders a bootstrap list item
export function SaveList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export function SaveListItem({
  id,
  title,
  href,
  desc,
  authors,
  thumb = "https://placehold.it/300x300",
  deleteBook
}) {

  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={thumb} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{title}</h3><span>by: {authors}</span>
            <p>Description: {desc}</p>
            <a rel="noreferrer noopener" target="_blank" href={href}>
              Get the book!
            </a>
          </Col>
        </Row>
        <DeleteBtn onClick={()=>deleteBook(id)} id={id} />
      </Container>
    </li>
  );
}
