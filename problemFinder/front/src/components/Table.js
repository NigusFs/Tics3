import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Table, Tag} from 'antd';


 

function TableProblems(props) {

  const checkdiff=(a,b)=>{
   const diff=["Facil","Medio","Dificil", ""];
   const a_value=diff.indexOf(a);
   const b_value=diff.indexOf(b);
    return  a_value -  b_value;
  } 
  
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
      sorter: (a, b) => { 
        
        return checkdiff(a.difficulty,b.difficulty);
      }
      
    }

  ];
  return (
       
    <Table dataSource={props.list_problems} columns={columns}/>
     
    
        
        
    

  );
}

export default TableProblems;