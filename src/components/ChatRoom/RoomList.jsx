import React from "react";
import { Collapse, Typography } from "antd";
import styled from "styled-components";

const RoomListWrapper = styled.div`
  .room-link {
    display: block;
    margin-bottom: 10px;
  }
`;

const { Panel } = Collapse;

function RoomList() {
  return (
    <RoomListWrapper>
      <Collapse ghost defaultActiveKey={[1]}>
        <Panel header="Danh sách các phòng" key="1">
          <Typography.Link className="room-link">Room 1</Typography.Link>
          <Typography.Link className="room-link">Room 2</Typography.Link>
          <Typography.Link className="room-link">Room 3</Typography.Link>
        </Panel>
      </Collapse>
    </RoomListWrapper>
  );
}

export default RoomList;
