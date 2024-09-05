import React from "react";
import { Collapse, Typography, Button } from "antd";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      padding: 5px;
    }
  }
`;

const TypographyStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
  color: white;
`;

function RoomList() {
  const handleAddRoom = () => {
   
  };

  return (
    <Collapse ghost defaultActiveKey={[1]}>
      <PanelStyled header="Danh sách các phòng" key="1">
        <TypographyStyled>Phòng 1</TypographyStyled>
        <TypographyStyled>Phòng 2</TypographyStyled>
        <TypographyStyled>Phòng 3</TypographyStyled>
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
