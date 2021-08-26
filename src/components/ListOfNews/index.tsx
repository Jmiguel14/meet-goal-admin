import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Skeleton } from "antd";
import firebase from "firebase";
import { useEffect, useState } from "react";
import { NewsFormValues } from "../../types";
import "./styles.less";
const { Meta } = Card;

interface ListOfNewsProps {
  news: firebase.firestore.DocumentData | undefined;
  onShowDeleteConfirm: (id: string) => void;
  onShowModal: (newsItem: NewsFormValues) => void;
}

export const ListOfNews = ({
  news,
  onShowDeleteConfirm,
  onShowModal,
}: ListOfNewsProps) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    news ? setLoading(false) : setLoading(true);
  }, [news]);

  return (
    <div className="list_of_news">
      {news?.map((newsItem: NewsFormValues, index: number) => {
        return (
          <Card
            className="card"
            key={index}
            cover={
              loading ? (
                <Skeleton.Image className="img_skeleton" />
              ) : (
                <img alt="" className="card_image" src={newsItem.image} />
              )
            }
            actions={[
              <DeleteOutlined
                key="watch"
                onClick={() => onShowDeleteConfirm(newsItem.id!)}
              />,
              <EditOutlined key="edit" onClick={() => onShowModal(newsItem)} />,
            ]}
          >
            <Skeleton loading={loading} active>
              <Meta title={newsItem.title} description={newsItem.description} />
            </Skeleton>
          </Card>
        );
      })}
    </div>
  );
};
