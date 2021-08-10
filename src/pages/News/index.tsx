import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Card, Col, Row, Form, Input, Button, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Routes } from "../../constants/routes";
import { listtenLatestNews, updateNewsItem, uploadImage } from "../../firebase/client";
import { NewsFormValues } from "../../types";
import "./styles.less";

const News = () => {
  const [news, setNews] = useState<firebase.firestore.DocumentData>();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  console.log("news", news);
  const [newsItem, setNewsItem] = useState<NewsFormValues>(
    {} as NewsFormValues
  );
  console.log("newsItemState", newsItem);

  const [imgURL, setImgURL] = useState<string>("");
  const [task, setTask] = useState<firebase.storage.UploadTask>()

  const history = useHistory();
  const { Meta } = Card;
  const [form] = Form.useForm();

  useEffect(() => {
    const unsubscribe = listtenLatestNews(setNews);
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

  const showModal = (index: number, newsItem: NewsFormValues) => {
    setIsVisibleModal(true);
    console.log("index", index);
    console.log("newsItem", newsItem);
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
    const file = e.target.files![0]
    const task = uploadImage(file)
    setTask(task)
  };

  const handleClick = () => {
    history.push(Routes.CREATE_NEWS);
  };

  const onFinish = async (values: NewsFormValues) => {
    console.log("newsItemFromOnFinish", newsItem);
    const { title, description, source } = values;
    console.log("values", values);
    console.log('imgURL', imgURL);
    try {
      await updateNewsItem(newsItem.id!, { title, description, source, image: imgURL });
      message.success('Noticia actualizada exitosamente!')
    } catch(e) {
      console.log(e)
      message.error(`Ocurrio un error del tipo ${e}`)
    }
  };

  return (
    <>
      <Row className="title">
        <Col>
          <p className="title_of_news_page">Noticias</p>
        </Col>
        <Col>
          <Button onClick={handleClick}>Ir a crear</Button>
        </Col>
      </Row>
      <div className="list_of_news">
        {news?.map((newsItem: NewsFormValues, index: number) => {
          return (
            <Card
              className="card"
              key={index}
              cover={<img className="card_image" src={newsItem.image} />}
              actions={[
                <EyeOutlined key="watch"/>,
                <EditOutlined
                  key="edit"
                  onClick={() => showModal(index, newsItem)}
                />,
              ]}
            >
              <Meta title={newsItem.title} description={newsItem.description}/>
            </Card>
          );
        })}
      </div>
      <Modal
        onOk={() => setIsVisibleModal(false)}
        onCancel={() => setIsVisibleModal(false)}
        visible={isVisibleModal}
        okButtonProps={{ htmlType: "submit", form: "news_edit_form" }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          id="news_edit_form"
          initialValues={{
            title: newsItem?.title,
            description: newsItem?.description,
          }}
        >
          <div className="image">
            <img className="edit_image" src={imgURL} />
          </div>
          <input type="file" onChange={handleImageChange} />

          <Form.Item name="title">
            <Input />
          </Form.Item>
          <Form.Item name="description">
            <Input />
          </Form.Item>
          <Form.Item name="source">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default News;
