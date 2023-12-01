import React, { useState, useEffect } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddStudent from './AddStudent';

const StudentList = ({ onRemoveStudent, onAddStudent }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addStudentVisible, setAddStudentVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    AsyncStorage.getItem('students').then((data) => {
      console.log('Fetched Data:', data);
      if (data) {
        setStudents(JSON.parse(data));
      }
    });
  };

  const removeStudent = () => {
    const updatedStudents = students.filter(
      (student) => student.username !== selectedStudent.username
    );

    AsyncStorage.setItem('students', JSON.stringify(updatedStudents)).then(() => {
      onRemoveStudent();
      setModalVisible(false);
    });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: '#',
        accessor: '',
      },
      {
        Header: 'Name',
        accessor: (row) => `${row.firstname} ${row.lastname}`,
      },
      {
        Header: 'Course',
        accessor: 'course',
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'Password',
        accessor: 'password',
      },
    ],
    []
  );

  const handleRowClick = (row) => {
    setSelectedStudent(row.original);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openAddStudent = () => {
    setAddStudentVisible(true);
  };

  const closeAddStudent = () => {
    setAddStudentVisible(false);
  };

  return (
    <>
      <Table striped bordered hover style={{ zIndex: '1', position: 'relative' }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.Header}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.username} onClick={() => handleRowClick({ original: student })}>
              <td>{index + 1}</td>
              {columns.slice(1).map((column) => (
                <td key={column.Header}>{typeof column.accessor === 'function' ? column.accessor(student) : student[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Button
        variant="primary"
        onClick={openAddStudent}
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '40%',
          transform: 'translateX(-50%)',
          backgroundColor: 'purple',
          zIndex: '5',
          padding: '15px',
          fontSize: '1.2em',
        }}
      >
        Add Student
      </Button>

      <Modal
        show={modalVisible}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-90w"
        aria-labelledby="modal-title"
        style={{ zIndex: '10' }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
            <div style={{ marginBottom: '30px' }}>
              <strong>Name:</strong> {selectedStudent && `${selectedStudent.firstname} ${selectedStudent.lastname}`}
            </div>
            <div style={{ marginBottom: '30px' }}>
              <strong>Course:</strong> {selectedStudent && selectedStudent.course}
            </div>
            <div style={{ marginBottom: '30px' }}>
              <strong>Username:</strong> {selectedStudent && selectedStudent.username}
            </div>
            <div>
              <strong>Password:</strong> {selectedStudent && selectedStudent.password}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-space-between w-100">
            <Button
              variant="secondary"
              onClick={closeModal}
              style={{ backgroundColor: 'purple' }}
            >
              Close
            </Button>
            <div style={{ width: '50px' }} />
            <Button
              variant="danger"
              onClick={removeStudent}
              style={{ backgroundColor: 'pink' }}
            >
              Remove Student
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {addStudentVisible && (
        <AddStudent
          onAddStudent={() => {
            fetchData();
            closeAddStudent();
            onAddStudent();
          }}
          onViewStudentList={closeAddStudent}
          setShowStudentList={setAddStudentVisible}
        />
      )}
    </>
  );
};

export default StudentList;