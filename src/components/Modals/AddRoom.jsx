import React, { useContext } from "react";
import { Form, Input, Modal } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { addDocumentGenerateAutoId } from "../../firebase/service";
import { db } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";

export default function AddRoom() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const user = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const formValues = await form.validateFields();
      const { uid } = user;

      //Using service add document firebase
      addDocumentGenerateAutoId(db, "rooms", { ...formValues, members: [uid] });

      setIsAddRoomVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Form validation failed ", error);
    }
  };

  const handleCancel = () => {
    setIsAddRoomVisible(false);
  };

  return (
    <div>
      <Modal
        title="Tạo phòng mới"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên phòng"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên phòng !" }]}
          >
            <Input placeholder="Nhập tên phòng" />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
