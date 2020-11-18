import React from 'react';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink} from '@react-pdf/renderer'




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

const a= [{"name": "test"}, {"name": "Test"}, {"name": "Graph"}, {"name": "Math"}]
function MyDoc (){

  return (
    <Document>
    <Page style={styles.body}>
     
      <Text style={styles.title}>Titulo</Text>
      <Text style={styles.author}>{
      a.map(tag => (
          `${tag.name} \t` 
            
          ))} 
      </Text>
     
      <Text style={styles.subtitle}>
        Enunciado
      </Text>
       <Text style={styles.text}>
        Es, pues, de saber, que este sobredicho hidalgo, los ratos que estaba
        ocioso (que eran los más del año) se daba a leer libros de caballerías
        con tanta afición y gusto, que olvidó casi de todo punto el ejercicio de
        la caza, y aun la administración de su hacienda; y llegó a tanto su
        curiosidad y desatino en esto, que vendió muchas hanegas de tierra de
        sembradura, para comprar libros de caballerías en que leer; y así llevó
        a su casa todos cuantos pudo haber dellos; y de todos ningunos le
        parecían tan bien como los que compuso el famoso Feliciano de Silva:
        porque la claridad de su prosa, y aquellas intrincadas razones suyas, le
        parecían de perlas; y más cuando llegaba a leer aquellos requiebros y
        cartas de desafío, donde en muchas partes hallaba escrito: la razón de
        la sinrazón que a mi razón se hace, de tal manera mi razón enflaquece,
        que con razón me quejo de la vuestra fermosura, y también cuando leía:
        los altos cielos que de vuestra divinidad divinamente con las estrellas
        se fortifican, y os hacen merecedora del merecimiento que merece la
        vuestra grandeza.
      </Text>
      
       <Text style={styles.subtitle}>
        Testcases
      </Text>
      
      <Text style={styles.text}>
        En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
        mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga
        antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que
        carnero, salpicón las más noches, du
      </Text>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
  );
}


function About(){
    return (
      <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
    );
}

export default About


