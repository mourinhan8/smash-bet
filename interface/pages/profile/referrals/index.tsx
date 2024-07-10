import Header from "@/common/components/Header";
import ReferralHistory from "@/modules/Play/Referrals/ReferralHistory";
import TopTabs from "@/modules/Menu/TopTabs";
import UserCode from "@/modules/Play/Referrals/UserCode";

const ReferralsPage = () => {
  return (
    <main className="bg-play play-page bg-no-repeat bg-cover text-white min-h-screen">
      <Header />
      <div className="pb-5 top-0 left-0 w-full pt-6 transition-all z-10 flex flex-col">
        <div className=" justify-center px-4 pb-4  w-full h-full grid-rows-[100px_1fr] grid-cols-1 grid">
          <TopTabs />

          <div className="mt-5 bg-inherit border-white ">
            <div className="flex flex-col items-center justify-center p-4">
              <div className="flex items-center text-5xl lg:text-[65px] font-extrabold justify-center gap-2 text-white">REFERRALS</div>
              <div className="text-3xl mt-2">Referrals.</div>
              <div className="mt-5 xl:w-[30vw] lg:w-[30vw] w-full">
                <UserCode />
              </div>
              <div className="mt-10 xl:w-[55vw] lg:w-[75vw] w-full">
                <ReferralHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReferralsPage;
