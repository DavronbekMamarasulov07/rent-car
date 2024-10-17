import { BsArrowRepeat } from "react-icons/bs";
import { Button, Input, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {  useResendOtpMutation, useVerificationOtpMutation } from "../../redux/api/auth-api";
import { useDispatch } from "react-redux";


const { Text, Title } = Typography;

const VerifyOtp = () => {
    const navigate = useNavigate();
    const [verificationOtp, { data, isLoading, isError }] = useVerificationOtpMutation();
    const [timeLeft, setTimeLeft] = useState(5);
    const [resendCodeBtn, setResendCodeBtn] = useState(false);
    const dispatch = useDispatch();
    const [resendOtp] = useResendOtpMutation();


    const [email, setEmail] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const email = atob(searchParams.get("email"));
        setEmail(email);
        console.log(email);
        message.success(`Verification Code sent to ${email}`);
        
    }, [searchParams]);

    const onChange = (code) => {
        console.log(code);
        verificationOtp({ email, otp: code });
    };

    useEffect(() => {
    },[])
    

    useEffect(() => {
        if (data) {
            navigate("/?auth=signIn");
            message.success(data?.message);
            console.log(data);
        }
        if(isError){
            message.error("Something went wrong")
            
        }
    }, [data, isError]);

    const sharedProps = {
        onChange,
    };

    useEffect(() => {
        // If timeLeft is 0, stop the timer
        if (timeLeft === 0) {
            setResendCodeBtn(true);
            return;
        }

        // Set an interval to update the timer every second
        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    console.log(email)

    const resendCode = () => {
        resendOtp( email );

    };
    

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md flex flex-col items-center">
                <div className="mb-6 text-center">
                    <Link to="/?auth=signUp">
                        <Title level={3} className="text-blue-500">
                            Verification
                        </Title>
                    </Link>
                    <Text className="text-slate-600">
                        Enter 6-digit code in your email:{" "}
                        <i>
                            <b>{email}</b>
                        </i>
                        {/* {<EmailMasked email={email} />} */}
                    </Text>
                </div>

                <Input.OTP
                    placeholder="Enter OTP"
                    maxLength={6}
                    className="mb-6"
                    size="large"
                    inputClassName="text-blue-500 font-medium"
                    style={{
                        "--antd-wave-shadow-color": "rgba(37, 99, 235, 0.4)",
                    }}
                    disabled={isLoading}
                    {...sharedProps}
                />

                {resendCodeBtn ? (
                    <div className="flex w-full items-center justify-center py-5">
                        <Button
                            className="text-sm text-blue-600"
                            icon={<BsArrowRepeat />}
                            onClick={resendCode}
                        >
                            Resend Code
                        </Button>
                    </div>
                ) : (
                    <Text className="flex w-full justify-center py-2 text-center text-slate-600">
                        You can send code again in {formatTime(timeLeft)}
                    </Text>
                )}
            </div>
        </div>
    );
};

export default VerifyOtp;
