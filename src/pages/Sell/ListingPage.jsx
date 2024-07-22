import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import Input from '../../components/common/Input';
import { useSellContext } from '../../contexts/SellContext';
import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { listTextbook } from '../../api/textbook';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import './ListingPage.css'

export default function ListingPage() {
  const [condition, setCondition] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setListing } = useSellContext();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { getCurrentUser } = useAuthContext();
  const currentUser = getCurrentUser();

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
    <div> 
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">List your book!</h2>

        <form onSubmit={handleSubmit} ref={formRef}>
          {/* TODO: Need to add input validation */}
          <Input name="isbn" label="ISBN" placeholder="978123345488777" type="number" isLoading={isLoading} required />
          <Input
            name="title"
            label="Title"
            placeholder="Stats: Modeling the World"
            type="text"
            isLoading={isLoading}
            required
          />
          <Input name="edition" label="Edition" placeholder="1" type="text" isLoading={isLoading} />
          <Input name="author" label="Author" placeholder="John Smith" type="text" isLoading={isLoading} />
          <Input name="department" label="Department" placeholder="BIO" type="text" isLoading={isLoading} required />
          <Input name="courseNumber" label="Course Number" placeholder="101" type="text" isLoading={isLoading} required />
          <Input name="price" label="Price" placeholder="10" type="number" isLoading={isLoading} required />
          <label>
            Condition
            <select value={condition} onChange={handleChange}>
              <option value="poor">Poor</option>
              <option value="fair">Fair</option>
              <option value="good">Good</option>
              <option value="very_good">Very Good</option>
              <option value="like_new">Like New</option>
            </select>
          </label>
          <Input
            name="notes"
            label="Notes (e.g., is an access code or CD included?)"
            placeholder="Access code included"
            type="text"
            isLoading={isLoading}
          />  

            <button type="submit" disabled={isLoading} className="btn btn-primary w-100">
              Submit
            </button>

        </form>

      </Card.Body>
    </Card>

    <div className="w-100 text-center mt-2">
    By continuing, you accept our <a href="/Privacy">privacy policy</a> and <a href="/Terms">terms and conditions</a>.
    </div>



  </div>
  );
}
