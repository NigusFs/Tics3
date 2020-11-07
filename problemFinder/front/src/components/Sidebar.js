import { Layout, Menu } from 'antd';
import React from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';


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
            <Menu theme="dark"  mode="inline">
              
              <SubMenu key="sub1" icon={<UserOutlined />} title="Categorias">
                <Menu.Item key="3">graph</Menu.Item>
                <Menu.Item key="4">...</Menu.Item>
                <Menu.Item key="5">lista de categorias....</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Dificultad">
                <Menu.Item key="6">Facil</Menu.Item>
                <Menu.Item key="8">...lista...</Menu.Item>
              </SubMenu>
              <Menu.Item key="9" icon={<FileOutlined />}>
                Descargar
              </Menu.Item>
            </Menu>
          
          </Layout>

          
      );
    }
  }
  


export default SideBar;