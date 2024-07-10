import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/router";

const TopTabs = () => {
  const router = useRouter();

  const renderTabList = useCallback(() => {
    const tabList = [
      {
        link: "/profile/smash",
        label: "SMASH",
      },
      {
        link: "/profile/$smash",
        label: "$SMASH",
      },
      {
        link: "/profile/bets",
        label: "BETS",
      },
      {
        link: "/profile/deposit",
        label: "DEPOSIT",
      },
      {
        link: "/profile/withdraw",
        label: "WITHDRAW",
      },
      // {
      //   link: "/profile/referrals",
      //   label: "REFERRALS",
      // },
    ];
    return tabList.map((t, idx) => (
      <Link href={t.link} key={idx}>
        <div
          className={`${
            router.pathname == t.link ? "bg-[#47DEFF] text-black " : "bg-inherit text-white"
          }  flex text-xs border border-white lg:text-[30px] font-[600] px-4 gap-2 h-10 lg:h-fit lg:py-6 items-center justify-center hover:opacity-50 cursor-pointer rounded-lg`}
        >
          {t.label}
        </div>
      </Link>
    ));
  }, [router]);

  return <div className="grid justify-center w-full grid-cols-3 grid-rows-2 p-2 text-5xl lg:flex gap-7">{renderTabList()}</div>;
};

export default TopTabs;
