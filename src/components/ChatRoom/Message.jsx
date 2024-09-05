import React from "react";
import { Avatar, Typography } from "antd";
import styled from "styled-components";

const WrapperStyled = styled.div`
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  min-width: 100px;

  .avatar {
    margin-top: 2px;
  }

  .author {
    color: white;
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 12px;
    color: #999;
  }

  .content {
    color: white;
    margin-left: 5px;
  }
`;

function Message({ text, displayName, createdAt, photoURL }) {
  return (
    <WrapperStyled>
      <div>
        <Avatar className="avatar" size="large" shape="square" src={photoURL} />
      </div>

      <div>
        <div>
          <Typography.Text className="author">{displayName}</Typography.Text>
          <Typography.Text className="date">{createdAt}</Typography.Text>
        </div>
        <div>
          <Typography.Text className="content">{text}</Typography.Text>
        </div>
      </div>
    </WrapperStyled>
  );
}

export default Message;
