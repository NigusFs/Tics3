import { Layout, Menu } from 'antd';
import React from 'react';
import {
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  

const { SubMenu } = Menu;

class SideBar extends React.Component {
    state = {
      collapsed: false,
      data: [],
    };
  
    onCollapse = collapsed => {
      console.log(collapsed);
      this.setState({ collapsed });
    };

    componentDidMount(){
      fetch('http://127.0.0.1:8000/finder/categories')
      .then(response => response.json())
      .then(data => this.setState({data}));


    }
    
    render() {
      const { collapsed } = this.state;
      
      return (
        <Layout>
          
            <div className="logo" />
            <Menu theme="dark"  mode="inline" defaultOpenKeys={['sub2','sub1']}>

              {/*<Menu.Item key="10" icon={<FileOutlined />}>
                <Link to ="/">Descargar</Link> 
              </Menu.Item>
              */}
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Dificultad">
                <Menu.Item key="6"> <a href="/list-filter/difficulty/Facil">Fácil</a> </Menu.Item>
                <Menu.Item key="8"> <a href="/list-filter/difficulty/Medio">Medio</a></Menu.Item>
                <Menu.Item key="9"><a href="/list-filter/difficulty/Dificil">Dificil</a></Menu.Item>
              </SubMenu>

              <SubMenu key="sub1" icon={<UserOutlined />} title="Categorías">

                {this.state.data.map(tag => (
                  <Menu.Item key={tag.name}>
                    <a href={"/list-filter/category/" + tag.name}>{tag.name}</a>
                  </Menu.Item>
                ))}
              </SubMenu>
              
            </Menu>
          
          </Layout>

          
      );
    }
  }
  // hay q definir bien como se guardaran las dificultades en la base para dejar eso fijo
  // use href porq con Link no cambiaba la tabla :s


export default SideBar;