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

const { Option } = Select;

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
          <Avatar size="small" src={option.photoURL}>
            {!option.photoURL && option.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {`${option.label}`}
        </Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search) {
  const userQuery = query(
    collection(db, "user"),
    where("keywords", "array-contains", search),
    orderBy("displayName"),
    limit(20)
  );

  try {
    const querySnapshot = await getDocs(userQuery);
    return querySnapshot.docs.map((doc) => ({
      label: doc.data().displayName,
      value: doc.data().uid,
      photoURL: doc.data().photoURL,
    }));
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

  const [value, setValue] = useState([]);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      // Reference to the room
      const roomRef = doc(db, "rooms", selectedRoomId);

      // Fetch the current room data
      const roomSnapshot = await getDoc(roomRef);
      if (!roomSnapshot.exists()) {
        throw new Error("Room does not exist");
      }
      const currentRoomData = roomSnapshot.data();

      // Extract current members and new members
      const currentMembers = currentRoomData.members || [];
      const newMembers = value.map((val) => val.value);

      // Update the room with new members
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

  return (
    <div>
      <Modal
        title="Thêm thành viên"
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
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
