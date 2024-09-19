import React, { useContext, useMemo, useState } from "react";
import { Avatar, Form, Modal, Select, Spin, message } from "antd";
import { AppContext } from "../../Context/AppProvider";
import {
  db,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "../../firebase/config";
import { debounce } from "lodash";
import { AuthContext } from "../../Context/AuthProvider";

const { Option } = Select;

// Current User
let globalUser = {};

// Current Room
let globalRoom = "";

function DebounceSelect({ fetchOption, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (values) => {
      setOptions([]);
      setFetching(true);

      fetchOption(values).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOption]);

  return (
    <Select
      labelInValue
      onSearch={debounceFetcher}
      filterOption={false}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value} title={option.label}>
          <Avatar size="small" src={option.photoURL} style={{ margin: 5 }}>
            {!option.photoURL && option.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {`${option.label}`}
        </Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search) {
  //Query User
  const userQuery = query(
    collection(db, "user"),
    where("keywords", "array-contains", search),
    orderBy("displayName"),
    limit(20)
  );

  //Query Rooms
  const roomRef = doc(db, "rooms", globalRoom);

  try {
    const querySnapshot = await getDocs(userQuery);
    const roomSnapshot = await getDoc(roomRef);
    const members = roomSnapshot.data().members;

    return querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        // Khong chon tai khoan nguoi dung hien tai va cac thanh vien khac da ton tai trong phong
        if (data.uid !== globalUser.uid && !members.includes(data.uid)) {
          return {
            label: data.displayName,
            value: data.uid,
            photoURL: data.photoURL,
          };
        }
        return null;
      })
      .filter(Boolean);
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error;
  }
}

export default function InviteMember() {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext);

  const user = useContext(AuthContext);
  globalUser = user;

  globalRoom = selectedRoomId;

  const [value, setValue] = useState([]);
  const [form] = Form.useForm();
  const [isButtonOkModalVisible, setIsButtonModalOkVisible] = useState(true);

  const handleOk = async () => {
    try {
      const roomRef = doc(db, "rooms", selectedRoomId);

      // Fetch the current room data
      const roomSnapshot = await getDoc(roomRef);
      const currentRoomData = roomSnapshot.data();

      // Lay danh sach cac member truoc do
      const currentMembers = currentRoomData.members || [];
      const newMembers = value.map((val) => val.value);

      // Cap nhat lai member trong rooms
      await updateDoc(roomRef, {
        members: [...new Set([...currentMembers, ...newMembers])],
      });

      message.success("Mời thành viên thành công");
      setIsInviteMemberVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error updating room members:", error);
      message.error("Mời thành viên thất bại");
    }
  };

  const handleCancel = () => {
    setIsInviteMemberVisible(false);
  };

  const onFormValuesChange = (changeValues) => {
    // Kiem tra chon nguoi dung co chon member value thi moi duoc phep submit
    const members = changeValues.members || [];
    setIsButtonModalOkVisible(members.length === 0);
  };

  return (
    <div>
      <Modal
        title="Thêm thành viên"
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
        okButtonProps={{ disabled: isButtonOkModalVisible }}
      >
        <Form form={form} layout="vertical" onValuesChange={onFormValuesChange}>
          <Form.Item
            name="members"
            label="Người dùng"
            rules={[{ required: true, message: "Vui lòng chọn người dùng!" }]}
          >
            <DebounceSelect
              mode="multiple"
              value={value}
              placeholder="Nhập tên người dùng"
              fetchOption={fetchUserList}
              onChange={(newValue) => setValue(newValue)}
              style={{ width: "100%" }}
            />
          </Form.Item>
          {/* Add other form fields as needed */}
        </Form>
      </Modal>
    </div>
  );
}
