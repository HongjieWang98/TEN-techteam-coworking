import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import Input from '../../components/common/Input';
import { useSellContext } from '../../contexts/SellContext';
import { set } from "firebase/database";
import { ref as sRef } from 'firebase/storage';
import { db } from '../../firebase/firebase_config';


export default function ListingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { setListing } = useSellContext();
  const formRef = useRef(null);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log(db);

    if (formRef?.current) {
      const formData = new FormData(formRef.current);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      setListing(data);

      try {
        // const auth = getAuth();
        set(sRef(db, 'items'), {
          isbn: data['isbn'],
          title: data['title'],
          author : data['author'],
          course_number: data['courseNumber'],
          price: data['price'],
          notes: ['notes']
        });
        navigate('/sell/confirmation/');
      }
      catch(error) {
        console.error('Error uploading data to database: ', error);
      }

    setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      {/* TODO: Need to add input validation */}
      <Input
        name="isbn"
        label="ISBN"
        placeholder="978123345488777"
        type="number"
        isLoading={isLoading}
        required
      />
      <Input
        name="title"
        label="Title"
        placeholder="Stats: Modeling the World"
        type="text"
        isLoading={isLoading}
        required
      />
      <Input name="edition" label="Edition" placeholder="1" type="text" isLoading={isLoading} />
      <Input
        name="author"
        label="Author"
        placeholder="John Smit"
        type="text"
        isLoading={isLoading}
      />
      <Input
        name="department"
        label="Department"
        placeholder="BIO"
        type="text"
        isLoading={isLoading}
        required
      />
      <Input
        name="courseNumber"
        label="Course Number"
        placeholder="101"
        type="text"
        isLoading={isLoading}
        required
      />
      <Input
        name="price"
        label="Price"
        placeholder="10"
        type="number"
        isLoading={isLoading}
        required
      />
      <Input
        name="notes"
        label="Notes (e.g., is an access code or CD included?)"
        placeholder="Access code included"
        type="text"
        isLoading={isLoading}
      />
      <button type="submit" disabled={isLoading}>Submit</button>
    </form>
  );
}
