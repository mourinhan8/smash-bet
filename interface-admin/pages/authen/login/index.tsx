import { Button, Divider, Form, Input, Modal, QRCode, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { ReactNode } from "react";
import { useAuth } from "@/common/hooks/useAuth";
import { useRouter } from "next/router";
import { APP_TOKEN_KEY, APP_VERIFY_KEY } from "@/common/utils/constants";
import CopyToClipboard from "react-copy-to-clipboard";

interface IForm {
  email: string;
  password: string;
}

export interface ILoginProps {}

const Login = ({}: ILoginProps) => {
  const [form] = Form.useForm<IForm>();
  const { loginLocal, verifyLogin } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [isGoogleAuthen, setIsGoogleAuthen] = useState(true);
  const [base32, setBase32] = useState("");
  const [otpauthUrl, setOtpauthUrl] = useState("");
  const onLogin = async (values: IForm) => {
    setLoading(true);
    try {
      const response = await loginLocal(values.email, values.password);
      const { data } = response;
      if (data) {
        if (data.data.message == "requiredGoogleAuthen") {
          setIsGoogleAuthen(false);
          setBase32(data.data.base32);
          setOtpauthUrl(data.data.url);
        }
        setIsOpen(true);
      } else {
        message.error(response.error.message);
      }
    } catch (error) {
      message.error("Login failed, email or password is incorrect!");
    }
    setLoading(false);
  };

  const onVerifyOtp = async () => {
    setLoading(true);
    const verifyToken = localStorage.getItem(APP_VERIFY_KEY);
    if (!verifyToken) {
      message.error("Missing 2fa token")
    } else {
      const response = await verifyLogin(verifyToken, otp);
      const { data } = response;
      if (data) {
        message.success("Login successfully");
        router.push("/admin");
      } else {
        message.error(response.error.message);
      }
    }
    setLoading(false);
  };

  const handleCancelOTP = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    localStorage.removeItem(APP_VERIFY_KEY);
  }, []);

  return (
    <div>
      <div className="w-full grid h-full mx-auto app pt-20 pb-10">
        <div className="md:w-2/3 sm:self-center lg:w-1/3 bg-white px-20 py-6 mx-auto place-content-center">
          <Form
            className="mt-8"
            initialValues={{
              email: "",
              password: "",
            }}
            form={form}
            layout="vertical"
            onFinish={onLogin}
            requiredMark={false}
          >
            <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input your email!" }]}>
              <Input placeholder="Email" size="large" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input your password!" }]}>
              <Input.Password
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item className="mt-6">
              <div className="my-3 ">
                <Button loading={loading} className="bg-[#625DF5]" type="primary" size="large" block htmlType="submit">
                  Log In
                </Button>
                <Modal
                  footer={null}
                  className="grid grid-flow-row app  px-10"
                  title={<div className="text-center">2fa Verification</div>}
                  open={isOpen}
                  onCancel={handleCancelOTP}
                  width={567}
                >
                  <Divider className="my-0" />
                  <div className="flex flex-col justify-center items-center">
                    {!isGoogleAuthen && (
                      <>
                        <QRCode className="my-2" value={otpauthUrl || "-"} />
                        <div className="mb-2 text-justify content">
                          <p className="text-center mb-2">{`You also can enter this code manually in your Google Authenticator app`}</p>
                          <div className="flex justify-center">
                            <CopyToClipboard text={`${base32}`} onCopy={() => message.success(`${base32}`)}>
                              <div className="grid cursor-pointer icon">{base32}</div>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="mt-2">
                      <Input
                        placeholder="Enter OTP"
                        onChange={(e) => {
                          setOtp(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-[30px] mt-6">
                    <Button onClick={handleCancelOTP} type="default" size="large" className="min-w-28 app">
                      Cancel
                    </Button>
                    <Button loading={loading} onClick={onVerifyOtp} type="primary" size="large" className="min-w-28 app">
                      Confirm
                    </Button>
                  </div>
                </Modal>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export interface IButtonLoginMethodProps {
  onClick: () => void;
  content: string;
  style?: string;
  icon: ReactNode;
}

export default Login;
