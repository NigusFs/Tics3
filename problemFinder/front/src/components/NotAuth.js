import { Result, Button } from 'antd';



function NotAuth() {
    return(
        <Result
            status="403"
            title="403"
            subTitle="Lo siento, no tienes los privilegios para ver esta pagina."
            extra={<Button href="/" type="primary">Inicio</Button>}
        />
    );
}

export default NotAuth;