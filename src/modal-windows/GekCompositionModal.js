import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, ListGroup, Form } from 'react-bootstrap';
import {jwtDecode} from 'jwt-decode';
import Template from '../components/TemplateEmail.txt';
import WarningWindow from '../components/WarningWindow';

const GeksCompositionModal = ({ showModal, handleCloseModal, schedules }) => {
  const [geks, setGeks] = useState([]);
  const [emails, setEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState('info');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [user, setUser] = useState('');
  const [showWarningWindow, setShowWarningWindow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    let userId;

    if (token) {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id_U;
    }

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
    
          let presenceResponse;
          try {
            presenceResponse = await axios.get(`http://localhost:5000/defensePresence/ByIdDSAndIdU?id_DS=${sched.id_DS}&id_U=${comp.id_U}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
          } catch (error) {
            if (error.response && error.response.status === 404) {
              console.warn(`Запись присутствия не найдена для пользователя ${comp.id_U} на защите ${sched.id_DS}`);
              presenceResponse = { data: null };
            } else {
              throw error;
            }
          }
          return { ...memberResponse.data, presence: presenceResponse.data };
        }));
    
        const idSecResponse = await axios.get(`http://localhost:5000/gecs/SecretaryId/${sched.id_G}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        let presenceSecResponse;
        try {
          presenceSecResponse = await axios.get(`http://localhost:5000/defensePresence/ByIdDSAndIdU?id_DS=${sched.id_DS}&id_U=${idSecResponse.data.id_U}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.warn(`Запись присутствия не найдена для пользователя ${idSecResponse.data.id_U} на защите ${sched.id_DS}`);
            presenceSecResponse = { data: null };
          } else {
            throw error;
          }
        }
    
        const secretarieResponse = await axios.get(`http://localhost:5000/users/${idSecResponse.data.id_U}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        const userResponse = await axios.get(`http://localhost:5000/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(userResponse.data);
        return {
          members,
          secretary: { ...secretarieResponse.data, presence: presenceSecResponse.data }
        };
      } catch (error) {
        console.error('Ошибка при загрузке данных ГЭК:', error);
        return { members: [], secretary: {} };
      }
    };

    const fetchAllGeks = async () => {
      try {
        const results = await Promise.all(schedules.map(sched => fetchGeksForSchedule(sched)));
        setGeks(results);
        const emails = results.reduce((acc, gec) => {
          const memberEmails = gec.members.map(member => member.Mail);
          return [...acc, ...memberEmails, gec.secretary.Mail];
        }, []);

        setEmails(emails);
      } catch (error) {
        console.error('Ошибка при загрузке всех ГЭК:', error);
      }
    };

    if (schedules.length > 0) {
      fetchAllGeks();
    }

    const loadTemplate = async () => {
      try {
        const response = await fetch(Template);
        let templateText = await response.text();

        if (schedules.length > 0) {
          const schedule = schedules[0];
          templateText = templateText
            .replace('Name_direction', schedule.Name_direction)
            .replace('_id_DS', schedule.id_DS)
            .replace('date', `${new Date(schedule.date).toLocaleDateString('ru-GB')} в ${schedule.time}`)
            .replace('classroom', schedule.classroom)
            .replace('id_G', schedule.id_G)
            .replace('_id_DS', schedule.id_DS)
            .replace('Name', user.Fullname)
            .replace('Post', user.Post);
        }

        setText(templateText);
      } catch (error) {
        console.error('Ошибка при загрузке шаблона:', error);
      }
    };

    loadTemplate();
  }, [schedules]);

  const handleClose = () => {
    setCurrentPage('info');
    setSubject('');
    handleCloseModal();
  };

  const handleSendNotifications = async () => {
    if (!subject || !text) {
      setErrorMessage('Не все поля заполнены');
      setShowWarningWindow(true);
      return;
    }
  
    const token = localStorage.getItem('token');
    const to = emails.join(', ');
  
    console.log('Emails to send:', to);
  
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
      setErrorMessage('Уведомления успешно отправлены');
      setShowWarningWindow(true);
      setCurrentPage('info');
      setSubject('');
    } catch (error) {
      console.error('Ошибка при отправке уведомлений:', error);
      setErrorMessage('Ошибка при отправке уведомлений');
      setShowWarningWindow(true);
    }
  };

  const handleCloseWarningWindow = () => {
    setShowWarningWindow(false);
  };

  return (
    <>
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
                <h5 className="mt-3">Дата</h5>
                <ListGroup>
                  <ListGroup.Item>{new Date(sched.date).toLocaleDateString('ru-GB')}</ListGroup.Item>
                </ListGroup>
                <h5 className="mt-3">Время</h5>
                <ListGroup>
                  <ListGroup.Item>{sched.time}</ListGroup.Item>
                </ListGroup>
                <h5 className="mt-3">Аудитория</h5>
                <ListGroup>
                  <ListGroup.Item>{sched.classroom}</ListGroup.Item>
                </ListGroup>
                {geks.length > 0 && geks.map((gec, index) => (
                  <div key={index}>
                    <h5 className="mt-3">Состав ГЭК №{schedules[index].id_G}</h5>
                    {gec.members.map((member, idx) => (
                      <ListGroup key={idx}>
                        <ListGroup.Item className="my-1" variant={member.presence ? "success" : "danger"}>
                          {member.Fullname}
                        </ListGroup.Item>
                      </ListGroup>
                    ))}
                    <h5 className="mt-3">Секретарь</h5>
                    <ListGroup>
                      <ListGroup.Item variant={gec.secretary.presence ? "success" : "danger"}>
                        {gec.secretary.Fullname}
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <Form>
              <Form.Group controlId="formTextarea">
                <Form.Label>Текст сообщения</Form.Label>
                <Form.Control as="textarea" rows={12} value={text} onChange={(e) => setText(e.target.value)} />
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
      <WarningWindow 
        show={showWarningWindow} 
        handleClose={handleCloseWarningWindow} 
        errorMessage={errorMessage}
      />
    </>
  );
};

export default GeksCompositionModal;