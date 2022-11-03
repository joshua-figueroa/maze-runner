import React from "react";
import classNames from "classnames";
import "./Square.scss";

const Square = ({ isPath, isActive, isStart, isFinish }) => {
	return (
		<div className={classNames("square", { path: isPath, wall: !isPath, start: isStart, finish: isFinish })}>
			{isActive && <span id="player"></span>}
		</div>
	);
};

export default Square;
