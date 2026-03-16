import React from "react";
import AnimatedAnt from "./animated-ant";
import styles from "../index.module.css";

import loginBgPart1 from "~/assets/images/login/login_bg_part1.png";
import loginBgPart2 from "~/assets/images/login/login_bg_part2.png";
import loginBgPart3 from "~/assets/images/login/login_bg_part3.png";
import loginBgPart4 from "~/assets/images/login/login_bg_part4.png";
import loginBgAnt1 from "~/assets/images/login/login_bg_ant1.png";
import loginBgAnt2 from "~/assets/images/login/login_bg_ant2.png";
import Clock from "~/modules/login/components/clock";

/**
 * 登录页面左侧装饰面板
 */
const LoginLeftPanel: React.FC = () => {
  return (
    <div className={styles.loginCardLeft}>
      <div className={styles.contentLeftIn}>
        {/* 背景装饰图片 */}
        <img src={loginBgPart1} alt="" className={`${styles.loginBgPart} ${styles.loginBgPart1}`} />
        <img src={loginBgPart2} alt="" className={`${styles.loginBgPart} ${styles.loginBgPart2}`} />
        <img src={loginBgPart3} alt="" className={`${styles.loginBgPart} ${styles.loginBgPart3}`} />
        <img src={loginBgPart4} alt="" className={`${styles.loginBgPart} ${styles.loginBgPart4}`} />

        {/* 切换开�?*/}
        <div className={styles.switchBox}>
          <span className={styles.switchHandle} />
        </div>

        {/* 时钟 */}
        <Clock />

        {/* 动画蚂蚁 */}
        <AnimatedAnt
          imageSrc={loginBgAnt1}
          width={124}
          height={122}
          xValues="0; 40; 10; 10; 0; 0; 0"
          yValues="-30; -20; -10; -10; 0; -30; -30"
          keyTimes="0; .15; .5; .6; .75;.9; 1"
          keySplines=" 0 0 1 1; 0 0 1 1; .5 0 .5 1; 0 0 1 1; 0 0 1 1; 0 0 1 1"
          variant="ant1"
        />
        <AnimatedAnt
          imageSrc={loginBgAnt2}
          width={259}
          height={187}
          xValues="70; 30; 10; 0; 5; 70; 70"
          yValues="30; 40; 20; 0; 5; 30; 30"
          keyTimes="0; .15; .5; .6; .75; .9;1"
          keySplines=".5 0 .5 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1"
          variant="ant2"
        />
      </div>
    </div>
  );
};

export default LoginLeftPanel;
