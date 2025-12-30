import React, { useState, useEffect } from 'react';
import type { ClockAngles } from '@/utils/tools';

/**
 * 时钟组件
 */
const Clock: React.FC = () => {
  const [angles, setAngles] = useState<ClockAngles>(window.$tools.getTimeRotate());

  useEffect(() => {
    const timer = setInterval(() => {
      setAngles(window.$tools.getTimeRotate());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="watch_box">
      <span
        className="hour_hand"
        style={{ transform: `rotate(${angles.hourAngle}deg)` }}
      />
      <span
        className="minute_hand"
        style={{ transform: `rotate(${angles.minAngle}deg)` }}
      />
      <span className="circle_dot" />
    </div>
  );
};

export default Clock;

