import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#F3FAFF] md:mt-10 text-white p-5">
      <div className="my-8 footer-social md:self-center md:col-start-2 md:my-0 ">
        <div className="flex justify-center gap-4 mt-3 icon ">
          <a href="" target="/_blank">
            <Image alt="" src="/svg/logo/twitter.svg" width={32} height={32} />
          </a>
          <a href="" target="/_blank">
            <Image alt="" src="/svg/logo/telegram.svg" width={32} height={32} />
          </a>
          <a href="" target="/_blank">
            <Image alt="" src="/svg/logo/discord.svg" width={32} height={32} />
          </a>
        </div>
      </div>
      <div className="footer-copy-right text-[#0979A6] text-center md:mt-4 md:font-bold md:leading-[28px]  md:text-[18px]">
        Copyright: ©DAOLAUNCHPAD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
