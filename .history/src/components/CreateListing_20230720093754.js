// ApplicationForm.js
import React, { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import firebase from '../firebase/firebase_config';

function writeUserData(id, isbn, titleName, ed) {
  const db = getDatabase();
  set(ref(db, 'book-lists/' + id), {
    ISBN: isbn,
    Title: titleName,
    Edition: ed,
    
  });
}

const ApplicationForm = () => {
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
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    writeUserData(2, formData.ISBN, formData.Title, formData.Edition);
    console.log('hi');
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="ISBN">ISBN:</label>
        <input
          type="text"
          id="ISBN"
          name="ISBN"
          value={formData.ISBN}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="Title">Title:</label>
        <input
          type="text"
          id="Title"
          name="Title"
          value={formData.Title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="Edition">Edition:</label>
        <input
          type="text"
          id="Edition"
          name="Edition"
          value={formData.Edition}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="Edition">Department:</label>
        <input
          type="text"
          id="Department"
          name="Department"
          value={formData.Department}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="Edition">CourseNumber:</label>
        <input
          type="text"
          id="CourseNumber"
          name="CourseNumber"
          value={formData.Edition}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="Edition">Price:</label>
        <input
          type="text"
          id="Price"
          name="Price"
          value={formData.Price}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplicationForm;
