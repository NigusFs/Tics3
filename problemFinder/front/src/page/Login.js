import React from "react";
import "./Login.css";
import { Form, Input, Button, Checkbox } from "antd";
// import Item from "antd/lib/list/Item";
import Password from "antd/lib/input/Password";
const Item = Form.Item;
//ruta ccomo se logeara el usuario
const formSuccess = (datos) => {
  console.log("c:", datos);
};
const formFailed = (error) => {
  console.log(":c", error);
};
function Login() {
  return (
    <div className="containerPrincipal">
      <div className="containerSecundario">
        <Form name="login">
          <Item
            label="User"
            name="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Item>
          <Item
            label="Password"
            name="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Password />
          </Item>
          <Item>
            <Button htmlType="submit">Submit</Button>
          </Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
