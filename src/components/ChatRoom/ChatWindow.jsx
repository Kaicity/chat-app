import { UpOutlined, UserAddOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .avatar {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    margin-left: auto;
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

  @media (max-width: 768px) {
    height: calc(100% - 110px);
  }

  /* Tùy chỉnh thanh cuộn */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #3a3b3c;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #676767;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a9a9a9;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100vh;
  overflow-y: auto;
`;

const FormStyled = styled(Form)`
  display: flex;
  align-items: center;
  padding: 12px 4px;
  border-top: 1px solid #ccc;
`;

const InputWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;

  .submit-button {
    width: 30px;
    height: 30px;
    position: absolute;
    border: none;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 20px;
    background-color: #676767;
  }
`;

const InputStyled = styled(Input.TextArea)`
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  width: 100%;
  color: #fff;
  background-color: #3a3b3c;

  &:focus {
    outline: none;
    box-shadow: none;
    background-color: #3a3b3c;
  }

  &:hover {
    background-color: #3a3b3c;
  }

  &::placeholder {
    color: #a9a9a9;
  }
`;

function ChatWindow() {
  const { selectedRoom, members, setIsInviteMemberVisible } =
    useContext(AppContext);

  const user = useContext(AuthContext);
  const { uid, photoURL, displayName } = user;

  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();

  const messageListRef = useRef(null);

  const handleInviteMember = () => {
    setIsInviteMemberVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = () => {
    if (inputValue) {
      addDocumentGenerateAutoId(db, "messages", {
        text: inputValue,
        uid,
        photoURL,
        displayName,
        roomId: selectedRoom.id,
      });
    }

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

  //Cho phep shirt enter xuong dong text
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Ngăn chặn hành vi mặc định
      handleOnSubmit();
    }
  };

  const scrollToBottomNewMessages = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottomNewMessages();
  }, [messages]);

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
                Mời
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
            <MessageListStyled ref={messageListRef}>
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

            {/* INPUT CHAT */}
            <FormStyled size="large" form={form}>
              <InputWrapperStyled>
                <Form.Item name="message" style={{ flex: 1, margin: 0 }}>
                  <InputStyled
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    placeholder={`Nhập tin nhắn tới ${selectedRoom.name}`}
                    rows={1}
                    autoSize={{ minRows: 1, maxRows: 5 }}
                  />
                </Form.Item>
                <Button
                  icon={<UpOutlined />}
                  onClick={handleOnSubmit}
                  htmlType="submit"
                  className="submit-button"
                />
              </InputWrapperStyled>
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
