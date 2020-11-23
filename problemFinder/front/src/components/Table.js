import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Table, Tag} from 'antd';


 

function TableProblems(props) {

 
  const columns =[
    {
      title: "Título",
      render : data=>(
        <Link to={'/Problem/'+data.pk}>{data.title}</Link>
       ),
       sorter: {
        compare: (a, b) => a.title.length - b.title.length,
        sortDirections: ['descend'],
      }
    },
    {
      title: "Categoría",
      dataIndex: "categories",
      render: categories => (
        <>
          {categories.map(tag => (
            <Tag color="blue" key={tag.name}>
              {tag.name}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Dificultad",
      dataIndex: "difficulty",
      sorter: {
        compare: (a, b) => a.difficulty.length - b.difficulty.length,
        sortDirections: ['descend'],
      }
      
    }

  ];
  return (
       
    <Table dataSource={props.list_problems} columns={columns}/>
     
    
        
        
    

  );
}

export default TableProblems;