// ApplicationForm.js
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import firebase from '../firebase/firebase_config';

function writeUserData(id, isbn, titleName, ed, department, courseNo, price) {
  const db = getDatabase();
  set(ref(db, 'Book-lists/' + id), {
    ISBN: isbn,
    Title: titleName,
    Edition: ed,
    Department: department,
    CourseNumber: courseNo,
    Price: price
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

  const [nextBookId, setNextBookId] = useState(null);

  useEffect(() => {
    // Fetch the number of books to determine the next book number
    const db = getDatabase();
    const bookListsRef = ref(db, 'Book-lists');
    onValue(bookListsRef, (snapshot) => {
      // Get the number of children (books) in the "Book-lists" node
      const numberOfBooks = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
      // Calculate the next book ID (e.g., "book2" if there are 1 book currently)
      setNextBookId(numberOfBooks + 1}});
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    writeUserData(2, formData.ISBN, formData.Title, formData.Edition, formData.Department, formData.CourseNumber, formData.Price);
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
          value={formData.CourseNumber}
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
