
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
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
      okText="Conectarse"
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
  const [visible, setVisible] = useState(true);
  const history = useHistory();

  const onCreate = values => {
    const formData= new FormData();
    formData.append('username', values.username);
    formData.append('password', values.password);

    fetch('http://127.0.0.1:8000/auth/',{
      method: 'POST',
      body : formData
    })
    .then(response => response.json())
    .then(res_json => {
      if(res_json.token){
        sessionStorage.setItem('token', res_json.token)
        message.success('Se ha conectado correctamente', 3)
        window.history.back()
      } else {
        message.warning('Error al auntentificar', 5);
      }
    })
  }

  return (
    <div>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {window.history.back()}}
      />
    </div>
  );
};
export default ModalLogin;