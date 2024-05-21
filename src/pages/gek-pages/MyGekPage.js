import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 

const MyGekPage = () => {
  const [geks, setGeks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const id_U = decodedToken.id_U; // Extracting id_U from token

    const fetchGeks = async () => {
      try {
        const gekResponse = await axios.get(`http://localhost:5000/gecComposition/UserGecs/${id_U}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const detailedGeks = await Promise.all(gekResponse.data.map(async (gek) => {
          try {
            // Fetch detailed GEC information
            const detailedGekResponse = await axios.get(`http://localhost:5000/gecs/${gek.id_G}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            const detailedGek = detailedGekResponse.data;

            // Fetch compositions
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
              return { ...comp, member: memberResponse.data || {} };
            }));

            // Fetch directions
            const directsResponse = await axios.get(`http://localhost:5000/directions/${detailedGek.id_D}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            // Fetch secretaries
            const secretariesResponse = await axios.get(`http://localhost:5000/users/${detailedGek.id_U}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            return { 
              ...detailedGek, 
              compositions, 
              directs: directsResponse.data || {},
              secretary: secretariesResponse.data || {}
            };
          } catch (error) {
            console.error('Error loading detailed GEC data:', error);
            return { ...gek, compositions: [], directs: {}, secretary: {} };
          }
        }));

        setGeks(detailedGeks);
      } catch (error) {
        console.error('Error loading GECs:', error);
      }
    };

    fetchGeks();
  }, []);

  return (
    <div className="container-fluid text-center my-3">
      <h4 className="col-12">Мои ГЭК</h4>
      <div className="row justify-content-evenly">
        {geks.map((gek, index) => (
          <Card key={index} style={{ minWidth: '400px', width: '30%' }} className="col-4 my-4 text-center bg-light">
            <Card.Header className="fs-4 bg-light">ГЭК №{gek.id_G}</Card.Header>
            <Card.Body>
              <Card.Title className="text-center fs-5">Направление</Card.Title>
              <ListGroup className="text-center">
                <ListGroup.Item>{gek.directs.Name_direction || ''}</ListGroup.Item>
              </ListGroup>
              <Card.Title className="text-center fs-5">Состав</Card.Title>
              <ListGroup className="text-center">
                {gek.compositions.map((comp, compIndex) => (
                  <ListGroup.Item key={compIndex}>
                    {comp.member.Fullname || ''} - {comp.member.Post || ''}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Card.Title className="text-center fs-5">Секретари</Card.Title>
              <ListGroup className="text-center">
                <ListGroup.Item>{gek.secretary.Fullname || ''}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyGekPage;