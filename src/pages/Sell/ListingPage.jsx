import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import Input from '../../components/common/Input';
import { useSellContext } from '../../contexts/SellContext';
import { doc, addDoc, collection } from "firebase/firestore/lite"; 
import { db, app, auth } from '../../firebase/firebase_config';
import React, { useEffect } from 'react';


export default function ListingPage() {
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setListing } = useSellContext();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const userId = currentUser ? currentUser.uid : null;

  const fetchUserData = async () => {
    if (userId) {
      try {
        const userDoc = await app.firestore().collection('users').doc(userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          console.log('User data:', userData);
        } else {
          console.log('User document not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  //handle form submission to upload to database
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
        addDoc(collection(db, 'items'), {
          isbn: data['isbn'],
          title: data['title'],
          author : data['author'],
          edition: data['edition'],
          course_number: data['courseNumber'],
          price: data['price'],
          notes: data['notes'],
          condition: answer,
          seller_id: userId
        });
        navigate('/sell/confirmation/');
      }
      catch(error) {
        console.error('Error uploading data to database: ', error);
      }

    setIsLoading(false);
    }
  }

  const handleChange = (event) => {
    setAnswer(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      {/* TODO: Need to add input validation */}
      <Input
        name="Organization"
        label="Organization"
        placeholder="Tufts University"
        type="text"
        isLoading={isLoading}
        required
      />
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
      <Input name="edition"
      label="Edition"
      placeholder="1"
      type="text"
      isLoading={isLoading} 
      />
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
      <label>
          Condition
          <select value={answer} onChange={handleChange}>
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
      <button type="submit" disabled={isLoading}>Submit</button>
    </form>
  );
}
