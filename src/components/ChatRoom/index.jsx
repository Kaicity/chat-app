import React from "react";
import Sidebar from "./Sidebar";
import ChatWindown from "./ChatWindown";
import { Row, Col, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

export default function ChatRoom() {
  return (
    <Row>
      <Col span={6}>
        <Sidebar />
      </Col>
      <Col span={18}>
        <div style={{ display: "block", padding: "20px 10px" }}>
          <Button ghost icon={<MenuOutlined />} />
        </div>
        <ChatWindown />
      </Col>
    </Row>
  );
}
