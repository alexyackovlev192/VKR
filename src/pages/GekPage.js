import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './style-pages/GekPage.css';

import geksData from '../data/geksData.json';

const GekPage = () => {
  return (
    <div className="gek-container">
      <div className="row justify-content-evenly">
        {geksData.map(gekData => (
          <Card key={gekData.id} style={{ width: '30%' }} className="col-2 my-4 text-center bg-light">
            <Card.Header className="fs-4">ГЭК №{gekData.number}</Card.Header>
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
      </div>
    </div>
  );
};

export default GekPage;