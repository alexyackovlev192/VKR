import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NoDataMessage from '../../components/NoDataMessage'; 
import axios from 'axios';
import { Button, Card, ListGroup } from 'react-bootstrap';

const GekPage = () => {
  const [geks, setGeks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchGeks = async () => {
      try {
        const gekResponse = await axios.get('http://localhost:5000/gecs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const fetchedGeks = gekResponse.data;
        const updatedGeks = await Promise.all(fetchedGeks.map(async (gek) => {
          try {
            const compResponse = await axios.get(`http://localhost:5000/gecComposition/${gek.id_G}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            const compositions = await Promise.all(compResponse.data.map(async (comp) => {
              const memberResponse = await axios.get(`http://localhost:5000/users/${comp.id_U}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              return { ...comp, member: memberResponse.data };
            }));

            const directsResponse = await axios.get(`http://localhost:5000/directions/${gek.id_D}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            const secretariesResponse = await axios.get(`http://localhost:5000/users/${gek.id_U}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            return { 
              ...gek, 
              compositions, 
              directs: directsResponse.data, 
              secretary: secretariesResponse.data 
            };
          } catch (error) {
            console.error('Ошибка при загрузке данных ГЭК:', error);
            return { ...gek, compositions: [], directs: [], secretary: null };
          }
        }));

        setGeks(updatedGeks);
      } catch (error) {
        console.error('Ошибка при загрузке ГЭК:', error);
      }
    };

    fetchGeks();
  }, []);

  const handleEndClick = async (data) => {
    const token = localStorage.getItem('token');
    const status = "Завершила работу";

    try {
      await axios.put(`http://localhost:5000/gecs/EndWork/${data.id_G}`, { Status: status }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Обновление списка ГЭК после успешного завершения работы
      setGeks(prevGeks => prevGeks.filter(gek => gek.id_G !== data.id_G));
    } catch (error) {
      console.error('Ошибка при завершении ГЭК:', error);
    }
  }

  return (
    <div className="container-fluid px-5">
      <div className="text-center my-4">
        <h3 className="my-4">Экзаминационные комиссии</h3>
        <Link to={`/create-gek`}>
          <Button variant="primary" className="col-2 py-2">Создать новую ГЭК</Button>
        </Link>
      </div>
      <div className="row justify-content-evenly">
        {geks.length > 0 ? (
          geks.map(gekData => (
            <Card key={gekData.id_G} style={{ minWidth: '400px', width: '30%' }} className="col-4 my-4 text-center bg-light">
              <Card.Header className="fs-4 bg-light">ГЭК №{gekData.id_G}</Card.Header>
              <Card.Body>
                <Card.Title className="text-center fs-5">Направление</Card.Title>
                <ListGroup className="text-center">
                  <ListGroup.Item>{gekData.directs.Name_direction}</ListGroup.Item>
                </ListGroup>
                <Card.Title className="text-center fs-5">Состав</Card.Title>
                <ListGroup className="text-center rounded-3">
                  {gekData.compositions && gekData.compositions.map((comp, compIndex) => (
                    <div key={compIndex}>
                      <ListGroup.Item>{comp.member.Fullname} - {comp.member.Post}</ListGroup.Item>
                    </div>
                  ))}
                </ListGroup>
                <Card.Title className="text-center fs-5">Секретарь</Card.Title>
                <ListGroup className="text-center">
                  <ListGroup.Item>{gekData.secretary.Fullname}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Footer className="text-left bg-light">
                <div className="">
                  <Link to={`/edit-gek/${gekData.id_G}`}>
                    <Button variant="primary" className="mx-3 my-1">Редактировать</Button>
                  </Link>
                  <Button variant="danger" className="mx-3 my-1" onClick={() => handleEndClick(gekData)}>Завершить работу</Button>
                </div>
              </Card.Footer>
            </Card>
          ))
        ) : (
          <NoDataMessage />
        )}
      </div>
    </div>
  );
};

export default GekPage;