import React, {useEffect, useState, Content} from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Table, Tag, Space } from 'antd';
const { Column, ColumnGroup } = Table;

function ViewProblem  (pk) {

    console.log(pk);
}
       

function TableProblems() {
  
  const [data, setData] = useState([]);

  const fetchTable = () => {
    fetch('http://127.0.0.1:8000/finder/problems')
        .then(res => res.json())
        .then(json => setData(json));
  }
  useEffect(() => {
    fetchTable();
  }, []);

  return (
       
    <Table dataSource={data}>
     
     <Column title="Title" key="title" 
     render={data=>(
      <Link to={'Problem/'+data.pk}>{data.title}</Link>
     )}
     /> 
    <Column title="Dificulty" dataIndex="difficulty" key="age" />
    
    <Column
      title="Categories"
      dataIndex="categories"
      key="categories"
      render={categories => (
        <>
          {categories.map(tag => (
            <Tag color="blue" key={tag.name}>
              {tag.name}
            </Tag>
          ))}
        </>
      )}
    />
    
    
  </Table>
        
        
    

  );
}

export default TableProblems;