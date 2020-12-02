import React, {useEffect, useState, Content} from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button, Select } from 'antd';
import { Typography } from "antd";
import { PageHeader } from 'antd';
import ModalLoginEdit from '../components/ModalLoginEdit';
import { Popconfirm } from 'antd';

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
  
  const cat=['Graph','asdasd']
  const aux=[];
  var aux2=[];
   
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

      setTimeout(()=>{ onFill();},50);
      
      //console.log(data_problem)

  const onFinish = (values) => {
    aux2=values;
    const aas=23;
    const formProblem=new FormData();
    console.log(values.Dificultad)
    formProblem.append('title', values.Titulo);
    formProblem.append('categories', values.Categoria);
    formProblem.append('difficulty', values.Dificultad);
    formProblem.append('content', values.Enunciado);
    //colocar un append a un arreglo que tenga todos los input y out separados por testcase
    formProblem.append('tests', []);
    //console.log(aux)
    //console.log(values.Categoria)
    if (JSON.stringify(aux)!==JSON.stringify(values.Categoria)){
      values.Categoria=values.Categoria.split(",")
    console.log("si")
  }

  fetch(`http://127.0.0.1:8000/finder/edit/problem/${data_problem.pk}`,{
    method: 'PUT',
    body : formProblem
  }).then((response)=>{

    if (response.status == 200){
      //message.success(`Se modifico el problema "${data_problem.title}"`,7);
      console.log("no")
     // setTimeout(()=>{window.history.back();},1500);
  }else{
    console.log("")
   // message.error(`No se pudo modificar el problema  "${data_problem.title}" `, 5);
    
  }
  
  })


    console.log(values);
    console.log(values.Titulo);
  };

  const onReset = () => {
    window.history.back();
  };

  const onFill = () => {
   if (data_problem.categories){
    (data_problem.categories.map(tag => (
         
      aux.push(tag.name)
    )))
   }
    form.setFieldsValue({
      Titulo: data_problem.title,
      Categoria: (data_problem.categories)?
      (data_problem.categories.map(tag => (
         
            tag.name
          )))

      :null,
      Dificultad: data_problem.difficulty,
      Enunciado: data_problem.content,
      Tests_in: (data_problem.tests)?
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
  
  

  return (



    <PageHeader
      onBack={() => window.history.back()}
      title= { <Title level={3}> Editando el Problema "{data_problem.title}" </Title>}
         
    >

<Paragraph>
    
    <Form   form={form} name="control-hooks"  layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="Titulo"
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
        name="Categoria"
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
      </Form.Item>
      
      <Form.Item
        name="Dificultad"
        label={  <PageHeader
          className="site-page-header"
          title={<Title level={3}>Dificultad</Title>}
          
        />}
        
      >
         <TextArea
          placeholder="Inserte  Categorias"
          autoSize
        />
      </Form.Item>
      <Form.Item
        name="Enunciado"
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

      {/*{ (data_problem.tests)?
                (data_problem.tests.map((tests,index) => (
                    <div>
                      <Form.Item
        name="Tests_in"
        label={  <PageHeader
          className="site-page-header"
        title={<Title level={3}>Testcase Input {index}</Title>}/>}
        
      >
         <TextArea
          placeholder="Inserte  Tescase Input"
          autoSize
        />
      </Form.Item>
                      
                                 
                      
           <Form.Item
        name="Tests_out"
        label={  <PageHeader
          className="site-page-header"
          title={<Title level={3}>Testcase Output {index}</Title>}/>}
        
      >
         <TextArea
          placeholder="Inserte  Tescase Output"
          autoSize
        />
      </Form.Item>


                    </div>
                    )))
                    :null
                    
                    }

    { (data_problem.tests&&data_problem.tests.length===0)? <div>
                      <Form.Item
        name="Tests_in"
        label={  <PageHeader
          className="site-page-header"
        title={<Title level={3}>Testcase Input </Title>}/>}
        
      >
         <TextArea
          placeholder="Inserte  Tescase Input"
          autoSize
        />
      </Form.Item>
                      
                                 
                      
           <Form.Item
        name="Tests_out"
        label={  <PageHeader
          className="site-page-header"
          title={<Title level={3}>Testcase Output</Title>}/>}
        
      >
         <TextArea
          placeholder="Inserte  Tescase Output"
          autoSize
        />
      </Form.Item>


        </div>:null}*/}


      <Form.Item {...tailLayout}>
    {/* <ModalLoginEdit id_problem={data_problem.pk} title_problem={data_problem.title} edit_problem={aux2} />*/}
       
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
