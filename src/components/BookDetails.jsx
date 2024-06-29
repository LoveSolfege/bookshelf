import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`https://openlibrary.org/works/${id}.json`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  if (!book) return <Container>Loading...</Container>;

  return (
    <Container>
      <Card>
        {book.covers && book.covers.length > 0 && (
          <CardImg
            top
            width="100%"
            src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
            alt={book.title}
          />
        )}
        <CardBody>
          <CardTitle tag="h2">{book.title}</CardTitle>
          <CardText>{book.description ? book.description.value : 'No description available'}</CardText>
        </CardBody>
      </Card>
    </Container>
  );
};

export default BookDetails;
