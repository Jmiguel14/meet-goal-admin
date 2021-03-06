import { Col, Row, Form, message } from "antd";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "./styles.less";
import { uploadNewsImage } from "../../firebase/client";
import { addNewsItem } from "../../firebase/NewsServices";
import { NewsFormValues } from "../../types";
import { CreateNewsForm } from "../../components/CreateNewsForm";
import { Dragger } from "../../components/Dragger";
import { useHistory } from "react-router-dom";
import { Routes } from "../../constants/routes";

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

const CreateNews = () => {
  const [task, setTask] = useState<firebase.storage.UploadTask>();
  const [imgURL, setImgURL] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [id, setId] = useState("");
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    setId(Date.now().toString());
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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = e.dataTransfer.files[0];
    setFile(file);
    const task = uploadNewsImage(file, id);
    setTask(task);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setFile(file);
    const task = uploadNewsImage(file, id);
    setTask(task);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  const setStyleLabel = () => {
    const style =
      drag === DRAG_IMAGE_STATES.DRAG_OVER
        ? "custom-file-upload-dashed"
        : "custom-file-upload";
    return style;
  };

  const onFinish = (values: NewsFormValues) => {
    const { title, description, source } = values;
    try {
      addNewsItem({ id, title, description, source, image: imgURL });
      message.success("Noticia creada con ??xito");
      form.resetFields();
      setImgURL("");
      history.push(Routes.NEWS);
    } catch (e) {
      message.error(`Ocurri?? un error al crear una noticia de tipo ${e}`);
    }
  };

  return (
    <div className="compose_news">
      <Row className="container">
        <Col md={12}>
          <Row justify="start">
            <Col className="title_news_form">Detalles de la noticia</Col>
          </Row>
          <Row justify="start">
            <Col md={24} xs={24}>
              <CreateNewsForm form={form} onFinish={onFinish} />
            </Col>
          </Row>
        </Col>
        <Col md={12} className="dragger">
          <Dragger
            imgURL={imgURL}
            onSetImgURL={setImgURL}
            file={file}
            onSetStyleLabel={setStyleLabel}
            onHandleDragEnter={handleDragEnter}
            onHandleDragLeave={handleDragLeave}
            onHandleDrop={handleDrop}
            onHandleChange={handleChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CreateNews;
