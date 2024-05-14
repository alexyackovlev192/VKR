import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, ListGroup } from 'react-bootstrap';

const GekPage = () => {
  const [geks, setGeks] = useState([]); // Хранение данных ГЭК в состоянии
  const [members, setMemberss] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/gecs', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setGeks(response.data);
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));
    axios.get('http://localhost:5000/gecComposition/3', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setMemberss(response.data);
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  // // Функция для удаления ГЭК по идентификатору
  // const handleDeleteGek = (id) => {
  //   // Фильтрация массива ГЭК, оставляя только те, у которых id не совпадает с удаляемым id
  //   const updatedGeks = geks.filter(gek => gek.id !== id);
  //   setGeks(updatedGeks); // Обновление состояния
  // };

  return (
    <div className="container-fluid text-center my-3">
      <Link to={`/create-gek`}>
        <Button variant="primary" className="col-2 py-2">Создать новую ГЭК</Button>
      </Link>

      {/* <div className="row justify-content-evenly">
        {geks.map(gekData => (
          <Card key={gekData.id} style={{ minWidth: '400px', width: '30%' }}  className="col-4 my-4 text-center bg-light">
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
              <Link to={`/edit-gek/${gekData.id}`}>
                <Button variant="primary" className="mx-3">Редактировать</Button>
              </Link>
              <Button variant="danger" className="mx-3" onClick={() => handleDeleteGek(gekData.id)}>Удалить</Button>
            </Card.Footer>
          </Card>
        ))}
      </div> */}
    </div>
  );
};

export default GekPage;