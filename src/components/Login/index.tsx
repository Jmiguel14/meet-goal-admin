import { Form, Input, Button, Row, Col, Typography } from "antd";
import "./styles.less";

const { Title, Text } = Typography;

export const Login = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className='formC'>
      <Row justify="center">
        <Col>
          <Title level={2}>INICIAR SESIÓN</Title>
        </Col>
      </Row>

      <Row className='formContent'>
        <Col>
          <Form form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="email" label="Correo" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Row justify='center'>
              <Col>
                <Button type="primary" htmlType="submit">
                  Ingresar
                </Button>
              </Col>
              <Col>
                <Button htmlType="button" onClick={onReset}>
                  Borrar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row><br/>

      <Row justify="center">
        <Col>
          <Text type="secondary">¿Olvidó su contraseña?</Text>
        </Col>
      </Row>
    </div>
  );
};
