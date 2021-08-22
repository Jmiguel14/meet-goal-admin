import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, Row, Form, Button, message, Modal } from "antd";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ListOfNews } from "../../components/ListOfNews";
import { UpdateNewsModal } from "../../components/UpdateNewsModal";
import { Routes } from "../../constants/routes";
import { uploadImage } from "../../firebase/client";
import {
  deleteNewsItem,
  listenLatestNews,
  updateNewsItem,
} from "../../firebase/NewsServices";
import { NewsFormValues } from "../../types";
import "./styles.less";

const News = () => {
  const [news, setNews] = useState<firebase.firestore.DocumentData>();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [newsItem, setNewsItem] = useState<NewsFormValues>(
    {} as NewsFormValues
  );

  const [imgURL, setImgURL] = useState<string>("");
  const [task, setTask] = useState<firebase.storage.UploadTask>();

  const history = useHistory();
  const [form] = Form.useForm();

  const { confirm } = Modal;

  useEffect(() => {
    const unsubscribe = listenLatestNews(setNews);
    return () => unsubscribe && unsubscribe();
  }, []);

  useEffect(() => {
    if (task) {
      const onProgress = () => {
        console.log("onProgress");
      };
      const onError = () => {
        console.log("onError");
      };
      const onComplete = () => {
        console.log("onComplete");
        task.snapshot.ref.getDownloadURL().then(setImgURL);
      };

      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);

  const showModal = (newsItem: NewsFormValues) => {
    setIsVisibleModal(true);
    const { image } = newsItem;
    setImgURL(image);
    setNewsItem(newsItem);
    form.setFieldsValue({
      title: newsItem.title,
      description: newsItem.description,
      source: newsItem.source,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const task = uploadImage(file);
    setTask(task);
  };

  const handleClick = () => {
    history.push(Routes.CREATE_NEWS);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNewsItem(id);
      message.success("Noticia eliminada exitosamente!");
    } catch (e) {
      message.error(`Ocurrió un error de tipo ${e}`);
    }
  };

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: "¿Esta seguro que desea eliminar la noticia?",
      icon: <ExclamationCircleOutlined />,
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const onFinish = async (values: NewsFormValues) => {
    const { title, description, source } = values;
    if (imgURL === "")
      return message.error("Debe establecer una imagen en la noticia!");
    try {
      await updateNewsItem(newsItem.id!, {
        title,
        description,
        source,
        image: imgURL,
      });
      message.success("Noticia actualizada exitosamente!");
    } catch (e) {
      message.error(`Ocurrio un error del tipo ${e}`);
    }
  };

  return (
    <>
      <Row className="title">
        <Col>
          <p className="title_of_news_page">Noticias</p>
        </Col>
        <Col>
          <Button onClick={handleClick} type="primary">
            Ir a crear
          </Button>
        </Col>
      </Row>

      <ListOfNews
        news={news}
        onShowModal={showModal}
        onShowDeleteConfirm={showDeleteConfirm}
      />

      <UpdateNewsModal
        onSetIsVisibleModal={setIsVisibleModal}
        onSetImgURL={setImgURL}
        onFinish={onFinish}
        onHandleImageChange={handleImageChange}
        isVisibleModal={isVisibleModal}
        form={form}
        newsItem={newsItem}
        imgURL={imgURL}
      />
    </>
  );
};

export default News;
