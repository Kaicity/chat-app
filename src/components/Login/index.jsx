import React from "react";
import { Row, Col, Typography, Avatar, Card } from "antd";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { GoogleCircleFilled } from "@ant-design/icons";
import { FacebookFilled } from "@ant-design/icons";
import { useState } from "react";

import {
  getAuth,
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../../firebase/config";

// Replace the existing fbProvider and auth declarations
const auth = getAuth(app);
const fbProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginWithFacebook = () => {
    signInWithPopup(auth, fbProvider).then((result) => {
      const userInfo = result.user;
      setEmail(userInfo.email);
      setPassword(userInfo.password);
    });
  };

  const handleLoginWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      const userInfo = result.user;
     
      setTimeout(() => {
        setEmail(userInfo.email);
        setPassword(userInfo.password);
      }, 1000);
    });
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <Col xs={22} sm={18} md={14} lg={10} xl={5}>
        <Card style={{ padding: 20, backgroundColor: "var(--primary-color)" }}>
          <Avatar
            style={{ display: "block", margin: "0 auto", marginBottom: 20 }}
            size={64}
            src="https://avatars.githubusercontent.com/u/80609391?v=4"
          />
          <Typography.Title
            level={2}
            style={{ textAlign: "center", marginBottom: 20 }}
          >
            Itmix Chat
          </Typography.Title>
          <Form
            name="login"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            > 
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                onClick={handleLoginWithFacebook}
                type="default"
                block
                size="large"
                icon={<FacebookFilled style={{ color: "blue" }} />}
                style={{
                  backgroundColor: "#fff",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Log in with Facebook
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                onClick={handleLoginWithGoogle}
                type="default"
                block
                size="large"
                icon={<GoogleCircleFilled style={{ color: "red" }} />}
                style={{
                  backgroundColor: "#fff",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Log in with Google
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
