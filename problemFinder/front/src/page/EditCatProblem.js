import React, {useEffect, useState, Content} from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom'
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
  const history = useHistory()
  
  var arr_categories=[];
  
  const onFill = () => {
    if (data_problem.categories){
     (data_problem.categories.map(tag => (
          
      arr_categories.push(tag.name)
     )))
     
    }

    
     form.setFieldsValue({ categories:  arr_categories });
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
    const formData= new FormData();
    formData.append('categories', values.categories);
 
  fetch(`http://127.0.0.1:8000/finder/category/${data_problem.pk}`,{
    method: 'POST',
    body: formData

    }).then((response)=>{

    if (response.status === 200){
      
      
      message.success(`Se edito la categoria del problema "${data_problem.title}"`,7);
          
      setTimeout(()=>{history.push('/');},1500);
     
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
