import { SendOutlined, UserAddOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import { Avatar, Button, Form, Input, Tooltip } from "antd";
import Message from "./Message";
import bgImage from "../../assets/bggif.gif";

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
  height: 98vh;
  background-image: url(${bgImage});
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
  const handleSendMessage = (values) => {
    console.log(values);
  };

  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className="header-info">
          <p className="header-title">Phòng Chat 1</p>
          <span className="header-desc">Đây là phòng Chat 1</span>
        </div>

        <ButtonGroupStyled>
          <Button
            type="primary"
            className="add-user"
            icon={<UserAddOutlined />}
          >
            Mời bạn bè
          </Button>
          <Avatar.Group
            size="small"
            max={{ count: 2 }}
            className="avatar-group"
          >
            <Tooltip className="tooltip" title="Hoàng David">
              <Avatar
                className="avatar"
                src="https://avatars.githubusercontent.com/u/110616304?s=80&v=4m"
              />
            </Tooltip>
            <Tooltip className="tooltip" title="Tiến">
              <Avatar
                className="avatar"
                src="https://avatars.githubusercontent.com/u/170062471?s=80&v=4"
              />
            </Tooltip>
            <Tooltip className="tooltip" title="Thongular">
              <Avatar
                className="avatar"
                src="https://avatars.githubusercontent.com/u/93094572?v=4"
              />
            </Tooltip>
            <Tooltip className="tooltip" title="Thảo">
              <Avatar
                className="avatar"
                src="https://avatars.githubusercontent.com/u/80609391?s=16&v=4"
              />
            </Tooltip>
          </Avatar.Group>
        </ButtonGroupStyled>
      </HeaderStyled>

      <ContentStyled>
        <MessageListStyled>
          <Message
            text="Hello"
            displayName="Hoàng David"
            createdAt="12:00"
            photoURL="https://avatars.githubusercontent.com/u/110616304?s=80&v=4"
          />

          <Message
            text="Hello"
            displayName="Hoàng David"
            createdAt="12:00"
            photoURL="https://avatars.githubusercontent.com/u/110616304?s=80&v=4"
          />

          <Message
            text="Hello"
            displayName="Hoàng David"
            createdAt="12:00"
            photoURL="https://avatars.githubusercontent.com/u/110616304?s=80&v=4"
          />

          <Message
            text="Hello"
            displayName="Hoàng David"
            createdAt="12:00"
            photoURL="https://avatars.githubusercontent.com/u/110616304?s=80&v=4"
          />
        </MessageListStyled>

        <FormStyled size="large" onFinish={handleSendMessage}>
          <Form.Item>
            <Input type="text" name="message" autoComplete="off" />
          </Form.Item>
          <Button icon={<SendOutlined />} htmlType="submit"></Button>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  );
}

export default ChatWindow;
