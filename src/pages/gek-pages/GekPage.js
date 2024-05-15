import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, ListGroup } from 'react-bootstrap';

const GekPage = () => {
  const [geks, setGeks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:5000/gecs', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      const fetchedGeks = response.data;
      setGeks(fetchedGeks);

      fetchedGeks.forEach(gek => {
        axios.get(`http://localhost:5000/gecComposition/${gek.id_G}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(compResponse => {
          const compositions = compResponse.data;

          const compositionPromises = compositions.map(comp => 
            axios.get(`http://localhost:5000/users/${comp.id_U}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }).then(memberResponse => ({
              ...comp,
              members: memberResponse.data
            }))
          );

          Promise.all(compositionPromises)
          .then(compositionsWithMembers => {
            axios.get(`http://localhost:5000/directions/${gek.id_D}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            .then(directsResponse => {
              const directs = directsResponse.data;

              setGeks(prevGeks => {
                return prevGeks.map(g => {
                  if (g.id === gek.id) {
                    return { ...g, compositions: compositionsWithMembers, directs };
                  }
                  return g;
                });
              });
            })
            .catch(error => console.error('Ошибка при загрузке директорий:', error));
          });
        })
        .catch(error => console.error('Ошибка при загрузке составов:', error));
      });
    })
    .catch(error => console.error('Ошибка при загрузке ГЭК:', error));
  }, []);

  console.log(geks);


 return (
    // <div className="container-fluid text-center my-3">
    //   <Link to={`/create-gek`}>
    //     <Button variant="primary" className="col-2 py-2">Создать новую ГЭК</Button>
    //   </Link>
    //   <div className="row justify-content-evenly">
    //     {geks && geks.map(gekData => (
    //       <Card key={gekData.id} style={{ minWidth: '400px', width: '30%' }} className="col-4 my-4 text-center bg-light">
    //         <Card.Header className="fs-4 bg-light">ГЭК №{gekData.number}</Card.Header>
    //         <Card.Body>
    //           <Card.Title className="text-center fs-5">Состав</Card.Title>
    //           <ListGroup className="text-center">
    //             {gekData.compositions && gekData.compositions.map((comp, compIndex) => (
    //               <div key={compIndex}>
    //                 {comp.members && comp.members.map((member, memberIndex) => (
    //                   <ListGroup.Item key={memberIndex}>{member.Fullname} - {member.Post}</ListGroup.Item>
    //                 ))}
    //               </div>
    //             ))}
    //           </ListGroup>
    //           <Card.Title className="text-center fs-5">Секретарь</Card.Title>
    //           <ListGroup className="text-center">
    //             {gekData.secretaries && gekData.secretaries.map((secretary, index) => (
    //               <ListGroup.Item key={index}>{secretary.name}</ListGroup.Item>
    //             ))}
    //           </ListGroup>
    //           <Card.Title className="text-center fs-5">Направления</Card.Title>
    //           <ListGroup className="text-center">
    //             {gekData.directs && gekData.directs.map((direct, index) => (
    //               <ListGroup.Item key={index}>{direct.name}</ListGroup.Item>
    //             ))}
    //           </ListGroup>
    //         </Card.Body>
    //         <Card.Footer className="text-left bg-light">
    //           <Link to={`/edit-gek/${gekData.id}`}>
    //             <Button variant="primary" className="mx-3">Редактировать</Button>
    //           </Link>
    //           {/* <Button variant="danger" className="mx-3" onClick={() => handleDeleteGek(gekData.id)}>Удалить</Button> */}
    //         </Card.Footer>
    //       </Card>
    //     ))}
    //   </div>
    // </div>
    <div></div>
  );
};

export default GekPage;