import React from 'react';
import './ListFilter.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Typography } from "antd";
import {useEffect, useState} from 'react';

import Table from '../components/Table';
import Sidebar from '../components/Sidebar';

import 'antd/dist/antd.css'
import { Layout } from 'antd';
const { Title } = Typography;

const { Content, Sider } = Layout;


function ListFilterDif ({match}){
  const [data_filter, setData] = useState([]);

  const fetchTable = () => {
     
    fetch(`http://127.0.0.1:8000/finder/filter/category/${match.params.category}`)
        .then(res => res.json())
        .then(json => setData(json));
      }
      useEffect(() => {
        fetchTable();
      }, []);

        return(
            
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
            <Title level={4}>Problemas con la categoria: {match.params.category}</Title>
           <Table list_problems={data_filter}/>
        </Content>
        
      </Layout>
                               
            
        );
    
} 


export default ListFilterDif;