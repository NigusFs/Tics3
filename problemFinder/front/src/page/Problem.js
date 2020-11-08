

import React, {useEffect, useState, Content} from 'react';


import './Problem.css';
import { Collapse } from 'antd';

const { Panel } = Collapse;
function Problem ({match}){
  const [data_problem, setData] = useState([]);

  const fetchTable = () => {
     
    fetch(`http://127.0.0.1:8000/finder/problem/${match.params.Id}`)
        .then(res => res.json())
        .then(json => setData(json));
      }
      useEffect(() => {
        fetchTable();
      }, []);

        return(
            
                
          <Collapse defaultActiveKey={['1','2']}>
          <Panel header="Title" key="1">
            <p>{data_problem.title}</p>
          </Panel>
          <Panel header="Content" key="2">
            <p>{data_problem.content}</p>
          </Panel>
          <Panel header="Testscase" key="3">
            <p>{data_problem.tests}</p>
          </Panel>
        </Collapse>
                               
            
        );
    
}  

export default Problem;