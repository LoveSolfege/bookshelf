import React, { useState } from 'react';
import { Container, Input, Card, CardBody, CardTitle, CardSubtitle, CardImg, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import useFetchBooks from '../hooks/useFetchBooks';

const BookList = () => {
  const [query, setQuery] = useState('Tolkien');
  const { data: books, loading, error } = useFetchBooks(query);

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error fetching books</Container>;

  return (
    <Container>
      <h2>Book List</h2>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books by title or author"
        className="mb-3"
      />
      <div className="d-flex flex-wrap justify-content-center">
        {books.map(book => (
          <Card key={book.key} className="m-3" style={{ width: '18rem' }}>
            {book.cover_i && (
              <CardImg
                top
                width="100%"
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                alt={book.title}
              />
            )}
            <CardBody>
              <CardTitle tag="h5">{book.title}</CardTitle>
              <CardSubtitle className="mb-2 text-muted">
                {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
              </CardSubtitle>
              <Link to={`/add-review/${book.key.split('/').pop()}`}>
                <Button color="primary">Review This Book</Button>
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default BookList;
