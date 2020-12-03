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
      sorter: (a, b) => { return a.title.localeCompare(b.title)}
    },
    {
      title: "Categoría",
      dataIndex: "categories",
      render: categories => (
        <>
          {categories.map(tag => (
            <Tag color="blue" key={tag.name}>
               <a href={`/list-filter/category/${tag.name}`}> {tag.name}</a>
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Dificultad",
      dataIndex: "difficulty",
      sorter: (a, b) => { return a.difficulty.localeCompare(b.difficulty)}
      
    }

  ];
  return (
       
    <Table dataSource={props.list_problems} columns={columns}/>
     
    
        
        
    

  );
}

export default TableProblems;