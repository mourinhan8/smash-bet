import Image from "next/image";

const Twitch = () => {
  return (
    <div className="w-full flex-1 lg:pl-[20px]">
      <div className="bg-black relative lg:h-[45vh] lg:min-h-[460px] sm:h-[40vh] h-[230px] border border-[#47DEFF] rounded-[7px]">
        <div className="" style={{ width: "100%", height: "100%" }}>
          <div className="rounded-[7px]  overflow-hidden" id="twitch-embed" style={{ width: "100%", height: "100%" }}>
            <iframe
              src={`https://player.twitch.tv/?channel=smashbetscrypto&parent=${window.location.hostname}`}
              allowFullScreen
              scrolling="no"
              frameBorder={0}
              allow="autoplay; fullscreen"
              title="Twitch"
              sandbox="allow-modals rounded-[7px] overflow-hidden allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              width="100%"
              height="100%"
            />
          </div>
        </div>
        <div className="logo  absolute  -bottom-16 -right-12">
          <Image src="/svg/pokemon-item-1.svg" alt="" width={109} height={109} />
        </div>
      </div>
    </div>
  );
};

export default Twitch;
