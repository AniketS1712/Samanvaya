import React from "react";
import Lottie from "react-lottie";
import teamanimation from "../../Assets/animationData.json";

function TeamWorkAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: teamanimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={600} width={600} />
    </div>
  );
}

export default TeamWorkAnimation;