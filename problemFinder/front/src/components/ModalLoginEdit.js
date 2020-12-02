
import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import Cookies from 'js-cookie'
import { message, Space } from 'antd';

interface Values {
  user: string;
  password: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();

  return (
    
    <Modal
      visible={visible}
      title="Autentificacion"
      okText="Editar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form 
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="username"
          label="Usuario"
          rules={[{ required: true, message: 'Rellene este campo' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="password" 
          label="Constraseña"
          rules={[{ required: true, message: 'Rellene este campo' }]}>
          <Input.Password />
        </Form.Item>
        
      </Form>
    </Modal>
    
  );
};



function ModalLogin (props) {
  const [visible, setVisible] = useState(false);
  const [postId, setPostId] = useState(null);
  

  Cookies.set('foo', 'bar')
  //console.log(Cookies.get("foo"))
  
  const onCreate = (values) => {

    const formData= new FormData();
    formData.append('username', values.username);
    formData.append('password', values.password);
    const formProblem=new FormData();
    formProblem.append('title', props.edit_problem.Titulo);
    formProblem.append('categories', props.edit_problem.Categoria);
    formProblem.append('difficulty', props.edit_problem.Dificultad);
    formProblem.append('content', props.edit_problem.Enunciado);
    formProblem.append('tests', []);
//colocar un if si se esta editando o elimando para usar el mismo codigo
    


    fetch('http://127.0.0.1:8000/finder/user/login/',{
      method: 'POST',
      
      body : formData
    })
    .then((response) => {
      if(response.status === 200) {

        fetch(`http://127.0.0.1:8000/finder/edit/problem/${props.id_problem}`,{
        method: 'PUT',
        body : formProblem
      }).then((response)=>{

        if (response.status == 200){
          message.success(`Se modifico el problema "${props.title_problem}"`,7);
          
          setTimeout(()=>{window.history.back();},1500);
      }else{
        message.error(`No se pudo modificar el problema  "${props.title_problem}" `, 5);
        
      }
      
      })

      }else{
        message.warning('Error al auntentificar', 5);
      }

      

    }, (error) => {
      console.log(error);
    });
    
    setVisible(false);
  };

  return (
    <a>
      <Button type="primary"   htmlType="button"
        onClick={() => {
          setVisible(true);
        }}
      >
        Editar
      </Button>
      <CollectionCreateForm
      
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </a>
  );
};
export default ModalLogin;