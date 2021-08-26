import { ArrowLeftOutlined } from "@ant-design/icons";
import { Collapse, Form, message, Row, Typography } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CallDatalnfo } from "../../components/CallDataInfo";
import { ClubInstitutionalInfo } from "../../components/ClubInstitutionalInfo";
import PostulantName from "../../components/PostulantName";
import { UpdateCallInfoModal } from "../../components/UpdateCallInfoModal";
import {
  listeningSingleCall,
  updateCallInfo,
} from "../../firebase/CallServices";
import { CallData } from "../../types";
import "./styles.less";

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
  console.log(call);
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
    try {
      await updateCallInfo(call?.id!, startDate, endDate, extraDetails);
      message.success("La convocatoria fue actualizada exitosamente!");
      form.resetFields();
    } catch (e) {
      message.error(`Ocurrio un error del tipo ${e}`);
    }
  };
  return (
    <>
      <div className="body_call">
        <Row justify="center">
          <div className="single_call_header">
            <ArrowLeftOutlined
              className="go_back_button"
              onClick={() => history.goBack()}
            />
            <Title level={4}>{call?.posRequired}</Title>
          </div>
        </Row>
        <br />
        <Row justify="center">
          <div className="ownData">
            <CallDatalnfo call={call} onShowModal={showCallDetailsInfoModal} />
          </div>
        </Row>
        <br />
        <Row justify="center">
          <UpdateCallInfoModal
            setIsVisibleModal={setIsVisibleCallInfoModal}
            isVisibleModal={isVisibleCallInfoModal}
            form={callInfoForm}
            onFinish={onUpdateCallInfo}
          />
        </Row>
        <br />
        <Row justify="center">
          {call?.postulatedPlayersId ? (
            <>
              <Collapse style={{ width: "85%", borderRadius: "5px" }}>
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
            <p style={{ color: "#99ff98" }}>
              No hay jugadores postulados en esta convocatoria
            </p>
          )}
        </Row>
        <br />
        <Row justify="center">
          <div className="ownData">
            <ClubInstitutionalInfo clubId={call?.clubId} />
          </div>
        </Row>
      </div>
    </>
  );
};

export default Calls;
