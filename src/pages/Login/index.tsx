import { message, Form } from "antd";
import { useHistory } from "react-router-dom";
import { LoginForm } from "../../components/LoginForm";
import { Routes } from "../../constants/routes";
import { USERS_MAIL } from "../../constants/users";
import { useAuth } from "../../contexts/AuthContext";
import "./styles.less";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const history = useHistory();

  const onFinish = async (values: LoginFormValues) => {
    const { email, password } = values;
    if (email === USERS_MAIL.ADMIN) {
      try {
        await login(email, password);
        history.push(Routes.NEWS);
        form.resetFields();
        message.success("Inicio de sesión exitoso");
      } catch (error) {
        message.error(`Ocurrió un error de tipo ${error}`);
      }
    } else {
      message.warning("Ingrese un correo de un usuario administrador");
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="form">
      <LoginForm form={form} onFinish={onFinish} onReset={onReset} />
    </div>
  );
};

export default Login;
