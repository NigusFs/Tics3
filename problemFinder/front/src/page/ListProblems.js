import React from 'react';
import './ListProblems.css';
import 'bootstrap/dist/css/bootstrap.min.css';

<<<<<<< HEAD

import Table from '../components/Table';

=======
import {useEffect, useState} from 'react';

import Table from '../components/Table';
import Navbar from '../components/Navbar';
>>>>>>> 537de7bc1d9307bb872683a3e70cf5c51f8170f1
import Sidebar from '../components/Sidebar';

import 'antd/dist/antd.css'
import { Layout } from 'antd';


<<<<<<< HEAD
const {  Content,  Sider } = Layout;
=======
const { Header, Content, Footer, Sider } = Layout;
>>>>>>> 537de7bc1d9307bb872683a3e70cf5c51f8170f1


//este puede ser el index basico que tenga la barra de navegacion y el foot // 30 es para colocar el buscador
class ListProblems extends React.Component {
  constructor(props){
    super(props);
  
  this.state ={
    data: [],
    };
  }
  componentDidMount(){
    fetch('http://127.0.0.1:8000/finder/problems')
    .then(response => response.json())
    .then(data => this.setState({data}));
  }

  render() {

<<<<<<< HEAD
    
=======
    const aux ={sa: "asdad" };
>>>>>>> 537de7bc1d9307bb872683a3e70cf5c51f8170f1
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
           <Table list_problems={this.state.data}/>
        </Content>
              
      </Layout>


    );
  }
}




export default ListProblems;