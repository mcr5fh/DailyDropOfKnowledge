import React from "react";

export const LoadingSegement = () => {
  return (
    <div className="ui placeholder segment">
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading</div>
      </div>
    </div>
  );
};
