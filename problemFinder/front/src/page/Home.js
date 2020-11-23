
import { Card } from 'antd';




const { Meta } = Card;

const Home = () => (
    <div>
        <br></br>
      <div style={{display: 'flex', justifyContent: 'center'}}>
          <br></br>
      <Card 
    hoverable
    style={{ width: 300, textAlign: 'center', justifyContent:'center',  alignItems: 'center'}}
    cover={<img alt="example" src="https://i.pinimg.com/originals/e1/28/46/e128469345d94bf048ba6aa204f85a5b.png" />}
  >
    <Meta title="La leyenda de Aang" description="Wallpaper minimalista" />
  </Card>
  </div>
  </div>
  );

export default Home;
  
