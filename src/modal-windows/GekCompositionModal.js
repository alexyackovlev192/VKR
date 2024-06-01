import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, ListGroup, Form } from 'react-bootstrap';

const GeksCompositionModal = ({ showModal, handleCloseModal, schedules }) => {
  const [geks, setGeks] = useState([]);
  const [emails, setEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState('info');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchGeksForSchedule = async (sched) => {
      try {
        const compResponse = await axios.get(`http://localhost:5000/gecComposition/${sched.id_G}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const members = await Promise.all(compResponse.data.map(async (comp) => {
          const memberResponse = await axios.get(`http://localhost:5000/users/${comp.id_U}`, {
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          });
          return memberResponse.data;
        }));
    
        const idSecResponse = await axios.get(`http://localhost:5000/gecs/SecretaryId/${sched.id_G}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        const secretarieResponse = await axios.get(`http://localhost:5000/users/${idSecResponse.data.id_U}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        return {
          members,
          secretary: secretarieResponse.data
        };
      } catch (error) {
        console.error('Ошибка при загрузке данных ГЭК:', error);
        return { members: [], secretary: {} }; 
      }
    };

    const fetchAllGeks = async () => {
      const results = await Promise.all(schedules.map(sched => fetchGeksForSchedule(sched)));
      setGeks(results);
      
      const emails = results.reduce((acc, gec) => {
        const memberEmails = gec.members.map(member => member.Mail);
        return [...acc, ...memberEmails, gec.secretary.Mail];
      }, []);
      
      console.log('Collected emails:', emails);
      setEmails(emails);
    };
  
    if (schedules.length > 0) {
      fetchAllGeks();
    }
  }, [schedules]);

  const handleClose = () => {
    setCurrentPage('info');
    handleCloseModal();
  };

  const handleSendNotifications = async () => {
    const token = localStorage.getItem('token');
    const to = emails.join(', ');
    
    console.log('Emails to send:', to); // Логирование строки email-адресов
  
    try {
      await axios.post(`http://localhost:5000/mailer/send`, {
        to,
        subject,
        text
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert('Уведомления отправлены успешно');
      setCurrentPage('info');
    } catch (error) {
      console.error('Ошибка при отправке уведомлений:', error);
      alert('Ошибка при отправке уведомлений');
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{currentPage === 'info' ? 'Информация о защите' : 'Отправить уведомления'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentPage === 'info' ? (
          schedules.map((sched, index) => (
            <div key={index}>
              <h5>Направление</h5>
              <ListGroup>
                <ListGroup.Item>{sched.Name_direction}</ListGroup.Item>
              </ListGroup>
              <h5 className="mt-3">Время</h5>
              <ListGroup>
                <ListGroup.Item>{sched.time}</ListGroup.Item>
              </ListGroup>
              <h5 className="mt-3">Аудитория</h5>
              <ListGroup>
                <ListGroup.Item>{sched.classroom}</ListGroup.Item>
              </ListGroup>
              <h5 className="mt-3">Дата</h5>
              <ListGroup>
                <ListGroup.Item>{new Date(sched.date).toLocaleDateString('ru-GB')}</ListGroup.Item>
              </ListGroup>
              {geks.length > 0 && geks.map((gec, index) => (
                <div key={index}>
                  <h5 className="mt-3">Состав ГЭК №{schedules[index].id_G}</h5>
                  {gec.members.map((member, idx) => (
                    <ListGroup key={idx}>
                      <ListGroup.Item>{member.Fullname}</ListGroup.Item>
                    </ListGroup>
                  ))}
                  <h5 className="mt-3">Секретарь</h5>
                  <ListGroup>
                    <ListGroup.Item>{gec.secretary.Fullname}</ListGroup.Item>
                  </ListGroup>
                </div>
              ))}
            </div>
          ))
        ) : (
          <Form>
            <Form.Group controlId="formTextarea">
              <Form.Label>Текст сообщения</Form.Label>
              <Form.Control as="textarea" rows={3} value={text} onChange={(e) => setText(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formInput1" className="mt-3">
              <Form.Label>Тема сообщения</Form.Label>
              <Form.Control type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        {currentPage === 'info' ? (
          <>
            <Button variant="primary" onClick={() => setCurrentPage('notifications')}>
              Отправить уведомления
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Закрыть
            </Button>
          </>
        ) : (
          <>
            <Button variant="primary" onClick={handleSendNotifications}>
              Отправить
            </Button>
            <Button variant="secondary" onClick={() => setCurrentPage('info')}>
              Назад
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default GeksCompositionModal;