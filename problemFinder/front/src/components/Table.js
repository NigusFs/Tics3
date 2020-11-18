import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Table, Tag} from 'antd';


function ViewProblem  (pk) {

    console.log(pk);
}
       

function TableProblems(props) {

  const list_category = () =>{
    //aca debe exitir un arreglo que guarde todos las categorias de cada problema (una sola vez, ya que estos se repiten)
    // hacer una llamada al back para obtener todas las categorias izi
  }

  const columns =[
    {
      title: "Title",
      render : data=>(
        <Link to={'/Problem/'+data.pk}>{data.title}</Link>
       ),
       sorter: {
        compare: (a, b) => a.title.length - b.title.length,
        sortDirections: ['descend'],
      }
    },
    {
      title: "Category",
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
      title: "Difficulty",
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