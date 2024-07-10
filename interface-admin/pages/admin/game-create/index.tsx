import AppLayout from "@/modules/App/Layout";
import CreateGame from "@/modules/Admin/CreateGame";
import { ReactElement } from "react";

const AdminCreateGame = () => {
  return <CreateGame />;
};

AdminCreateGame.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default AdminCreateGame;
