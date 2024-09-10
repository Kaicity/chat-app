import React, { useState } from "react";
import {
  Row,
  Col,
  Typography,
  Avatar,
  Card,
  Form,
  Input,
  Button,
  Divider,
} from "antd";
import { PhoneOutlined } from "@ant-design/icons";

import {
  getAuth,
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import app, { db } from "../../firebase/config";
import styled from "styled-components";
import facebook from "../../assets/facebook.png";
import google from "../../assets/google.png";
import { addDocument } from "../../firebase/service";
import bgLoginImage from "../../assets/chatbg.jpg";

// Initialize Firebase authentication
const auth = getAuth(app);
const fbProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginWithFacebook = async () => {
    await signInWithPopup(auth, fbProvider).then((result) => {
      const userInfo = result.user;
    });
  };

  const handleLoginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const providerId = user.providerData[0].providerId;

    if (user.emailVerified) {
      const { displayName, email, photoURL, uid } = user;

      //Save Document
      addDocument(db, "user", {
        displayName,
        email,
        photoURL,
        uid,
        providerId,
      });
    }
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
      } else {
        console.log("Verification cancelled");
      }
    } catch (error) {
      console.error("Error during phone authentication:", error);
    } finally {
      setLoading(false);
    }
  };

  const ButtonsStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    @media (min-width: 576px) {
      flex-direction: row;
      justify-content: space-between;
    }
  `;

  const WrapperStyled = styled.div`
    height: 100vh;
    background-image: url(${bgLoginImage});
  `;

  return (
    <WrapperStyled>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col xs={22} sm={18} md={14} lg={10} xl={8}>
          <Card
            style={{
              padding: 20,
              backgroundColor: "var(--primary-color)",
              width: "100%",
              borderRadius: 8,
            }}
          >
            <Avatar
              style={{ display: "block", margin: "0 auto 20px auto" }}
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
                  htmlType="button"
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
                }}
              >
                <img src={facebook} alt="Facebook" width={24} height={24} />
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
                }}
              >
                <img src={google} alt="Google" width={24} height={24} />
                Google
              </Button>
            </ButtonsStyle>

            <div id="recaptcha-container"></div>
          </Card>
        </Col>
      </Row>
    </WrapperStyled>
  );
}
