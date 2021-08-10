import { InboxOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import React from "react";
import './styles.less'

interface DraggerProps {
    imgURL: string 
    onSetImgURL: (value: React.SetStateAction<string>) => void
    file?: File | null
    onSetStyleLabel: () => "custom-file-upload-dashed" | "custom-file-upload"
    onHandleDragEnter: (e: React.DragEvent<HTMLInputElement>) => void
    onHandleDragLeave: (e: React.DragEvent<HTMLInputElement>) => void
    onHandleDrop: (e: React.DragEvent<HTMLDivElement>) => void
    onHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Dragger = ({
  imgURL,
  onSetImgURL,
  file,
  onSetStyleLabel,
  onHandleDragEnter,
  onHandleDragLeave,
  onHandleDrop,
  onHandleChange,
}: DraggerProps) => {
  return (
    <>
      {imgURL ? (
        <section className={"remove_image"}>
          <button className={"button"} onClick={() => onSetImgURL("")}>
            X
          </button>
          <img src={imgURL} alt={file?.name} className={"img"} />
        </section>
      ) : (
        <>
          <label htmlFor="drop-input" className={onSetStyleLabel()}>
            <div className="dragger-content">
              <InboxOutlined />
              <Text>Suelta aquí tu imagen o has click para cargar</Text>
            </div>
          </label>
          <input
            id="drop-input"
            type="file"
            onDragEnter={onHandleDragEnter}
            onDragLeave={onHandleDragLeave}
            className="input"
            onDrop={onHandleDrop}
            onChange={onHandleChange}
          />
        </>
      )}
    </>
  );
};
