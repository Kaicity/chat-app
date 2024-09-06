import React from "react";
import { Row, Col, Typography, Avatar, Card } from "antd";
import { Form, Input, Button } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Divider } from "antd";
import {
  getAuth,
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import app from "../../firebase/config";
import styled from "styled-components";
import facebook from "../../assets/facebook.png";
import google from "../../assets/google.png";

// Replace the existing fbProvider and auth declarations
const auth = getAuth(app);
const fbProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLoginWithFacebook = async () => {
    await signInWithPopup(auth, fbProvider).then((result) => {
      const userInfo = result.user;
    });
  };

  const handleLoginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider).then((result) => {
      console.log({ result });
    });
  };

  const handleLoginWithPhoneNumber = async () => {
    try {
      setLoading(true);
      const formattedPhoneNumber = phoneNumber.startsWith("+84")
        ? phoneNumber
        : `+84${phoneNumber.slice(1)}`;

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              console.log({ response });
            },
          }
        );
      }

      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        appVerifier
      );

      const verificationCode = window.prompt(
        "Please enter the verification code sent to your phone"
      );

      if (verificationCode) {
        const result = await confirmationResult.confirm(verificationCode);
        console.log("User signed in:", result.user);
        // You can now redirect the user or update your app's state
      } else {
        console.log("Verification cancelled");
      }
    } catch (error) {
      console.error("Error during phone authentication:", error);
      // Handle specific error cases here
    } finally {
      setLoading(false);
    }
  };

  const ButtonsStyle = styled.div`
    display: flex;
    justify-content: space-between;
  `;

  const [loading, setLoading] = useState(false);

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <Col xs={22} sm={18} md={14} lg={10} xl={5}>
        <Card
          style={{
            padding: 20,
            backgroundColor: "var(--primary-color)",
            width: "100%",
          }}
        >
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
          <Form name="login">
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                {
                  pattern:
                    /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/,
                  message: "Vui lòng nhập số điện thoại hợp lệ!",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<PhoneOutlined />}
                placeholder="Nhập số điện thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                size="large"
                style={{ width: "100%", marginBottom: 10 }}
                loading={loading}
                htmlType="submit"
                onClick={handleLoginWithPhoneNumber}
              >
                Đăng nhập với số điện thoại
              </Button>
            </Form.Item>
          </Form>

          <Divider>
            <Typography.Text
              style={{
                fontSize: "12px",
                fontWeight: "normal",
                color: "#999",
              }}
              level={2}
            >
              Hoặc đăng nhập với
            </Typography.Text>
          </Divider>

          <ButtonsStyle>
            <Button
              onClick={handleLoginWithFacebook}
              type="default"
              size="large"
              style={{
                backgroundColor: "#fff",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                marginRight: "8px",
              }}
            >
              <img src={facebook} alt="" width={24} height={24} />
              Facebook
            </Button>

            <Button
              onClick={handleLoginWithGoogle}
              type="default"
              size="large"
              style={{
                backgroundColor: "#fff",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                marginLeft: "8px",
              }}
            >
              <img src={google} alt="" width={24} height={24} />
              Google
            </Button>
          </ButtonsStyle>

          <div id="recaptcha-container"></div>
        </Card>
      </Col>
    </Row>
  );
}
