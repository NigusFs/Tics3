import React from 'react';
import { Card, Col } from 'antd';

function About(){
    return (
        <div>
        <br></br>
        <div style={{display: 'flex', justifyContent: 'center'}}>
    
     
      <Col span={8}>
        <Card style={{textAlign: 'center'}} title="About us" bordered={true}>
        Somos un grupo de estudiantes cursando TICS 3
        </Card>
      </Col>
      
    
  </div>
  </div>
    );
}

export default About