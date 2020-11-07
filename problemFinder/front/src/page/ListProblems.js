import React from 'react';
import './ListProblems.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import Table from '../components/Table';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import 'antd/dist/antd.css'
import { Layout } from 'antd';


const { Header, Content, Footer, Sider } = Layout;


//este puede ser el index basico que tenga la barra de navegacion y el foot // 30 es para colocar el buscador
class ListProblems extends React.Component {
  render() {
    
    return (
      

        <Layout style={{ minHeight: '100vh' }}>
          <Sider width={200} className="site-layout-background">
            <Sidebar/>
          </Sider>
      

        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}>
            <Table/>
        </Content>
              
      </Layout>


    );
  }
}




export default ListProblems;