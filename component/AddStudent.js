import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddStudent = ({ onAddStudent, onViewStudentList, setShowStudentList }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [course, setCourse] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAddStudent = () => {
    const newStudent = { firstname, lastname, course, username, password };

    AsyncStorage.getItem('students').then((data) => {
      const students = data ? JSON.parse(data) : [];
      students.push(newStudent);

      AsyncStorage.setItem('students', JSON.stringify(students)).then(() => {
        onAddStudent();
        setShowStudentList(true);
        showToast(); // Show toast message after successfully adding data
      });
    });

    setFirstname('');
    setLastname('');
    setCourse('');
    setUsername('');
    setPassword('');
  };

  const showToast = () => {
    toast.success('Data Added Successfully', {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div style={{ background: '#C5FFF8', padding: '40px', borderRadius: '10px', maxWidth: '400px', margin: 'auto' }}>
      <Form>
        <Form.Group controlId="firstname">
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="lastname">
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="course">
          <Form.Control
            as="select"
            placeholder="Select Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="" disabled>Select Course</option>
            <option value="BSIT">BSIT</option>
            <option value="BSCS">BSCS</option>
            <option value="BS ELEX">BS ELEX</option>
            <option value="BS ELEC">BS ELEC</option>
            <option value="BS FPSM">BS FPSM</option>
            <option value="BS CRIM">BS CRIM</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="username">
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Row style={{ marginTop: '15px' }}>
          <Col>
            <Button
              variant="primary"
              block
              style={{ backgroundColor: '#ED9ED6' }}
              onClick={() => {
                handleAddStudent();
                showToast();
              }}
            >
              Add Student
            </Button>
          </Col>
        </Row>

        <Row style={{ marginTop: '20px' }}>
          <Col>
            <Button
              variant="info"
              block
              style={{ backgroundColor: '#7071E8' }}
              onClick={onViewStudentList}
            >
              View Student List
            </Button>
          </Col>
        </Row>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddStudent;