import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, Row, Form, Button, message, Modal } from "antd";
import firebase from "firebase";
import { Search } from "../../components/Search";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ListOfNews } from "../../components/ListOfNews";
import { UpdateNewsModal } from "../../components/Modals/UpdateNewsModal";
import { Routes } from "../../constants/routes";
import { uploadNewsImage } from "../../firebase/client";
import {
  deleteNewsItem,
  listenLatestNews,
  updateNewsCover,
  updateNewsItem,
} from "../../firebase/NewsServices";
import { NewsFormValues } from "../../types";
import "./styles.less";
import { toTitleCase } from "../../utils/toTitleCase";

const News = () => {
  const [news, setNews] = useState<firebase.firestore.DocumentData>();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [newsToLowerCase, setNewsToLowerCase] = useState<NewsFormValues[]>([]);
  const [filteredNews, setFilteredNews] = useState<
    NewsFormValues[] | undefined | firebase.firestore.DocumentData
  >([]);
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
    const newsToLowerCase = news?.map((newData: NewsFormValues) => {
      const { title } = newData;
      const titleToLowerCase = title?.toLowerCase();
      return {
        ...newData,
        title: titleToLowerCase,
      };
    });
    setNewsToLowerCase(newsToLowerCase);
  }, [news]);

  useEffect(() => {
    if (searchText) {
      const newListOfNews = newsToLowerCase?.filter((newData) =>
        newData.title?.includes(searchText.toLowerCase())
      );

      const newListMapped = newListOfNews?.map((newData) => {
        const { title } = newData;
        const titleToTitleCase = toTitleCase(title)!;
        return {
          ...newData,
          title: titleToTitleCase,
        };
      });
      setFilteredNews(newListMapped);
    } else {
      setFilteredNews(news);
    }
  }, [newsToLowerCase, searchText, news]);

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
        task.snapshot.ref.getDownloadURL().then((url) => {
          setImgURL(url);
          updateNewsCover(newsItem.id!, url);
        });
        message.success("La imagen se ha cambiado exitosamente!");
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
    const task = uploadNewsImage(file, newsItem.id!);
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

      <Search
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Buscar por titulo"
      />

      <ListOfNews
        news={filteredNews}
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
