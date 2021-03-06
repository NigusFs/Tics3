import React from 'react';

import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink} from '@react-pdf/renderer'


import {Button} from 'antd';


const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'Times-Roman'
  },
  author: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 22,
    margin: 12,
    fontFamily: 'Times-Roman'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },

  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});


function MyDoc (props){
console.log(props)
  return (
    <Document>
    <Page style={styles.body}>
     
  <Text style={styles.title}>{props.data.title}</Text>
      <Text style={styles.author}>{
        (props.data.categories)? (props.data.categories.map(tag => (
         `${tag.name} \t \t` 
            
        )) ) :null}
      </Text>
     
      <Text style={styles.subtitle}>
        Enunciado
      </Text>
       <Text style={styles.text}>
        {(props.data.content)?props.data.content.replaceAll("~"," ").replaceAll("$$$"," "):null}
      </Text>
      
       <Text style={styles.subtitle}>
        Testcases
      </Text>
      
      <Text style={styles.text}>{
        (props.data.tests)? (props.data.tests.map((testscases, index) => (
         `Input ${index+1} :\n  \n ${testscases.input_data} \n
          Output ${index+1 }:\n  \n ${testscases.output_data} \n
         ` 
            
        )) ) :null}
      </Text>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
  );
}


function PdfMake(props){
    return (
     
      <PDFDownloadLink  document={<MyDoc data={props.data}/>} fileName={props.data.title+".pdf"}>
      {({ blob, url, loading, error }) => (loading ? 'Cargando documento...' :<Button key="1" type="primary" > Descargar Problema</Button>)}
    </PDFDownloadLink>
    
    );
}

export default PdfMake


