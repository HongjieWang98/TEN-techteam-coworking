import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import Input from '../../components/common/Input';
import { useSellContext } from '../../contexts/SellContext';
import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { listTextbook } from '../../api/textbook';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import './ListingPage.css'

export default function ListingPage() {
  const [condition, setCondition] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setListing } = useSellContext();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  //handle form submission to upload to database
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (formRef?.current) {
      const formData = new FormData(formRef.current);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      setListing(data);

      try {
        // server side validation needed
        await listTextbook({
          isbn: data['isbn'],
          title: data['title'],
          author: data['author'],
          edition: data['edition'],
          department: data['department'],
          course_number: data['courseNumber'],
          price: data['price'],
          notes: data['notes'],
          condition: condition,
          seller_id: currentUser.id,
          buyer_id: null,
          orgazation_id: currentUser.organization_id
       });
        navigate('/sell/confirmation/');
      } catch (error) {
        console.error('Error uploading data to database: ', error);
      }

      setIsLoading(false);
    }
  }

  const handleChange = (event) => {
    setCondition(event.target.value);
  };

  return (
    <Container className="listing-page-container">
      <h2 className="text-left mb-0">List your item!</h2>
      <br />
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Row>
          <Col md={4}>
            <div className="image-placeholder">
              <p>Ability to upload textbook photo coming soon!</p>
            </div>
          </Col>
          <Col md={8}>
            <Row className="form-row">
              <Col md={12}>
                <Input name="isbn" label="ISBN" placeholder="978123345488777" type="number" isLoading={isLoading} required />
              </Col>
            </Row>
            <Row className="form-row">
              <Col md={6}>
                <Input
                  name="title"
                  label="Title"
                  placeholder="Stats: Modeling the World"
                  type="text"
                  isLoading={isLoading}
                  required
                />
              </Col>
              <Col md={2}>
                <Input name="edition" label="Edition" placeholder="1" type="text" isLoading={isLoading} />
              </Col>
              <Col md={4}>
                <Input name="author" label="Author" placeholder="John Smith" type="text" isLoading={isLoading} />
              </Col>
            </Row>
            <Row className="form-row">
              <Col md={4}>
                <Input name="department" label="Department" placeholder="BIO" type="text" isLoading={isLoading} required />
              </Col>
              <Col md={4}>
                <Input name="courseNumber" label="Course Number" placeholder="1" type="text" isLoading={isLoading} required />
              </Col>
              <Col md={4}>
                <Input name="price" label="Price" placeholder="10" type="number" isLoading={isLoading} required />
              </Col>
            </Row>
            <Row className="form-row">
              <Col md={12}>
                <label>
                  <b> Condition </b>
                  <select value={condition} onChange={handleChange} className="form-control">
                    <option value="1">1: Pages missing or writing on most pages</option>
                    <option value="2">2: No pages missing but writing on most pages</option>
                    <option value="3">3: No writing on any pages, but some pages might be bent</option>
                    <option value="4">4: Lightly used; very minor usage visible</option>
                    <option value="5">5: Like new</option>
                  </select>
                </label>
              </Col>
            </Row>
            <Row className="form-row">
              <Col md={12}>
                <Input
                  name="notes"
                  label="Notes (e.g., is an access code or CD included?)"
                  placeholder="Access code included"
                  type="text"
                  isLoading={isLoading}
                />
              </Col>
            </Row>
            <Row className="justify-content-center"> 
              <Button type="submit" disabled={isLoading} className="btn btn-primary w-100 mt-2 mx-auto">
              Submit Listing
              </Button>
              <div className="w-100 text-center mt-2">
                By continuing, you accept our <a href="/privacy">privacy policy</a> and <a href="/terms">terms and conditions</a>.
              </div>
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}