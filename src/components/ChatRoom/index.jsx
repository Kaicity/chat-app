import React from "react";
import Sidebar from "./Sidebar";
import ChatWindown from "./ChatWindow";
import { Row, Col } from "antd";

export default function ChatRoom() {
  return (
    <Row>
      <Col xs={8} md={6}>
        <Sidebar />
      </Col>
      <Col xs={16} md={18}>
        <ChatWindown />
      </Col>
    </Row>
  );
}
