import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg, Button, Row, Col } from 'reactstrap';

const ReviewDetails = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    setReview(savedReviews[id]);
  }, [id]);

  const deleteReview = () => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const updatedReviews = savedReviews.filter((_, index) => index !== parseInt(id));
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    navigate('/');
  };

  if (!review) return <Container>Loading...</Container>;

  return (
    <Container>
      <Card className="mb-3">
        <Row className="g-0">
          <Col md="4" className="d-flex align-items-center">
            {review.cover_i ? (
              <CardImg
                top
                style={{ width: '150px', height: 'auto', margin: '20px auto' }}
                src={`https://covers.openlibrary.org/b/id/${review.cover_i}-M.jpg`}
                alt={review.title}
              />
            ) : (
              <div style={{ width: '150px', height: '210px', backgroundColor: '#ddd', margin: '20px auto' }}></div>
            )}
          </Col>
          <Col md="8">
            <CardBody>
              <CardTitle tag="h5">{review.title}</CardTitle>
              <CardSubtitle className="mb-2 text-muted">
                {review.authors} <br />
                Reviewer: {review.reviewer} <br />
                Date: {review.date} <br />
                Score: {review.score}
              </CardSubtitle>
              <CardText>{review.review}</CardText>
              <Button color="danger" onClick={deleteReview} className="float-right">Delete</Button>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ReviewDetails;
