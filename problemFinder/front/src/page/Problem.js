

import React, {useEffect, useState, Content} from 'react';
import { PageHeader, Button, Descriptions } from 'antd';

import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

import './Problem.css';
import { Collapse } from 'antd';
import PdfMake from '../components/PdfMake';
import { Tag } from 'antd';
import { Typography } from 'antd';
import ModalLogin from '../components/ModalLogin';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const { Title, Paragraph  } = Typography;

const { Panel } = Collapse;




function Problem ({match}){
  const [data_problem, setData] = useState([]);


  
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
      
      console.log(data_problem.title)
        return(
      
        
         
        <div className="site-page-header-ghost-wrapper">
    <PageHeader
      
      ghost={false}
      onBack={() => window.history.back()}
      
      title= { <Title    level={2}> {data_problem.title}</Title>}
      subTitle ={data_problem.difficulty}
      
      

      extra={
        [
        <ModalLogin id_problem={data_problem.pk} title_problem={data_problem.title} />,
        <Link to={'/Edit/Problem/'+data_problem.pk}> <Button key="2">Editar</Button> </Link>,     
        <PdfMake data={data_problem}/>
      ]}
    >
      {(data_problem.categories)?
        (data_problem.categories.map(tag => (
           <Tag color="blue" key={tag.name}>
              <a href={`/list-filter/category/${tag.name}`}> {tag.name}</a>
            </Tag>   )))

        :null}
        <Paragraph>{"\n \n"}{"\n \n"}</Paragraph>
        
        <Paragraph>
             {(data_problem.content)?(data_problem.content.split('\n').map(content => <Paragraph>{content}</Paragraph>)):null}
        </Paragraph>
        <Paragraph>
              <Title level={3}> Testcases</Title>
            
              { (data_problem.tests)?
                (data_problem.tests.map((tests,index) => (
                    <div>
                      <Collapse>
                        <Panel header={"Input "+index} key={index}>{tests.input_data.split('\n').map(input => <Paragraph>{input}</Paragraph>)}</Panel>
                        <Panel header={"Output "+index} key={index}>{tests.output_data.split('\n').map(output => <Paragraph>{output}</Paragraph>)}</Panel>           
                      </Collapse>
                    </div>
                    )))
                    :null}

        </Paragraph>
    
    </PageHeader>
  </div>
       
         
              
        
         
        );
    
}  

export default Problem;