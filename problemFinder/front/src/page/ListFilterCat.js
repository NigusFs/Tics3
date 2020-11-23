import React from 'react';
import './ListFilter.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {useEffect, useState} from 'react';

import Table from '../components/Table';
import Sidebar from '../components/Sidebar';

import 'antd/dist/antd.css'
import { Layout } from 'antd';


<<<<<<< HEAD
const { Content, Sider } = Layout;
=======
const { Header, Content, Footer, Sider } = Layout;
>>>>>>> 537de7bc1d9307bb872683a3e70cf5c51f8170f1


//este puede ser el index basico que tenga la barra de navegacion y el foot // 30 es para colocar el buscador


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
           <Table list_problems={data_filter}/>
        </Content>
        
      </Layout>
                               
            
        );
    
} 


export default ListFilterDif;