import { SendOutlined, UserAddOutlined } from "@ant-design/icons";
import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import Message from "./Message";
// import bgImage from "../../assets/bggif.gif";
import { AppContext } from "../../Context/AppProvider";
import { addDocumentGenerateAutoId } from "../../firebase/service";
import { db } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";
import UseFirestore from "../../hooks/UseFirestore";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  color: var(--text-color-primary);
  border-bottom: 1px solid var(--text-color-primary);

  .header {
    &-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &-title {
      margin: 0;
      font-weight: bold;
    }

    &-desc {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .avatar {
    cursor: pointer;
  }

  .avatar-group {
  }
`;

const WrapperStyled = styled.div`
  height: 100vh;
  background-color: #242526;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const FormStyled = styled(Form)`
  display: flex;
  align-items: center;
  padding: 2px 2px 2px 0;
  border-radius: 2px;
  gap: 10px;

  .ant-form-item {
    flex: 1;
    margin: 0;
  }
`;

function ChatWindow() {
  const { selectedRoom, members, setIsInviteMemberVisible } =
    useContext(AppContext);

  const user = useContext(AuthContext);
  const { uid, photoURL, displayName } = user;

  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();

  const handleInviteMember = () => {
    setIsInviteMemberVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = () => {
    addDocumentGenerateAutoId(db, "messages", {
      text: inputValue,
      uid,
      photoURL,
      displayName,
      roomId: selectedRoom.id,
    });

    form.resetFields(["message"]);
  };

  //Kiem Tra message  co roomid = roomid phong hien tai
  const condition = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  //Lay ra message cua user
  const messages = UseFirestore("messages", condition);

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className="header-info">
              <p className="header-title">
                {selectedRoom ? selectedRoom.name : ""}
              </p>
              <span className="header-desc">
                {selectedRoom ? selectedRoom.description : ""}
              </span>
            </div>

            <ButtonGroupStyled>
              <Button
                type="primary"
                className="add-user"
                icon={<UserAddOutlined />}
                onClick={handleInviteMember}
              >
                Mời bạn bè
              </Button>
              <Avatar.Group
                size="small"
                max={{ count: 2 }}
                className="avatar-group"
              >
                {members.map((member) => (
                  <Tooltip
                    className="tooltip"
                    title={member.displayName}
                    key={member.id}
                  >
                    <Avatar className="avatar" src={member.photoURL}>
                      {member.photoURL
                        ? ""
                        : member.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>

          <ContentStyled>
            <MessageListStyled>
              {messages.map((mes) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt}
                  photoURL={mes.photoURL}
                />
              ))}
            </MessageListStyled>

            <FormStyled size="large" form={form}>
              <Form.Item name="message">
                <Input
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  type="text"
                  name="message"
                  autoComplete="off"
                  placeholder={`Nhập tin nhắn tới ${selectedRoom.name}`}
                />
              </Form.Item>
              <Button
                icon={<SendOutlined />}
                onClick={handleOnSubmit}
                htmlType="submit"
              ></Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Hãy tạo và chọn phòng của bạn"
          type="info"
          showIcon
          style={{ margin: 0, marginLeft: 5, marginRight: 5 }}
          closable
        />
      )}
    </WrapperStyled>
  );
}

export default ChatWindow;
