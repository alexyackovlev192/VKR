import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, ListGroup } from 'react-bootstrap';
import geksData from '../../data/geksData.json';

const MyGekPage = () => {

  return (
    <div className="container-fluid text-center my-3">
    <h4 className="col-12">Мои ГЭК</h4>
      <div className="row justify-content-evenly">
        {geksData.map(gekData => (
        gekData.id % 2 === 1 &&
          <Card key={gekData.id} style={{ minWidth: '400px', width: '30%' }} className="col-4 my-4 text-center bg-light">
            <Card.Header className="fs-4 bg-light" >ГЭК №{gekData.number}</Card.Header>
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
            <Card.Footer className="text-left bg-light">
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyGekPage;