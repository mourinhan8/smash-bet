import { Badge, Button, Col, Input, Progress, Row, message } from "antd";
import { Copy, Heart, Notification, Twitch } from "iconsax-react";

import CopyToClipboard from "react-copy-to-clipboard";
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="relative overflow-hidden h-full  lg:h-[115vh]">
      <div className="absolute z-100 flex justify-between items-end lg:-bottom-12">
        <div className="logo   hidden relative z-0  lg:block -left-40">
          <Image src="/svg/item-2.svg" alt="" width={1507} height={680} />
        </div>
        <div className="logo  hidden lg:block relative right-0 -mb-5">
          <Image src="/svg/item-1.svg" alt="" width={866} height={900} />
        </div>
      </div>
      <div className="bg-inherit relative  landing-page text-xs lg:text-base 2xl:text-lg grid lg:grid-cols-2 w-full px-5 mx-auto justify-between lg:px-[80px] text-white">
        <div className="info text-center lg:text-left lg:col-span-1 lg:mt-[8vh] mt-[7vh]">
          <div className="content">
            <div className="text-lg lg:text-[25px] ">Worlds first live streamed</div>
            <div className=" text-[50px] lg:text-[60px] 2xl:text-[80px] main-title mt-2 lg:mt-3 uppercase leading-[60px]">
              Smash Showdown
            </div>
            <div className="mt-3 lg:mt-5 sm:mx-[20vw] lg:mx-0 pr-0 lg:pr-[9vw]">
              At SmashShowdown, we bring together the thrill of esports and the excitement of online betting. Choose your favorite Super
              Smash Bros characters, let them duke it out, and get a chance to win incredible prizes!
            </div>
          </div>
          <div className="connect lg:flex grid items-center justify-items-center lg:justify-start justify-center mt-[40px]">
            <Link href="/play">
              <div className="button text-base relative z-100 cursor-pointer main-title bg-button text-[25px] uppercase bg-cover py-5 lg:py-4lg:px-10  px-16 sm:px-16 sm:py-[22px] w-fit   bg-no-repeat">
                start betting
              </div>
            </Link>
            <div className="social relative z-100  flex ml-4 space-x-3 mt-5 lg:mt-0">
              <a target="_blank" href="/">
                <Image src="/svg/social/twitter.svg" alt="" width={38} height={30} />
              </a>
              <a target="_blank" href="/">
                <Image src="/svg/social/telegram.svg" alt="" width={37} height={30} />
              </a>
            </div>
          </div>
        </div>
        <div className="live mb-10 lg:mb-0 lg:col-span-1 mt-10 lg:mt-0 relative">
          <div className="screen shadow-[0px_0px_14px_1px] border-[0.6px] border-solid border-[#67C8FF]  shadow-[#3F91FF] bg-black lg:w-[40vw] h-[30vh] sm:h-[40vw] lg:h-[25vw] mt-36">
            {" "}
            <iframe
              src={`https://player.twitch.tv/?channel=smashbetscrypto&parent=${window.location.hostname}`}
              allowFullScreen
              allow="autoplay; fullscreen"
              title="Twitch"
              sandbox="allow-modals rounded-[7px] overflow-hidden allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              width="100%"
              height="100%"
            />
          </div>
          <div className="logo absolute z-100 flex justify-center mx-auto w-full lg:w-[40vw]  top-5 lg:-top-3">
            <Image src="/images/monkey-logo.png" alt="" width={478} height={218} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
