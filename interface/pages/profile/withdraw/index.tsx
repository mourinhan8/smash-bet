import { GetHistoryResponse, Transaction, getHistory } from "@/common/api/profile";
import Header from "@/common/components/Header";
import { handleApi } from "@/common/utils";
import TopTabs from "@/modules/Menu/TopTabs";
import WithdrawForm from "@/modules/Play/Withdraw/WithdrawForm";
import WithdrawHistory from "@/modules/Play/Withdraw/WithdrawHistory";
import { ResponseStatus } from "@/common/types";
import { useState } from "react";
import { useAppSelector } from "@/common/redux/hooks";
import { selectValue } from "@/common/redux/utils";
import types from "@/common/redux/types";

const ITEM_PER_PAGE = 10;

const WithdrawPage = () => {
  const { data: userInfo } = useAppSelector(selectValue(types.userInfo));

  const [withdrawList, setWithdrawList] = useState<Transaction[]>([]);
  const [itemsPerPage] = useState(ITEM_PER_PAGE);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUserWithdrawHistory = async (userId: number, page = 1) => {
    try {
      const { data: res } = await handleApi<GetHistoryResponse<Transaction[]>>(getHistory(userId, itemsPerPage, page, "withdraw"), false);
      if (res.data.code === ResponseStatus.OK) {
        setWithdrawList(res?.data?.data?.transactions);
        setTotal(res?.data?.data?.total || 0);
      }
    } catch (error) {
      console.log("fetchUserWithdrawHistory error", error);
    }
  };

  const handlePageChange = ({ current }: any) => {
    setCurrentPage(current);
    fetchUserWithdrawHistory(userInfo?.id, current);
  };

  return (
    <main className="bg-play play-page bg-no-repeat bg-cover text-white min-h-screen">
      <Header />
      <div className="pb-5 top-0 left-0 w-full pt-6 transition-all  z-10 flex flex-col">
        <div className=" justify-center px-4 pb-4  w-full h-full grid-rows-[100px_1fr] grid-cols-1 grid">
          <TopTabs />

          <div className="mt-5 bg-inherit  border-white">
            <div className="flex flex-col items-center justify-center p-4 ">
              <div className="title text-center grid justify-items-center">
                <div className="flex items-center text-5xl lg:text-[65px] font-extrabold justify-center gap-2 text-white">WITHDRAW</div>
                <div className="text-base mt-2">Withdraw USDT on the ETH network.</div>
                <div className="text-base bg-red-500 mt-2 rounded-[5px] w-fit px-5">Your wallet must have access to the ETH network!</div>
              </div>
              <div className="form mt-5 xl:w-[30vw] lg:w-[30vw] w-full">
                <WithdrawForm fetchUserWithdrawHistory={fetchUserWithdrawHistory} currentPage={currentPage} />
              </div>
              <div className="mt-10 xl:w-[55vw] lg:w-[75vw] w-full">
                <WithdrawHistory fetchUserWithdrawHistory={fetchUserWithdrawHistory} handlePageChange={handlePageChange} withdrawList={withdrawList} total={total} currentPage={currentPage} itemsPerPage={itemsPerPage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WithdrawPage;
