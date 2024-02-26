// ApplicationForm.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore/lite';
import { Link } from 'react-router-dom';
import { db } from '../firebase/firebase_config';

async function writeUserData() {
  try {
    await addDoc(collection(db, 'users'), {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815
    });
  } catch (e) {
    console.error('Issue submitting item'); // eslint-disable-line no-console
  }
}

function ApplicationForm() {
  const [formData, setFormData] = useState({
    ISBN: '',
    Title: '',
    Edition: '',
    Department: '',
    CourseNumber: '',
    Price: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    writeUserData();
    // formData.ISBN,
    // formData.Title,
    // formData.Edition,
    // formData.Department,
    // formData.CourseNumber,
    // formData.Price
  };

  return (
    <>
      <Link to="/">Click Here to go to Login Page</Link>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ISBN">
            ISBN:
            <input
              type="text"
              id="ISBN"
              name="ISBN"
              value={formData.ISBN}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="Title">
            Title:
            <input
              type="text"
              id="Title"
              name="Title"
              value={formData.Title}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="Edition">
            Edition:
            <input
              type="text"
              id="Edition"
              name="Edition"
              value={formData.Edition}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="Department">
            Department:
            <input
              type="text"
              id="Department"
              name="Department"
              value={formData.Department}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="CourseNumber">
            CourseNumber:
            <input
              type="text"
              id="CourseNumber"
              name="CourseNumber"
              value={formData.CourseNumber}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="Edition">
            Price:
            <input
              type="text"
              id="Price"
              name="Price"
              value={formData.Price}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default ApplicationForm;
