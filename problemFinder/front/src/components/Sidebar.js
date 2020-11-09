import { Layout, Menu } from 'antd';
import React from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const { SubMenu } = Menu;

class SideBar extends React.Component {
    state = {
      collapsed: false,
    };
  
    onCollapse = collapsed => {
      console.log(collapsed);
      this.setState({ collapsed });
    };
    
    render() {
      const { collapsed } = this.state;
      return (
        <Layout>
          
            <div className="logo" />
            <Menu theme="dark"  mode="inline" defaultOpenKeys={['sub2']}>

              <Menu.Item key="10" icon={<FileOutlined />}>
                <Link to ="/">Descargar</Link> 
              </Menu.Item>
              
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Dificultad">
                <Menu.Item key="6"> <a href="/list-filter/difficulty/Facil">Facil</a> </Menu.Item>
                <Menu.Item key="8"> <a href="/list-filter/difficulty/normal">Normal</a></Menu.Item>
                <Menu.Item key="9"><a href="/list-filter/difficulty/Alta">Alta</a></Menu.Item>
              </SubMenu>

              <SubMenu key="sub1" icon={<UserOutlined />} title="Categorias">
                <Menu.Item key="3">graph</Menu.Item>
                <Menu.Item key="4">...</Menu.Item>
                <Menu.Item key="5">lista de categorias....</Menu.Item>
              </SubMenu>
              
            </Menu>
          
          </Layout>

          
      );
    }
  }
  // hay q definir bien como se guardaran las dificultades en la base para dejar eso fijo
  // use href porq con Link no cambiaba la tabla :s


export default SideBar;