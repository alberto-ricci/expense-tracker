import React, { useEffect, useRef } from "react";
import "./tooltip.css";

export function Tooltip({ text, children }) {
  const tooltipRef = useRef(null);

  const adjustTooltipPosition = () => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    const rect = tooltip.getBoundingClientRect();
    const overflowRight = rect.right - window.innerWidth;
    const overflowLeft = rect.left;

    if (overflowRight > 0) {
      tooltip.style.transform = `translateX(${-overflowRight}px)`;
    } else if (overflowLeft < 0) {
      tooltip.style.transform = `translateX(${Math.abs(overflowLeft)}px)`;
    }
  };

  useEffect(() => {
    adjustTooltipPosition();
    window.addEventListener("resize", adjustTooltipPosition);

    return () => {
      window.removeEventListener("resize", adjustTooltipPosition);
    };
  }, []); // Empty dependency array means this effect will only run once

  return (
    <div className="tooltip">
      {children}
      <span className="tooltiptext" ref={tooltipRef}>
        {text}
      </span>
    </div>
  );
}
