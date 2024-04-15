import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

import schedulesData from '../../data/schedulesData.json';

import '../style-pages/MySchedulePage.css';

const MySchedulePage = () => {

  return (
    <div className="container-fluid text-center my-3">
        <h4 className="col-12">Мои защиты</h4>
        <div className="row justify-content-evenly col-12 mx-3">
        {schedulesData.map((item, index) => (
            item.id % 2 === 0 && (
            <Card key={index} className="col-2 mx-2 my-4 text-center bg-light">
                <Card.Body>                
                    <Card.Title>{new Date(item.date).toLocaleDateString('ru', { day: '2-digit', month: '2-digit' })}</Card.Title>
                    <Card.Text>
                    <div>
                        <p>ГЭК №{item.id}</p>
                        <p>Время: {item.time}</p>
                        <p>Направление: {item.direction}</p>
                        <p>Аудитория: {item.room}</p>
                    </div>
                    </Card.Text>
                    <Link to={`/my-schedule/${item.id}`} className="col-1">
                        <Button variant="primary" className="">Начать</Button>
                    </Link>
                </Card.Body>
            </Card>
            ) 
        ))}
        </div>
    </div>
  );
};

export default MySchedulePage;