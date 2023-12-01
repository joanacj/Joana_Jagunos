import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AddStudent from './component/AddStudent';
import StudentList from './component/StudentList';
import './css/styles.css';

const App = () => {
  const [refreshList, setRefreshList] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);

  const handleAddStudent = () => {

    setRefreshList(true);
  };

  const handleViewStudentList = () => {

    setRefreshList(true);

    setShowStudentList(true);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1></h1>
          {!showStudentList && (
            <AddStudent
              onAddStudent={handleAddStudent}
              onViewStudentList={handleViewStudentList}
            />
          )}
        </Col>
        <Col>
          {showStudentList && <StudentList key={refreshList} />}
        </Col>
      </Row>
    </Container>
  );
};

export default App;