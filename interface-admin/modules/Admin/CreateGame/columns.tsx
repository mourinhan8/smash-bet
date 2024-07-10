import dayjs from "dayjs";

const generateGameType = (value: any) => {
  switch (value) {
    case "against_system":
      return "Against System";
    case "against_others":
      return "Against Others";
    default:
      return "NaN"
  }
}

export const useGameColumns = () => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      fixed: 'left' as const,
    },
    {
      title: "Game Type",
      dataIndex: "type",
      key: "gameType",
      render: (value: any) => generateGameType(value)
    },
    {
      title: "First Character Id",
      dataIndex: "firstCharacterId",
      key: "firstCharacterId",
    },
    {
      title: "Second Character Id",
      dataIndex: "secondCharacterId",
      key: "secondCharacterId",
    },
    {
      title: "Third Character Id",
      dataIndex: "thirdCharacterId",
      key: "thirdCharacterId",
    },
    {
      title: "Fourth Character Id",
      dataIndex: "fourthCharacterId",
      key: "fourthCharacterId",
    },
    {
      title: "Winner Id",
      dataIndex: "winnerId",
      key: "winnerId",
    },
    {
      title: "Stream Url",
      dataIndex: "streamUrl",
      key: "streamUrl",
      width: 300
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: any) => (value ? dayjs(new Date(value)).format("MMM DD, YYYY - HH:mm:ss") : ""),
    },
    {
      title: "Started At",
      dataIndex: "startedAt",
      key: "startedAt",
      render: (value: any) => (value ? dayjs(new Date(value)).format("MMM DD, YYYY - HH:mm:ss") : ""),
    },
    {
      title: "Finished At",
      dataIndex: "finishedAt",
      key: "finishedAt",
      render: (value: any) => (value ? dayjs(new Date(value)).format("MMM DD, YYYY - HH:mm:ss") : ""),
    },
  ];
};
