

import React, {useEffect, useState, Content} from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

import './Problem.css';
import PdfMake from '../components/PdfMake';
import {Button, Collapse, message, PageHeader, Tag, Typography } from 'antd';
import ModalLogin from '../components/ModalLogin';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MathJax from 'react-mathjax2'

const { Title, Paragraph  } = Typography;
const { Panel } = Collapse;



const is_user_auth = () => {
  const token = sessionStorage.getItem("token")
  if (token){
    return true
  }
  return false
}

const deleteProblem = (id, title) => {
  fetch(`http://127.0.0.1:8000/finder/problem/${id}`, {
      method: 'DELETE',
  }).then((response)=>{
      if (response.status === 200){
        message.success(`Se elimino el problema "${title}"`,7);
        setTimeout(()=>{window.history.back();},1500);
      } else {
        message.error(`No se pudo eliminar el problema  "${title}" `, 5); 
      }
  })
}

function Problem ({match}){
  const [data_problem, setData] = useState([]);
  const is_auth = is_user_auth()
  console.log(is_auth)
  const fetchTable = () => {
    fetch(`http://127.0.0.1:8000/finder/problem/${match.params.Id}`)
    .then(res => res.json())
    .then(json => {
      return setData(json) 
    });     
  }

  const getPageHeaderExtras = () => {
    let extras = [
      <PdfMake data={data_problem}/>
    ]
    if(is_auth) {
      extras.push(<Link to={'/Edit/Problem/'+data_problem.pk}> <Button key="2">Editar</Button> </Link>)
      extras.push(<Button danger onClick={() => {deleteProblem(data_problem.pk, data_problem.title)}}>Eliminar</Button>)
    }
    return extras
  }

  useEffect(() => {
    fetchTable();
  }, []);
  
  console.log(localStorage)
    return(  
      <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title= { <Title style={{display: 'flex'}} level={2}> {data_problem.title}</Title>}
        subTitle ={data_problem.difficulty}
        extra={getPageHeaderExtras()}
      >
      {
        (data_problem.categories) ?
        (
          data_problem.categories.map((tag, index) => (
            <Tag color="blue" key={tag.name}>
              <a key={index} href={`/list-filter/category/${tag.name}`}> {tag.name}</a>
            </Tag>))
        ) : null
      }
      <Paragraph>{"\n \n"}{"\n \n"}</Paragraph>
      <Paragraph>
            {(data_problem.content)?(data_problem.content.split('\n').map(line =>
               <Paragraph>
                 <MathJax.Context input='ascii'
                  script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
                  options={ {
                asciimath2jax: {
                     useMathMLspacing: true,
                     delimiters: [["$$$","$$$"], ["~","~"]],
                     preview: "none",
                }
            } }>
                  <MathJax.Text inline text={ line }/>
                 </MathJax.Context>
                
                 {/*aux(line)*/}        
               </Paragraph>

               )):null}
      </Paragraph>
      <Paragraph>
        <Title level={3}> Testcases</Title>
        { 
          (data_problem.tests) ?
          (
            data_problem.tests.map((tests, index) => (
              <div key={index}>
                <Collapse>
                  <Panel header={"Input "+index}>{tests.input_data.split('\n').map((input, index) => <Paragraph key={index}>{input}</Paragraph>)}</Panel>
                  <Panel header={"Output "+index}>{tests.output_data.split('\n').map((output,index) => <Paragraph key={index}>{output}</Paragraph>)}</Panel>           
                </Collapse>
              </div>
            ))
          ) : null}
        </Paragraph>
      </PageHeader>
    </div>    
  );
    
}  

export default Problem;