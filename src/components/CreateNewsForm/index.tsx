import { Button, Col, Form, FormInstance, Input, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { NewsFormValues } from "../../types";

interface CreateNewsFormProps {
  form: FormInstance<any> | undefined;
  onFinish: ((values: NewsFormValues) => void) | undefined;
}

export const CreateNewsForm = ({ form, onFinish }: CreateNewsFormProps) => {
  return (
    <Form form={form} onFinish={onFinish} className="form_news">
      <Form.Item
        name="title"
        label="Título"
        rules={[
          {
            required: true,
            message: "Por favor, ingrese el título de la noticia!",
          },
          {
            pattern: /^[A-Za-z0-9!@#$%_\-^&*]+/,
            message: "Entrada no válida",
          },
        ]}
      >
        <Input placeholder="Título de la noticia" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Descripción"
        rules={[
          {
            required: true,
            message: "Por favor, ingrese la descripción de la noticia!",
          },
          {
            pattern: /^[A-Za-z0-9!@#$%_\-^&*]+/,
            message: "Entrada no válida",
          },
        ]}
      >
        <TextArea placeholder="Descripción de la noticia" />
      </Form.Item>
      <Form.Item
        name="source"
        label="Fuente"
        rules={[
          {
            pattern: /^[A-Za-z0-9!@#$%_\-^&*]+/,
            message: "Entrada no válida",
          },
        ]}
      >
        <Input placeholder="Ejm: www.instagram.com" />
      </Form.Item>
      <Row justify="center">
        <Col>
          <Button htmlType="submit" type="primary">
            Crear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
