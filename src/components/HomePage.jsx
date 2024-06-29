import React, { useEffect, useState } from 'react';
import { Container, Card, CardBody, CardTitle, CardText, CardImg, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [sortedReviews, setSortedReviews] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    setReviews(savedReviews);
    setSortedReviews(savedReviews);
  }, []);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const sortReviews = (criteria) => {
    let sorted = [...reviews];
    switch (criteria) {
      case 'date':
        sorted = sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'score':
        sorted = sorted.sort((a, b) => b.score - a.score);
        break;
      case 'alphabetical':
        sorted = sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'date_old':
        sorted = sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'score_reverse':
        sorted = sorted.sort((a, b) => a.score - b.score);
        break;
      case 'alphabetical_reverse':
        sorted = sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    setSortedReviews(sorted);
  };

  const deleteReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    setSortedReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
  };

  return (
    <Container>
      <h2>Latest Reviews</h2>
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="mb-3">
        <DropdownToggle caret>
          Sort Reviews
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => sortReviews('score')}>Highest rated</DropdownItem>
          <DropdownItem onClick={() => sortReviews('score_reverse')}>Lowest rated</DropdownItem>
          <DropdownItem onClick={() => sortReviews('date')}>New to old</DropdownItem>
          <DropdownItem onClick={() => sortReviews('date_old')}>Old to new</DropdownItem>
          <DropdownItem onClick={() => sortReviews('alphabetical')}>A to Z</DropdownItem>
          <DropdownItem onClick={() => sortReviews('dalphabetical_reverse')}>Z to A</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Row>
        {sortedReviews.map((review, index) => (
          <Col md="4" key={index} className="mb-3">
            <Card>
              {review.cover_i ? (
                <CardImg
                  top
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  src={`https://covers.openlibrary.org/b/id/${review.cover_i}-M.jpg`}
                  alt={review.title}
                />
              ) : (
                <div style={{ width: '100%', height: '300px', backgroundColor: '#ddd' }}></div>
              )}
              <CardBody>
                <CardTitle tag="h5">{review.title} by {review.author}</CardTitle>
                <CardText>{review.review.slice(0, 100)}...</CardText>
                <CardText>
                  <strong>Reviewer:</strong> {review.reviewer} <br />
                  <strong>Date:</strong> {review.date} <br />
                  <strong>Score:</strong> {review.score}
                </CardText>
                <Link to={`/review/${index}`}>
                  <Button color="primary">Read More</Button>
                </Link>
                <Button color="danger" onClick={() => deleteReview(index)}>Delete</Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
