import React from "react";
import { Avatar, Typography } from "antd";
import styled from "styled-components";
import { formatRelative } from "date-fns";

const WrapperStyled = styled.div`
  white-space: pre-wrap;
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  min-width: 100px;

  .avatar {
    margin-top: 1px;
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

function formatDate(seconds) {
  let formattedDate = "";

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

function Message({ text, displayName, createdAt, photoURL }) {
  return (
    <WrapperStyled>
      <div>
        <Avatar className="avatar" size="default" shape="circle" src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
      </div>

      <div>
        <div>
          <Typography.Text className="author">{displayName}</Typography.Text>
          <Typography.Text className="date">
            {formatDate(createdAt?.seconds)}
          </Typography.Text>
        </div>
        <div>
          <Typography.Text className="content">{text}</Typography.Text>
        </div>
      </div>
    </WrapperStyled>
  );
}

export default Message;
