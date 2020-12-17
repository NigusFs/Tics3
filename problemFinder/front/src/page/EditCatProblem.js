import React, {useEffect, useState, Content} from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button, Select } from 'antd';
import { Typography,Collapse } from "antd";
import { PageHeader } from 'antd';
import ModalLoginEdit from '../components/ModalLoginEdit';
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





function EditProblem ({match}){
  const [form] = Form.useForm();
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
      
      
      message.success(`Se edito la categoria del problema "${data_problem.title}"`,7);
          
      setTimeout(()=>{window.history.back();},1500);
     
   }else{
   
   message.error(`No se pudo editar la categoria del problema  "${data_problem.title}" `, 5);
    
    }})

  };

  const onReset = () => {
    window.history.back();
  };


  return (



    <PageHeader
      onBack={() => window.history.back()}
      title= { <Title level={3}> Editando el Problema "{data_problem.title}" </Title>}
    >

<Paragraph>
    
    <Form   form={form} name="control-hooks"  layout="vertical" onFinish={onFinish}>

    {<Form.Item
        name="categories"
        label={  <PageHeader
          className="Categoria"
          title={<Title level={3}>Categoria</Title>}
          subTitle="Separe las categorias con una coma ( , )"
        />}
        
      >
         <TextArea
          placeholder="Inserte  Categorias"
          autoSize
        />
        </Form.Item>}
        
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
    </PageHeader>
  );
};

export default EditProblem
