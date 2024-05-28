import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, ListGroup } from 'react-bootstrap';

const ListDefendersForSchedulePage = () => {
  const [schedules, setschedules] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchschedules = async () => {
      try {
        const scheduleResponse = await axios.get('http://localhost:5000/defenseSchedule/thisYear', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const updatedSchedules = await Promise.all(scheduleResponse.data.map(async (sched) => {
          try {
            const defenderResponse = await axios.get(`http://localhost:5000/defenseScheduleStudents/${sched.id_DS}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            const defendersData = await Promise.all(defenderResponse.data.map(async (student) => {
              const defenderResponse = await axios.get(`http://localhost:5000/students/${student.id_S}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              return { ...student, defender: defenderResponse.data };
            }));

            const directsResponse = await axios.get(`http://localhost:5000/directions/${sched.id_D}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            return { 
              ...sched, 
              defendersData, 
              directs: directsResponse.data, 
            };
          } catch (error) {
            console.error('Ошибка при загрузке данных о студентах:', error);
            return { ...sched, defendersData: [], directs: [] };
          }
        }));

        setschedules(updatedSchedules);
      } catch (error) {
        console.error('Ошибка при загрузке данных о студентах:', error);
      }
    };

    fetchschedules();
  }, []);


  return (
    <div className="container-fluid text-center my-3">            
      <div className="row my-3">
        <Link to={`/defenders`} className="col-1">
            <Button variant="primary" className="">Назад</Button>
        </Link>
        <h4 className="col-10">Составы защищающихся</h4>
      </div>
      <div className="row justify-content-evenly">
        {schedules && schedules.map(data => (
          <Card key={data.id_DS} style={{ minWidth: '400px', width: '30%' }} className="col-4 my-4 text-center bg-light">
            <Card.Header className="fs-4 bg-light">Защита №{data.id_DS}</Card.Header>
            <Card.Body>
              <Card.Title className="text-center fs-5">Направление</Card.Title>
              <ListGroup className="text-center">
                <ListGroup.Item>{data.directs.Name_direction}</ListGroup.Item>
              </ListGroup>
              <Card.Title className="text-center fs-5">Список студентов</Card.Title>
              <ListGroup className="text-center rounded-3">
                {data.defendersData && data.defendersData.map((stud, compIndex) => (
                  <div key={compIndex}>
                    <ListGroup.Item>{stud.defender.Fullname}</ListGroup.Item>
                  </div>
                ))}
              </ListGroup>
            </Card.Body>
            <Card.Footer className="text-left bg-light">
              <Link to={`/list-defenders-edit/${data.id_DS}`}>
                <Button variant="primary" className="mx-3">Редактировать</Button>
              </Link>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListDefendersForSchedulePage;