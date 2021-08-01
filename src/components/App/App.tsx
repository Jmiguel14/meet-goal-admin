import { Layout } from "antd";
import './App.less';
import { Login } from "../Login";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div>
      <Layout>
        <Header className="header">Hello</Header>
        <Content className="content">
          <Login />
        </Content>
        <Footer className="footer"></Footer>
      </Layout>
    </div>
  );
}

export default App;
