import React, { useContext, useMemo } from "react";
import { Collapse, Typography, Button } from "antd";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { AppContext } from "../../Context/AppProvider";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: var(--text-color-primary);
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      padding: 0;
      color: var(--text-color-primary);
    }
  }
`;

const TypographyStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
`;

function RoomList() {
  const { rooms, setIsAddRoomVisible } = useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  return (
    <Collapse ghost defaultActiveKey={[1]}>
      <PanelStyled header="Danh sách các phòng" key="1">
        {rooms.map((room) => (
          <TypographyStyled key={room.id}>{room.name}</TypographyStyled>
        ))}
        <Button
          type="text"
          icon={<PlusCircleOutlined />}
          className="add-room"
          onClick={handleAddRoom}
        >
          Tạo phòng
        </Button>
      </PanelStyled>
    </Collapse>
  );
}

export default RoomList;
