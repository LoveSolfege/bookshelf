import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Form, FormGroup, Label, Input, Button, Alert, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Row, Col } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ReviewForm = () => {
  const { id } = useParams();
  const [book, setBook] = React.useState(null);
  const navigate = useNavigate();
  console.log(book);
  const today = new Date().toISOString().split('T')[0];

  React.useEffect(() => {
    axios.get(`https://openlibrary.org/works/${id}.json`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  const formik = useFormik({
    initialValues: {
      reviewer: 'Davit Zurabiani',
      review: '',
      date: today,
      score: 0
    },
    validationSchema: Yup.object({
      reviewer: Yup.string().required('Reviewer name is required'),
      review: Yup.string().required('Review is required'),
      date: Yup.date().required('Date is required'),
      score: Yup.number().min(0).max(10).required('Score is required')
    }),
    onSubmit: (values) => {
      const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
      const newReview = {
        title: book.title,
        authors: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
        reviewer: values.reviewer,
        review: values.review,
        date: values.date,
        score: values.score,
        cover_i: book.covers ? book.covers[0] : null,
      };
      reviews.push(newReview);
      localStorage.setItem('reviews', JSON.stringify(reviews));
      navigate(`/review/${reviews.length - 1}`);
    },
  });

  if (!book) return <Container>Loading...</Container>;

  return (
    <Container>
      <h2>Review This Book</h2>
      <Card className="mb-3">
        <Row className="g-0">
          <Col md="4" className="d-flex align-items-center">
            {book.covers ? (
              <CardImg
                top
                style={{ width: '150px', height: 'auto', margin: '20px auto' }}
                src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`}
                alt={book.title}
              />
            ) : (
              <div style={{ width: '150px', height: '210px', backgroundColor: '#ddd', margin: '20px auto' }}></div>
            )}
          </Col>
          <Col md="8">
            <CardBody>
              <CardTitle tag="h5">{book.title}</CardTitle>
              <CardSubtitle className="mb-2 text-muted">
                {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                <br />
                Published: {book.first_publish_date || 'Unknown Date'}
              </CardSubtitle>
              <CardText>{book.description ? (typeof book.description === 'string' ? book.description : book.description.value) : 'No description available.'}</CardText>
            </CardBody>
          </Col>
        </Row>
      </Card>
      <Form onSubmit={formik.handleSubmit} className="mt-3">
        <FormGroup>
          <Label for="reviewer">Reviewer</Label>
          <Input
            id="reviewer"
            name="reviewer"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.reviewer}
            className={formik.touched.reviewer && formik.errors.reviewer ? 'is-invalid' : ''}
          />
          {formik.touched.reviewer && formik.errors.reviewer ? (
            <Alert color="danger">{formik.errors.reviewer}</Alert>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label for="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formik.values.date}
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <Label for="score">Score: {formik.values.score}</Label>
          <Input
            id="score"
            name="score"
            type="range"
            min="0"
            max="10"
            step="1"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.score}
            className={formik.touched.score && formik.errors.score ? 'is-invalid' : ''}
            style={{ width: '100%' }}
          />
          {formik.touched.score && formik.errors.score ? (
            <Alert color="danger">{formik.errors.score}</Alert>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label for="review">Review</Label>
          <Input
            id="review"
            name="review"
            type="textarea"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.review}
            className={formik.touched.review && formik.errors.review ? 'is-invalid' : ''}
          />
          {formik.touched.review && formik.errors.review ? (
            <Alert color="danger">{formik.errors.review}</Alert>
          ) : null}
        </FormGroup>
        <Button type="submit" color="primary">Submit</Button>
      </Form>
    </Container>
  );
};

export default ReviewForm;
