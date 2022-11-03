/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
import Square from "components/Square";
import React, { useEffect, useState } from "react";
import { fifteenByFifteenBoard, tenByTenBoard, twentyByTwentyBoard } from "util/board";
import useEventListener from "@use-it/event-listener";
import "./Board.scss";
import { getAudioElement } from "util/audio";
import { useNavigate, useParams } from "react-router-dom";
import useSockJsClient from "hooks/useSockJsClient";
import { useSelector } from "react-redux";
import { selectUser } from "redux/reducers/user";
import { SOCKET_URL } from "util/socket";

const INITIAL_COORD = {
	x: 0,
	y: 1,
};
const Board = () => {
	const { roomId } = useParams();
	const navigate = useNavigate();
	const { userName, userId } = useSelector(selectUser);
	const [row, setRow] = useState(INITIAL_COORD.x);
	const [col, setCol] = useState(INITIAL_COORD.y);
	const [board, setBoard] = useState(tenByTenBoard);
	const [totalDistance, setTotalDistance] = useState(0);
	const [, setCenter] = useState({
		x: 0,
		y: 0,
	});
	const [connected, _, sendMessage] = useSockJsClient(SOCKET_URL, `/room/${roomId}`);

	const toggleBoard = (board) => {
		setRow(INITIAL_COORD.x);
		setCol(INITIAL_COORD.y);
		if (board === tenByTenBoard) setBoard(fifteenByFifteenBoard);
		else if (board === fifteenByFifteenBoard) setBoard(twentyByTwentyBoard);
	};

	const getLastCoord = (board) => {
		return {
			x: board.length - 2,
			y: board.length - 1,
		};
	};

	const getCurrentLevel = () => {
		switch (board) {
			case tenByTenBoard:
				return 1;
			case fifteenByFifteenBoard:
				return 2;
			case twentyByTwentyBoard:
				return 3;
		}
	};

	const getAlertMessage = () => {
		switch (board) {
			case tenByTenBoard:
			case fifteenByFifteenBoard:
				return "Congrats on completing this round. You can now move onto the next";
			case twentyByTwentyBoard:
				return "Congratulations on completing the game";
		}
	};

	useEventListener("keydown", (event) => {
		switch (event.key) {
			case "ArrowLeft":
				if (board[row][col - 1] === 1) setCol((col) => col - 1);
				break;
			case "ArrowRight":
				if (board[row][col + 1] === 1) setCol((col) => col + 1);
				break;
			case "ArrowUp":
				if (board[row - 1][col] === 1) setRow((row) => row - 1);
				break;
			case "ArrowDown":
				if (board[row + 1][col] === 1) setRow((row) => row + 1);
				break;
		}
	});

	useEventListener("mousemove", (event) => {
		var x = event.clientX;
		var y = event.clientY;

		document.documentElement.style.setProperty("--cursorX", x + "px");
		document.documentElement.style.setProperty("--cursorY", y + "px");
	});

	useEffect(() => {
		const { x: x1, y: y1 } = INITIAL_COORD;
		const { x: x2, y: y2 } = getLastCoord(board);
		const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

		setTotalDistance(distance);

		// Lights off
		document.documentElement.style.setProperty("--isVisible", "hidden");
		setTimeout(() => {
			document.documentElement.style.setProperty("--isVisible", "visible");
		}, 5000);
	}, [board]);

	useEffect(() => {
		if (!userName || !userId) {
			navigate("/");
		}
	}, [navigate, userId, userName]);

	useEffect(() => {
		const moveAudio = getAudioElement("move");
		moveAudio.volume = 0.2;
		moveAudio.play();
	}, [row, col]);

	useEffect(() => {
		// Get current distance
		const { x: x1, y: y1 } = INITIAL_COORD;
		const [x2, y2] = [row, col];
		const currentDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

		if (row === getLastCoord(board).x && col === getLastCoord(board).y) {
			// Round Complete sound
			if (board === twentyByTwentyBoard) {
				getAudioElement("final").play();
			} else {
				getAudioElement("complete").play();
			}

			const timer = setTimeout(() => {
				alert(getAlertMessage());
				toggleBoard(board);
			}, 1000);
			return () => clearTimeout(timer);
		}

		// Send updates
		sendMessage({
			currentCol: col,
			currentRow: row,
			currentLevel: getCurrentLevel(),
			progress: (currentDistance / totalDistance) * 100 || 0,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [row, col, board]);

	useEffect(() => {
		const offsets = document.getElementById("player").getBoundingClientRect();

		const centerX = offsets.top + offsets.width / 2;
		const centerY = offsets.left + offsets.height / 2;

		setCenter({ x: centerX, y: centerY });
	}, [row, col, setCenter]);

	return (
		<div className="board">
			<h1>Maze Runner Game</h1>
			{board.map((xValues, currentRow) => (
				<div key={currentRow} className="x-axis">
					{xValues.map((yValues, currentCol) => (
						<Square
							key={currentCol}
							isActive={currentRow === row && currentCol === col}
							isPath={yValues === 1}
							isStart={currentRow === INITIAL_COORD.x && currentCol === INITIAL_COORD.y}
							isFinish={currentRow === getLastCoord(board).x && currentCol === getLastCoord(board).y}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default Board;
