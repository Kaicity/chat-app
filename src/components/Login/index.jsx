import React, { useState } from "react";
import { Row, Col, Typography, Avatar, Card, Button, Divider } from "antd";

import {
  getAuth,
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import app, { db } from "../../firebase/config";
import styled from "styled-components";
import apple from "../../assets/apple-logo.png";
import google from "../../assets/google.png";
import { addDocument, generateKeywords } from "../../firebase/service";
import bgLoginImage from "../../assets/chatbg.jpg";
import logoChat from "../../assets/logo_chat.jpg";

// Initialize Firebase authentication
const auth = getAuth(app);
const fbProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

export default function Login() {
  const handleLoginWithApple = async () => {
    const result = await signInWithPopup(auth, appleProvider);
    console.log({ result });
    const user = result.user;
    const providerId = user.providerData[0].providerId;

    if (user.emailVerified) {
      const { displayName, email, photoURL, uid } = user;
      const keywords = generateKeywords(displayName);

      //Save Document
      addDocument(db, "user", {
        displayName,
        email,
        photoURL,
        uid,
        providerId,
        keywords,
      });
    }
  };

  const handleLoginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const providerId = user.providerData[0].providerId;

    if (user.emailVerified) {
      const { displayName, email, photoURL, uid } = user;
      const keywords = generateKeywords(displayName);

      //Save Document
      addDocument(db, "user", {
        displayName,
        email,
        photoURL,
        uid,
        providerId,
        keywords,
      });
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
              src={logoChat}
            />
            <Typography.Title
              level={2}
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              Itmix Chat
            </Typography.Title>

            <Divider>
              <Typography.Text
                style={{
                  fontSize: "12px",
                  fontWeight: "normal",
                  color: "#999",
                }}
              >
                Đăng nhập với
              </Typography.Text>
            </Divider>

            <ButtonsStyle>
              <Button
                onClick={handleLoginWithApple}
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
                <img src={apple} alt="Apple" width={24} height={24} />
                Apple
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
