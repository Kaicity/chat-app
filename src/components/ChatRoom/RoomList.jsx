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
      padding: 0 20px;
    }
    .add-room {
      padding: 0;
      color: var(--text-color-primary);
    }

    @media (max-width: 768px) {
      .ant-collapse-content-box {
        padding: 0 10px;
      }
    }
  }
`;

const TypographyStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ButtonStyled = styled(Button)`
  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

function RoomList() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
    useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  const handleSelectedRoom = (id) => {
    return () => setSelectedRoomId(id);
  };

  return (
    <Collapse ghost defaultActiveKey={[1]}>
      <PanelStyled header="Danh sách các phòng" key="1">
        {rooms.map((room) => (
          <TypographyStyled key={room.id} onClick={handleSelectedRoom(room.id)}>
            {room.name}
          </TypographyStyled>
        ))}
         <ButtonStyled
          type="text"
          icon={<PlusCircleOutlined />}
          className="add-room"
          onClick={handleAddRoom}
        >
          Tạo phòng
        </ButtonStyled>
      </PanelStyled>
    </Collapse>
  );
}

export default RoomList;
