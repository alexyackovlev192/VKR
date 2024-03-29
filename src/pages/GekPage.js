import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style-pages/GekPage.css';

import geksData from '../data/geksData.json';

const GekPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedGekData, setSelectedGekData] = useState(null);

  const handleCloseModal = () => setShowModal(false);

  const handleCardHeaderClick = (gekData) => {
    setSelectedGekData(gekData);
    setShowModal(true);
  };

  return (
    <div className="gek-container">
      <div className="row justify-content-evenly">
        {geksData.map(gekData => (
          <Card key={gekData.id} style={{ width: '30%' }} className="col-2 my-4 text-center bg-light">
            <Card.Header className="fs-4" onClick={() => handleCardHeaderClick(gekData)}>ГЭК №{gekData.number}</Card.Header>
            <Card.Body> 
              <Card.Title className="text-center fs-5">Состав</Card.Title>
              <ListGroup className="text-center">
                {gekData.members.map((member, index) => (
                  <ListGroup.Item key={index}>{member.name} - {member.position}</ListGroup.Item>
                ))}
              </ListGroup>
              <Card.Title className="text-center fs-5">Секретари</Card.Title>
              <ListGroup className="text-center">
                {gekData.secretaries.map((secretary, index) => (
                  <ListGroup.Item key={index}>{secretary.name}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        ))}

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Редактирование ГЭК</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* Здесь вы можете добавить поля для редактирования информации о ГЭК */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={handleCloseModal}>
              Сохранить изменения
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default GekPage;