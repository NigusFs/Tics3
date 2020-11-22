import React from "react";
import "./ListFilterDif.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";

import Table from "../components/Table";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "antd/dist/antd.css";
import { Layout } from "antd";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

//este puede ser el index basico que tenga la barra de navegacion y el foot
// 30 es para colocar el buscador

function ListFilterDif({ match }) {
  const [data_filter, setData] = useState([]);

  const fetchTable = () => {
    fetch(
      `http://127.0.0.1:8000/finder/filter/difficulty/${match.params.difficulty}`
    )
      .then((res) => res.json())
      .then((json) => setData(json));
  };
  useEffect(() => {
    fetchTable();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="site-layout-background">
        <Sidebar />
      </Sider>

      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Table list_problems={data_filter} />
        {console.log(data_filter)}
        {console.log(
          `http://127.0.0.1:8000/finder/filter/difficulty/${match.params.difficulty}`
        )}
      </Content>
    </Layout>
  );
}

export default ListFilterDif;
