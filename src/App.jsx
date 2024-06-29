import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import ReviewForm from './components/ReviewForm';
import ReviewDetails from './components/ReviewDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/add-review/:id" element={<ReviewForm />} />
          <Route path="/review/:id" element={<ReviewDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
