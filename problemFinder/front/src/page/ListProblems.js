import React from 'react';
import './ListProblems.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Table from '../components/Table';

import Sidebar from '../components/Sidebar';

import 'antd/dist/antd.css'
import { Layout } from 'antd';


const {  Content,  Sider } = Layout;


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