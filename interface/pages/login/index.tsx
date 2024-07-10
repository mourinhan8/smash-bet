import Header from "@/common/components/Header";
import { Web3Button } from "@web3modal/react";

const LoginPage = () => {
  return (
    <div className="bg-play">
      <Header />
      <div className="w-full flex items-center justify-center h-[calc(100vh-74px)]">
        <div className="flex p-4 flex-col w-[700px] rounded-md  border-2 bg-game-gray-dark">
          <div className="text-4xl font-bold text-center text-white text-stroke">SIGN IN</div>
          <div className="flex flex-row items-center justify-center gap-2 p-4 mt-4 text-center border-2 rounded-md">
            <Web3Button icon="show" label="Connect Wallet" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
