import React from 'react';
import './table.css'

const Table = ({ data }) => {
  return (
    <table className='tableBody'>
      <thead>
        <tr>
        <th>#</th>
          <th>Project Title</th>
          <th>Description</th>
          <th>Date Posted</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.Project_Title}</td>
            <td>{item.Description}</td>
            <td>{item.Date_Posted}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
