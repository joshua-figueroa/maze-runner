import Button from "components/Button";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, setUserId, setUserName } from "redux/reducers/user";
import { getAudioElement } from "util/audio";
import { v4 as generateV4UUID } from "uuid";
import "./Home.scss";

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userId, userName } = useSelector(selectUser);
	const [name, setName] = useState(userName || "");
	const [roomId, setRoomId] = useState("");
	const [step, setStep] = useState(0);
	const [generated, setGenerated] = useState(false);

	const handleSound = () => {
		const moveAudio = getAudioElement("casino");
		moveAudio.volume = 0.5;
		moveAudio.play();
	};

	const handlePlay = () => {
		handleSound();

		if (name) {
			if (!userId) dispatch(setUserId(generateV4UUID()));
			if (!userName) dispatch(setUserName(name));
			setStep(2);
		} else {
			setStep(1);
		}
	};

	const handleRoom = (room) => setRoomId(room);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(roomId);
		alert("Copied roomID: " + roomId);
	};

	return (
		<div className="home-page">
			<h1>{userId && userName ? <>Welcome back to Maze Runner, {userName}!</> : <>Welcome to Maze Runner!</>}</h1>

			{step === 0 && <Button handleClick={handlePlay} text="Play" />}
			{step === 1 && (
				<>
					<input
						type="text"
						className="username-input"
						placeholder="(input username)"
						onChange={(e) => setName(e.currentTarget.value)}
						value={name}
						required
					/>

					<Button handleClick={handlePlay} text="Next" />
				</>
			)}
			{step === 2 && (
				<>
					<div className="input-container">
						{generated && <Button className="btn-copy" icon="copy" handleClick={handleCopy} />}
						<input
							name="room-input"
							type="text"
							className="room-input"
							placeholder="(join a room)"
							value={roomId}
							onChange={(e) => handleRoom(e.currentTarget.value)}
							autoComplete="off"
							required
						/>
					</div>
					<h2>or</h2>
					<div className="btn-container">
						<Button
							className="btn-generate"
							text="Generate room"
							handleClick={() => {
								setRoomId(generateV4UUID());
								setGenerated(true);
								handleSound();
							}}
						/>
						{roomId && <Button className="btn-join" text="Join" handleClick={() => navigate(`/room/${roomId}`)} />}
					</div>
				</>
			)}
		</div>
	);
};

export default Home;
