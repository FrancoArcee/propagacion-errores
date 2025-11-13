// src/components/StepSidebar.jsx
import React from "react";
import "./styles/StepSideBar.css";

export const StepSideBar = ({ stepNumber, totalSteps, title, description }) => {
  const progressPercent = (stepNumber / totalSteps) * 100;

  return (
    <div className="step-sidebar">
      <div className="progress-bar">
        <div
          className="progress-bar-inner"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <div className="progress-text">
        Paso {stepNumber}/{totalSteps}
      </div>

      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
