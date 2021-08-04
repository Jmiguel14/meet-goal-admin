import { Form } from "antd";
import { useHistory } from "react-router-dom";
import { LoginForm } from "../../components/LoginForm";
import { Routes } from "../../constants/routes";
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
    try {
      await login(email, password);
      history.push(Routes.NEWS);
      form.resetFields();
    } catch (error) {
      console.log(error);
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
