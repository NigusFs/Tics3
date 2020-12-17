import React, {useEffect, useState, Content} from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button, Select } from 'antd';
import { Typography,Collapse } from "antd";
import { PageHeader } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Popconfirm } from 'antd';
import { message} from 'antd';
const { Panel } = Collapse;
const { TextArea } = Input;


const { Title, Paragraph  } = Typography;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};



const deleteTestcase = (id) => {
  fetch(`http://127.0.0.1:8000/finder/testcase/${id}`, {
      method: 'DELETE',
  }).then((response)=>{
      if (response.status === 200){
        message.success(`Se elimino el testcase "${id}"`,7);
        setTimeout(()=>{window.location.reload();},2000);
      } else {
        message.error(`No se pudo eliminar el testcase  "${id}" `, 5); 
      }
  })
};



function EditProblem ({match}){
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [data_problem, setData] = useState([]);
  
  
  const arr_categories=[];
  
  const onFill = () => {
    if (data_problem.categories){
     (data_problem.categories.map(tag => (
          
       arr_categories.push(tag.name)
     )))
    }
    console.log(arr_categories)
     form.setFieldsValue({
       title: data_problem.title,

       categories:  arr_categories,
       difficulty: data_problem.difficulty,
       content: data_problem.content,
       tests_in: (data_problem.tests)?
       (data_problem.tests.map(test => (
          
              test.input_data
           )))
 
       :null,
       Tests_out: (data_problem.tests)?
       (data_problem.tests.map(test => (
          
              test.output_data
           )))
 
       :null
     });
   
   };
   
  
  
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

      setTimeout(()=>{ onFill();},50); //fill the input text with the previous data
      
      

  const onFinish = (values) => {
    
    console.log(values)

    
    var formBody = [];
    for (var property in values) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(values[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");


  fetch(`http://127.0.0.1:8000/finder/problem/${data_problem.pk}`,{
    method: 'PUT',
    headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
    body: formBody

    }).then((response)=>{

    if (response.status === 200){
      
      
      message.success(`Se edito el problema "${data_problem.title}"`,7);
          
      setTimeout(()=>{window.history.back();},1500);
     
   }else{
   
   message.error(`No se pudo modificar el problema  "${data_problem.title}" `, 5);
    
    }})

  };

  const onReset = () => {
    window.history.back();
  };

  const genExtra = (test_case_id) => (
  <div> 
    <Link to={'/edit/testcase/'+test_case_id}><Button>Editar</Button></Link> {" "}
    <Popconfirm title="Quiere eliminar este testcase？" okText="Si" cancelText="No"  onConfirm={() => {deleteTestcase(test_case_id)}}>
    <Button type="danger">Eliminar</Button> 
    </Popconfirm>
  </div>
   
  );
  return (



    <PageHeader
      onBack={() => window.history.back()}
      title= { <Title level={3}> Editando el Problema "{data_problem.title}" </Title>}
      extra={[
      <Link to={'/edit/category/problem/'+data_problem.pk}> <Button type="primary" key="1">Editar Categoria</Button> </Link>,
      
    ]}
    >

<Paragraph>
    
    <Form   form={form} name="control-hooks"  layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="title"
        label={  <PageHeader
          className="site-page-header"
          title={<Title level={3}>Titulo</Title>}
        />}
        colon={false}
        rules={[
          {
            required: true,
          },
        ]}
      >
        
        <TextArea
          placeholder="Inserte un Titulo"
          autoSize
        />
      </Form.Item>

   
 
        
      <Form.Item
        name="difficulty"
        label={  <PageHeader
          className="site-page-header"
          title={<Title level={3}>Dificultad</Title>}
        />}
        rules={[
          {
            required: true,
          },
        ]}
        
      >
         <TextArea
          placeholder="Inserte Dificultad"
          autoSize
        />
      </Form.Item>
      <Form.Item
        name="content"
        label={  <PageHeader
          className="site-page-header"
          title={<Title level={3}>Enunciado</Title>}/>}
          rules={[
            {
              required: true,
            },
          ]}
        
      >
         <TextArea
          placeholder="Inserte  el Enunciado"
          autoSize
        />
      </Form.Item>



      <Form.Item {...tailLayout}>
    
       
       <Button  type="primary" htmlType="submit">
          Editar
        </Button>
        {" "}
       <Popconfirm title="Quiere cancelar la edición？" okText="Si" cancelText="No" onConfirm={onReset}>
      <Button htmlType="button">
          Cancelar
        </Button>
        </Popconfirm>
      </Form.Item>
    </Form>
    </Paragraph>

    <Paragraph>
        <Title level={3}> Testcases</Title>
        { 
          (data_problem.tests) ?
          (
            data_problem.tests.map((tests, index) => (
              <div key={index}>
                <Collapse>
                <Panel header={`#`+tests.pk } extra={genExtra(tests.pk)} >
                
                    <Paragraph> 
                      <Title level={3}> Input: </Title>
                          {tests.input_data.split('\n').map((input, index) => <Paragraph key={index}>{input}</Paragraph>)}
                    </Paragraph>
                    <Paragraph> 
                      <Title level={3}> Output: </Title>
                        {tests.output_data.split('\n').map((output,index) => <Paragraph key={index}>{output}</Paragraph>)}
                    </Paragraph>
                    
                </Panel>                    
                </Collapse>
              </div>
            ))
          ) : null}
        </Paragraph>
        <Link to={"/add/testcase/problem/"+data_problem.pk}><Button type="primary">Agregar un nuevo Testcase</Button></Link>
              
                    
               
        
            
            
        
    </PageHeader>
  );
};

export default EditProblem
