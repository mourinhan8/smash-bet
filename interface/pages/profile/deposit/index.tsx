import Header from "@/common/components/Header";
import TopTabs from "@/modules/Menu/TopTabs";
import DepositForm from "@/modules/Play/Deposit/DepositForm";
import DepositHistory from "@/modules/Play/Deposit/DepositHistory";

const DepositPage = () => {
  return (
    <main className="min-h-screen text-white bg-no-repeat bg-cover bg-play play-page ">
      <Header />
      <div className="top-0 left-0 z-10 flex flex-col w-full pt-6 pb-5 transition-all">
        <div className=" justify-center px-4 pb-4  w-full h-full grid-rows-[100px_1fr] grid-cols-1 grid">
          <TopTabs />

          <div className="mt-5 rounded-md">
            <div className="flex flex-col items-center justify-center p-4 ">
              <div className="text-lg text-center title">
                <div className="flex items-center text-5xl lg:text-[65px] font-extrabold justify-center gap-2 text-white">DEPOSIT</div>
                <div className="mt-2">Deposit USDT.</div>
                <div className="">You will be credited USDT that represents your deposit.</div>
                <div className="">You can withdraw your USDT at any time.</div>
              </div>
              <div className="form mt-10 xl:w-[55vw] lg:w-[75vw] w-full">
                <DepositForm />
              </div>
              <div className="mt-10 xl:w-[55vw] lg:w-[75vw] w-full">
                <DepositHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DepositPage;
