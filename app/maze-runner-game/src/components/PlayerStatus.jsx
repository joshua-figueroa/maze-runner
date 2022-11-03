import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import Countdown from "react-countdown";

const PlayerStatus = ({ player, rank }) => {
	const timerRef = useRef(null);

	useEffect(() => {
		if (player.finished) {
			timerRef.current.pause();
		}
	}, [player.finished]);

	const renderTime = ({ minutes, seconds, completed }, finished) => (
		<span className={classNames({ finished, "times-up": completed })}>
			{minutes}:{seconds}
		</span>
	);

	const getRankColor = () => {
		// eslint-disable-next-line default-case
		switch (rank) {
			case 1:
				return "gold";
			case 2:
				return "silver";
			case 3:
				return "#cd7f32";
		}
	};

	return (
		<tr>
			<td>{player.userName}</td>
			<td>{player.currentLevel}</td>
			<td>{player.progress.toFixed(2)}%</td>
			<td>
				<Countdown date={player.timer} renderer={(props) => renderTime(props, player.finished)} ref={timerRef} />
			</td>
			<td style={{ color: getRankColor() }}>{rank}</td>
		</tr>
	);
};

export default PlayerStatus;
