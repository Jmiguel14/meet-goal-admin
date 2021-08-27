import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col, Collapse, Form, message, Row, Typography } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./styles.less";
import { CallDatalnfo } from "../../components/CallDataInfo";
import { ClubOwnInfo } from "../../components/ClubOwnInfo";
import PostulantName from "../../components/PostulantName";
import { UpdateCallInfoModal } from "../../components/Modals/UpdateCallInfoModal";
import {
  listeningSingleCall,
  updateCallInfo,
} from "../../firebase/CallServices";
import { CallData } from "../../types";

const { Title } = Typography;

const Calls = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [call, setCall] = useState<CallData>();
  const [form] = Form.useForm();
  const [callInfoForm] = Form.useForm();
  const [isVisibleCallInfoModal, setIsVisibleCallInfoModal] = useState(false);
  const { Panel } = Collapse;

  useEffect(() => {
    const unsubscribe = listeningSingleCall(id, setCall);
    return () => unsubscribe && unsubscribe();
  }, [id]);
  const showCallDetailsInfoModal = () => {
    setIsVisibleCallInfoModal(true);
    const startDate = moment(call?.startDate.toDate());
    const endDate = moment(call?.endDate.toDate());
    callInfoForm.setFieldsValue({
      posRequired: call?.posRequired,
      ageRequired: call?.ageRequired,
      extraDetails: call?.extraDetails,
      startDate: startDate,
      endDate: endDate,
    });
  };

  const onUpdateCallInfo = async (values: CallData) => {
    const { extraDetails, startDate, endDate } = values;
    if (
      (extraDetails !== "" || extraDetails !== undefined) &&
      (startDate !== "" || startDate !== undefined) &&
      (endDate !== "" || endDate !== undefined)
    ) {
      try {
        await updateCallInfo(call?.id!, startDate, endDate, extraDetails);
        message.success("La convocatoria fue actualizada exitosamente!");
        form.resetFields();
      } catch (e) {
        message.error(`Ocurrio un error del tipo ${e}`);
      }
      setIsVisibleCallInfoModal(false);
    }
  };
  return (
    <>
      <div className="body-call">
        <Col className="call-container" lg={16} xl={16}>
          <div className="single-call-header">
            <ArrowLeftOutlined
              className="go_back_button"
              onClick={() => history.goBack()}
            />
            <Title level={4}>{call?.posRequired}</Title>
          </div>
          <br />
          <Row justify="center">
            <Col className="ownData">
              <CallDatalnfo
                call={call}
                onShowModal={showCallDetailsInfoModal}
              />
            </Col>
          </Row>
          <UpdateCallInfoModal
            setIsVisibleModal={setIsVisibleCallInfoModal}
            isVisibleModal={isVisibleCallInfoModal}
            form={callInfoForm}
            onFinish={onUpdateCallInfo}
          />
          <br />
          {call?.postulatedPlayersId ? (
            <>
              <Collapse style={{ width: "100%", borderRadius: "5px" }}>
                <Panel header="Jugadores Postulantes" key="1">
                  {call.postulatedPlayersId.map(
                    (playerId: string, index: number) => (
                      <PostulantName playerId={playerId} key={index} />
                    )
                  )}
                </Panel>
              </Collapse>
            </>
          ) : (
            <p style={{ color: "#99ff98", textAlign: "center" }}>
              No hay jugadores postulados en esta convocatoria
            </p>
          )}
          <br />
          <div className="ownData">
            <ClubOwnInfo clubId={call?.clubId} />
          </div>
        </Col>
      </div>
    </>
  );
};

export default Calls;
