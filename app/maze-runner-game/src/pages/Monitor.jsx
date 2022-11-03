import PlayerStatus from "components/PlayerStatus";
import useSockJsClient from "hooks/useSockJsClient";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SOCKET_URL } from "util/socket";
import "./Monitor.scss";

const Monitor = () => {
	const { roomId } = useParams();
	const [connected, message] = useSockJsClient(SOCKET_URL, `/room/${roomId}`);
	const [data, setData] = useState([]);
	const [ranking, setRanking] = useState([]);

	useEffect(() => {
		if (connected && message.userId) {
			let players = [...data];
			const index = data.findIndex((player) => player.userId === message.userId);

			if (index === -1) {
				setData((data) => [...data, { ...message, timer: Date.now() + 1200000, finished: false }]);
			} else {
				const isPlayerFinished = message.progress === 100 && message.currentLevel === 3;

				players[index] = { ...players[index], ...message, finished: isPlayerFinished };
				setData(players);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [connected, message]);

	useEffect(() => {
		const pts = data.map((player) => (player.currentLevel * 100 + player.progress) * player.timer);
		const sorted = [...new Set(pts)].sort((a, b) => b - a);
		const rank = new Map(sorted.map((x, i) => [x, i + 1]));

		setRanking(pts.map((x) => rank.get(x)));
	}, [data]);

	return (
		connected && (
			<div className="monitor-page">
				<h2>Maze Runner Game</h2>
				<h3>Monitoring Room: {roomId}</h3>
				<table>
					<thead>
						<tr>
							<th>Players</th>
							<th>Current Level</th>
							<th>Progress</th>
							<th>Time Left</th>
							<th>Ranking</th>
						</tr>
					</thead>
					<tbody>
						{data.map((player, i) => (
							<PlayerStatus key={player.userId} player={player} rank={ranking[i]} />
						))}
					</tbody>
				</table>
			</div>
		)
	);
};

export default Monitor;
