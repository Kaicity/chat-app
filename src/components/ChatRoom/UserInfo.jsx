import { Avatar, Button, Typography } from "antd";
import styled from "styled-components";
import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const WrapperStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }

  .user-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .username {
    color: var(--text-color-primary);
    font-weight: bold;
    font-size: 14px;
    margin-left: 10px;
  }

  .btn-logout {
    @media (max-width: 768px) {
      align-self: flex-end;
    }
  }
`;

function UserInfo() {
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
  };

  const user = useContext(AuthContext);
  const { displayName, photoURL } = user;

  return (
    <WrapperStyle>
      <div className="user-container">
        <Avatar size={40} src={photoURL}>
          {!photoURL && displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className="username">{displayName}</Typography.Text>
      </div>
      <Button ghost className="btn-logout" onClick={handleLogout}>
        Đăng xuất
      </Button>
    </WrapperStyle>
  );
}

export default UserInfo;
