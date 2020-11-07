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

  const list_category = () =>{
    
  }

  const columns =[
    {
      title: "Title",
      render : data=>(
        <Link to={'Problem/'+data.pk}>{data.title}</Link>
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
       
    <Table dataSource={data} columns={columns}/>
     
    
        
        
    

  );
}

export default TableProblems;