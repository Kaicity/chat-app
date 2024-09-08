import React from "react";
import { Row, Col } from "antd";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import styled from "styled-components";

const SidebarStyle = styled.div`
  background: linear-gradient(
    135deg,
    rgba(75, 0, 130, 0.8),
    rgba(109, 43, 119, 0.8)
  );
  height: 100vh;
`;

function Sidebar() {
  return (
    <SidebarStyle>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </SidebarStyle>
  );
}

export default Sidebar;
