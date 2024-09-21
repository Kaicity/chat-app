import React from "react";
import { Avatar, Typography } from "antd";
import styled from "styled-components";
import { formatRelative } from "date-fns";

const WrapperFullStyled = styled.div`
  display: flex;
  flex-direction: column;

  .date {
    display: block;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
`;

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

  .content {
    color: white;
    margin-left: 5px;
  }

  .wrapper-content {
    width: auto;
    min-width: 50px;
    max-width: 350px;
    background-color: #3a3b3c;
    padding: 8px 10px;
    margin: 5px;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 20px;
    display: inline-block;
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
    <WrapperFullStyled>
      <div>
        <Typography.Text className="date">
          {formatDate(createdAt?.seconds)}
        </Typography.Text>
      </div>
      <WrapperStyled>
        <div>
          <Avatar
            className="avatar"
            size="default"
            shape="circle"
            src={photoURL}
          >
            {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
          </Avatar>
        </div>
        <div>
          <div>
            <Typography.Text className="author">{displayName}</Typography.Text>
          </div>
          <div className="wrapper-content">
            <Typography.Text className="content">{text}</Typography.Text>
          </div>
        </div>
      </WrapperStyled>
    </WrapperFullStyled>
  );
}

export default Message;
