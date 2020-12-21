import React, { useEffect, useState, Content } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd';
import { Typography, Collapse } from "antd";
import { PageHeader } from 'antd';
import ModalLoginEdit from '../components/ModalLoginEdit';
import NotAuth from '../components/NotAuth';
import { Popconfirm } from 'antd';
import { message } from 'antd';
const { Panel } = Collapse;
const { TextArea } = Input;


const { Title, Paragraph } = Typography;

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

const is_user_auth = () => {
  const token = sessionStorage.getItem("token")
  if (token) {
    return true
  }
  return false
}


function EditTCaseProblem({ match }) {
  const [form] = Form.useForm();
  const is_auth = is_user_auth()
  const onFinish = (values) => {
    console.log(values)
    const formData = new FormData();

    var formBody = [];
    for (var property in values) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(values[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(`http://127.0.0.1:8000/finder/problem/testcase/${match.params.Id}`, { //change this
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': 'Token ' + sessionStorage.getItem("token")
      },
      body: formBody

    }).then((response) => {

      if (response.status === 201) {
        message.success(`Se agrego un testcase al problema "${match.params.Id}"`, 7);
        setTimeout(() => { window.history.back(); }, 1500);
      } else {
        message.error("No se pudo agregar el testcase", 5);

      }
    })

  };

  const onReset = () => {
    window.history.back();
  };

  return (
    <div>
      {!is_auth ? <NotAuth/> :
      <PageHeader
        onBack={() => window.history.back()}
        title={<Title level={3}> Agregando un Testcase al problema {match.params.Id} </Title>}
      >

      <Form form={form} name="control-hooks" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="input_data"
          label={<PageHeader
            className="site-page-header"
            title={<Title level={3}>Input</Title>}
          />}
          colon={false}

        >

          <TextArea
            placeholder="Inserte input testcase "
            autoSize
          />
        </Form.Item>

        <Form.Item
          name="output_data"
          label={<PageHeader
            className="site-page-header"
            title={<Title level={3}>Output</Title>}
          />}
          colon={false}

        >

          <TextArea
            placeholder="Inserte output testcase "
            autoSize
          />
        </Form.Item>
        <Form.Item {...tailLayout}>


          <Button type="primary" htmlType="submit">
            Agregar
        </Button>
          {" "}
          <Popconfirm title="Quiere cancelar el proceso？" okText="Si" cancelText="No" onConfirm={onReset}>
            <Button htmlType="button">
              Cancelar
        </Button>
          </Popconfirm>
          </Form.Item>
        </Form>
      </PageHeader>
    }
    </div>
    
  );
};

export default EditTCaseProblem
