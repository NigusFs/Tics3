

import React, {useEffect, useState, Content} from 'react';
import { PageHeader, Button, Descriptions } from 'antd';

import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

import './Problem.css';
import { Collapse } from 'antd';
import PdfMake from '../components/PdfMake';
import { Tag } from 'antd';
import { Typography } from 'antd';


const { Title, Paragraph  } = Typography;

const { Panel } = Collapse;




function Problem ({match}){
  const [data_problem, setData] = useState([]);
  var auth1=false;

  
  const fetchTable = () => {
     
    fetch(`http://127.0.0.1:8000/finder/problem/${match.params.Id}`)
        .then(res => res.json())
        .then(json => {
          return setData(json) 
          
        } );
        
      }
      useEffect(() => {
        fetchTable();
      }, []);

  var newtext = (data_problem.content)?(data_problem.content.split('\n').map(str => <Paragraph>{str}</Paragraph>)):null;
  console.log(data_problem)
        return(
      <div>
        
         
          <div className="site-page-header-ghost-wrapper">
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title= { <Title level={2}> {data_problem.title}</Title>}
      subTitle ={data_problem.difficulty}
      
      tags={
        (data_problem.categories)?
        (data_problem.categories.map(tag => (
            <Tag color="blue" key={tag.name}>
              {tag.name}
            </Tag>)))

        :null}

      extra={
        [(auth1)?(<Button danger>Eliminar</Button>):<Button danger disabled>Eliminar</Button>, 
        <Button key="2">Editar</Button>,
        <PdfMake data={data_problem}/>
      ]}
    >
      <Paragraph>
      {newtext}
     </Paragraph>
     <Paragraph>
      <Title level={3}> Testcases</Title>
     
      
      { (data_problem.tests)?
        (data_problem.tests.map((tests,index) => (
            <div>
              <Collapse>
              <Panel header="Input" key={index}>{tests.input_data.split('\n').map(str => <Paragraph>{str}</Paragraph>)}</Panel>
              <Panel header="Output" key={index}>{tests.output_data.split('\n').map(str => <Paragraph>{str}</Paragraph>)}</Panel>
                            
            </Collapse>
            </div>
            )))

        :null}
        
              
          
     
     </Paragraph>
    
    </PageHeader>
  </div>,
       
          </div > 
              
        
         
        );
    
}  

export default Problem;