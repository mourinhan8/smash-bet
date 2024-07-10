import { Button, Input, message } from "antd";
import React, { useEffect, useState } from "react";

import { Copy } from "iconsax-react";
import { getUserInfo } from "@/common/api/user";
import { handleApi } from "@/common/utils";
import { selectValue } from "@/common/redux/utils";
import types from "@/common/redux/types";
import { useAppSelector } from "@/common/redux/hooks";
import { useCopyToClipboard } from "@/common/hooks/useCopyToClipboard";

const UserCode = () => {
    const [value, copy] = useCopyToClipboard();
    const [refCode, setRefCode] = useState();
    const { data: userInfo } = useAppSelector(selectValue(types.userInfo));

    const [messageApi, contextHolder] = message.useMessage();

    const handleCopy = () => {
        copy("https://");
        message.success({ content: "Copied to clipboard!" });
    };
    useEffect(() => {
        const fetchReferrals = async () => {
             const userIfo = await handleApi(getUserInfo(userInfo?.walletAddress), false);
             setRefCode(userIfo?.data?.data?.referralCode)
        }
        fetchReferrals();
    }, []);
    return (
        <div className="flex flex-col items-center text-center">
            <div className="title">
                <p className="text-xl ">Your Code</p>
                <p>Share this code with your friends to earn 1% of their profits!</p>
            </div>
            <div className="mt-5 code">
                <Input className=" w-[200px] h-full text-center text-4xl" style={{ color: "white" }} value={refCode} disabled />
            </div>
            <div className="grid grid-flow-col mt-5 link-ref gap-x-2">
                <Input
                    className="min-w-[200px] lg:w-[400px] h-[56px] text-center lg:text-2xl text-xs"
                    style={{ color: "white" }}
                    defaultValue="https://"
                    disabled
                />
                <Button onClick={handleCopy} className="grid items-center h-full bg-inherit hover:bg-slate-600">
                    <Copy />
                </Button>
            </div>
        </div>
    );
};

export default UserCode;
