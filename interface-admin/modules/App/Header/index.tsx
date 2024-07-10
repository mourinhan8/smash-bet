import { useAuth } from "@/common/hooks/useAuth";
import { Avatar } from "antd";

const AppHeader = () => {
  const { profile } = useAuth();
  return (
    <div className=" bg-black sticky md:flex text-[#333A6D] pr-4 md:px-4 right-0 left-0 top-0 z-20 flex items-center justify-between">
      <div className="grid w-auto h-full p-0 py-2 cursor-pointer md:block md:h-fit"></div>
      <div className="py-2 ml-auto text-base text-white md:ml-0 avatar">
        <Avatar className="mr-2 bg-blue-500">{profile?.email?.charAt(0)}</Avatar>
        <span>{profile?.email}</span>
      </div>
    </div>
  );
};

export default AppHeader;
