import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import {  Input, Button, Space } from 'antd';

import { SearchOutlined } from '@ant-design/icons'
import { Table, Tag} from 'antd';

const checkdiff=(a,b)=>{
  const diff=["Facil","Medio","Dificil", ""];
  const a_value=diff.indexOf(a);
  const b_value=diff.indexOf(b);
   return  a_value -  b_value;
 }
 
 const checktag=(filter,data)=>{
  for (var elem in data){
    if (data[elem].name.toString().includes(filter.toString())){
      return true;
    } 
  }
 
  return false;
 }


var arr_cat=[];

class TableProblems extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
  };


  componentDidMount(){
    fetch('http://127.0.0.1:8000/finder/categories')
    .then(response => response.json())
    .then(data => this.setState({data}));
    
  }


 
  getColumnSearchProps = (dataIndex,data) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reiniciar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text,data) =>
      this.state.searchedColumn === dataIndex ? (<Link to={'/Problem/'+data.pk}>{text}</Link>) : (
        <Link to={'/Problem/'+data.pk}>{data.title}</Link>
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    this.state.data.map(elem=>( arr_cat.push({text: elem.name, value: elem.name})))
    
    const columns =[
      {
        title: "Título",
        dataIndex:"title",
       
        sorter: (a, b) => { return a.title.localeCompare(b.title)},
        ...this.getColumnSearchProps('title')
      },
      {
        title: "Categoría",
        dataIndex: "categories",
        render: categories => (
          <>
            {categories.map(tag => (
              <Tag color="blue" key={tag.name}>
                 <a href={`/list-filter/category/${tag.name}`}> {tag.name}</a>
              </Tag>
            ))}
          </>
        ),
        filters: arr_cat,
        filterMultiple: false,
        onFilter: (filter, data) => {
        //console.log(filter,data.categories)
         return checktag(filter,data.categories)
        }
        
      },
      {
        title: "Dificultad",
        dataIndex: "difficulty",
        filters: [{text: "Facil",value: "Facil"},{text: "Medio",value: "Medio"},{text: "Dificil",value: "Dificil"}],
        filterMultiple: false,
        onFilter: (filter,data) =>{
          return data.difficulty.toString().includes(filter.toString());
        },
        sorter: (a, b) => { 
          return checkdiff(a.difficulty,b.difficulty);
        }
        
      }
  
    ];
    return <Table dataSource={this.props.list_problems} columns={columns}/>;
  }
}



export default TableProblems;