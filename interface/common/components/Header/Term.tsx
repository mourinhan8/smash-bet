import { memo, useState } from "react";

import Image from "next/image";
import { Modal } from "antd";

const Term = () => {
  const [isModal, setModal] = useState(false);

  const handleCancel = () => {
    setModal(false);
  };

  return (
    <>
      <div className="flex items-center justify-center gap-3 ml-auto">
        <div
          className="term normal-text text-black md:text-white text-[18px] mr-5 hover:underline cursor-pointer"
          onClick={() => setModal(true)}
        >
          Term
        </div>
      </div>
      <Modal
        width={"70vw"}
        className="relative rounded-[10px] bg-white p-0 modal-scroll"
        open={isModal}
        onCancel={handleCancel}
        footer={false}
      >
        <div className="px-3 lg:px-[60px] normal-text sm:mt-[8vh] lg:mt-[70px] h-[70vh] lg:h-[60vh] lg:pb-[20px] overflow-y-scroll mb-3">
          <div className="logo absolute right-5 w-[60vw] lg:w-full flex justify-center -top-[75px] lg:-top-20 z-100">
            <Image src="/images/monkey-logo.png" alt="" width={395} height={171} objectFit="contain" />
          </div>
          <div className="space-y-3 text-black content">
            <div>
              <div className="font-bold title">Welcome to SmashShowdown!</div>
              <div className="space-y-3 detail">
                <p className="mt-3">
                  Do you have a keen eye for Super Smash Bros tactics? Have you ever predicted the outcome of a heated match between your
                  favorite characters? If so, SmashShowdown is the platform for you!
                </p>
                <p> SmashShowdown - Where your predictions pay off!</p>
                <p>
                  At SmashShowdown, we bring together the thrill of esports and the excitement of online betting. Choose your favorite Super
                  Smash Bros characters, let them duke it out, and get a chance to win incredible prizes!
                </p>
              </div>
            </div>
            <div>
              <div className="font-bold title"> How it works</div>
              <div className="space-y-3 detail">
                <p className="mt-3">
                  Place your bet: Once you&apos;ve deposited, it&apos;s time to place your bet. Be strategic - consider each
                  character&apos;s abilities and the player&apos;s gaming history.
                </p>
                <p>
                  Watch the battle unfold: Now, you get to watch your chosen characters battle it out in real-time. Join our live chats,
                  cheer for your favorites, and enjoy the exciting world of Super Smash Bros esports.
                </p>
                <p>
                  Claim your winnings: If your chosen character emerges victorious, it&apos;s time to collect your winnings. It&apos;s as
                  simple as that!
                </p>
              </div>

              <div>
                <div className="mt-3 font-bold title">Why choose SmashShowdown?</div>
                <div className="space-y-3 detail">
                  <p className="mt-3">
                    Do you have a keen eye for Super Smash Bros tactics? Have you ever predicted the outcome of a heated match between your
                    favorite characters? If so, SmashShowdown is the platform for you!
                  </p>
                  <p> SmashShowdown - Where your predictions pay off!</p>
                  <p>
                    At SmashShowdown, we bring together the thrill of esports and the excitement of online betting. Choose your favorite
                    Super Smash Bros characters, let them duke it out, and get a chance to win incredible prizes!
                  </p>
                </div>
              </div>
              <div>
                <div className="font-bold title"> How it works</div>
                <div className="space-y-3 detail">
                  <p className="mt-3">
                    Place your bet: Once you&apos;ve deposited, it&apos;s time to place your bet. Be strategic - consider each
                    character&apos;s abilities and the player&apos;s gaming history.
                  </p>
                  <p>
                    Watch the battle unfold: Now, you get to watch your chosen characters battle it out in real-time. Join our live chats,
                    cheer for your favorites, and enjoy the exciting world of Super Smash Bros esports.
                  </p>
                  <p>
                    Claim your winnings: If your chosen character emerges victorious, it&apos;s time to collect your winnings. It&apos;s as
                    simple as that!
                  </p>
                </div>

                <div>
                  <div className="mt-3 font-bold title">Why choose SmashShowdown?</div>
                  <div className="space-y-3 detail">
                    <p className="mt-3">
                      Fair Play: Our matches are based on actual virtual tournaments hosted by trusted gaming communities. Integrity and
                      fairness are our top priorities.
                    </p>
                    <p>
                      Quick Payouts: There&apos;s no waiting period to claim your winnings. As soon as your character wins, your account
                      gets credited instantly.
                    </p>
                    <p>
                      Safe & Secure: We&apos;re committed to providing a safe and secure betting environment. All your transactions are
                      protected by top-level security measures.
                    </p>
                    <p>24/7 Support: Have questions? Our customer support team is available round the clock to assist you.</p>
                    <p>
                      Join the SmashShowdown community today. Watch your favorite characters clash. Make your predictions. Win prizes.
                      Experience the thrilling world of Super Smash Bros in a whole new way!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo(Term);
