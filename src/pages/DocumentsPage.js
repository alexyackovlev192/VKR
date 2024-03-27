import React from 'react';
import { Link } from 'react-router-dom';
import './style-pages/DocumentsStyle.css';

const documentsData = [
  {
    title: "Регламент организации учебного процесса",
    link: "/documents/organization-regulation",
  },
  {
    title: "Правила внутреннего трудового распорядка",
    link: "/documents/employment-rules",
  },
  {
    title: "Положение о порядке предоставления образовательных услуг",
    link: "/documents/educational-services-regulation",
  },
  // Добавьте другие документы по мере необходимости
];

const DocumentsPage = () => {
  return (
    <div className="documents-container">
      <h1 className="documents-title">Документы по регламенту</h1>
      <div className="documents-content">
        <table className="documents-table">
          <thead>
            <tr>
              <th>Название документа</th>
            </tr>
          </thead>
          <tbody>
            {documentsData.map((document, index) => (
              <tr key={index}>
                <td>
                  <Link to={document.link}>{document.title}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentsPage;