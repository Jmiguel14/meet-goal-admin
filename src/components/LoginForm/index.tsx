import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button, Row, Col, Typography, FormInstance } from "antd";
import { LoginFormValues } from "../../types";
import "./styles.less";

interface LoginFormProps {
  form: FormInstance<any> | undefined;
  onFinish: ((values: LoginFormValues) => void) | undefined;
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
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Por favor, ingrese su correo!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Correo" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese su contraseña!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Contraseña"
              />
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
