import { Form, Input, Button, Row, Col, Typography, FormInstance } from "antd";
import "./styles.less";

interface LoginFormProps {
  form: FormInstance<any> | undefined;
  onFinish: ((values: any) => void) | undefined;
  onReset: React.MouseEventHandler<HTMLElement> | undefined;
}

const { Title, Text } = Typography;

export const LoginForm = ({ form, onFinish, onReset }: LoginFormProps) => {
  return (
    <>
      <Row justify="center">
        <Col>
          <Title level={2}>INICIAR SESIÓN</Title>
        </Col>
      </Row>

      <Row className="formContent">
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
            <Row justify="center">
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
      </Row>
      <br />

      <Row justify="center">
        <Col>
          <Text type="secondary">¿Olvidó su contraseña?</Text>
        </Col>
      </Row>
    </>
  );
};
