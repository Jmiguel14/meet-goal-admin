import { Menu } from "antd";
import { MenuMode, MenuInfo } from "rc-menu/lib/interface";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { UserOutlined } from "@ant-design/icons";
import FutbolIcon from "../../icons/FutbolIcon";
import ClubIcon from "../../icons/ClubIcon";
import NewsIcon from "../../icons/NewsIcon";
import "./styles.less";
import { Routes } from "../../constants/routes";
import { useEffect, useState } from "react";

const { Item, SubMenu } = Menu;
interface NavigationProps {
  mode: MenuMode | undefined;
}

export const Navigation = ({ mode }: NavigationProps) => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [menuLocation, setMenuLocation] = useState(location.pathname);

  const handleSigout = async () => {
    try {
      await logout();
      history.push(Routes.LOGIN);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setMenuLocation(location.pathname);
  }, [location]);

  const handleClick = (e: MenuInfo) => {
    const keySelected = e.key;
    setMenuLocation(keySelected);
  };

  return (
    <Menu
      mode={mode}
      className="menu"
      selectedKeys={[menuLocation]}
      onClick={handleClick}
    >
      {currentUser ? (
        <>
          <Item icon={<FutbolIcon />} key={Routes.PLAYERS}>
            <Link to={Routes.PLAYERS}>Futbolistas</Link>
          </Item>
          <Item icon={<ClubIcon />} key={Routes.CLUBS}>
            <Link to={Routes.CLUBS}>Clubes</Link>
          </Item>
          <Item icon={<NewsIcon />} key={Routes.NEWS}>
            <Link to={Routes.NEWS}>Noticias</Link>
          </Item>
          <SubMenu icon={<UserOutlined />} title="Admin" key="Admin">
            <Item key={Routes.PROFILE}>
              <Link to={Routes.PROFILE}>Perfil</Link>
            </Item>
            <Item onClick={handleSigout} key="signout">
              Cerrar sesión
            </Item>
          </SubMenu>
        </>
      ) : location.pathname === Routes.LOGIN ? (
        <Item key="goHome">
          <Link to={Routes.HOME}>Ir al inicio</Link>
        </Item>
      ) : location.pathname === Routes.HOME ||
        location.pathname === Routes.ABOUT ? (
        <>
          <Item key={Routes.HOME}>
            <Link to={Routes.HOME}>Inicio</Link>
          </Item>
          <Item key="services">Servicios</Item>
          <Item key={Routes.ABOUT}>
            <Link to={Routes.ABOUT}>Nosotros</Link>
          </Item>
        </>
      ) : (
        <Item key='void'></Item>
      )}
    </Menu>
  );
};
