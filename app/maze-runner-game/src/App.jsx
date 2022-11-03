import React, { useEffect } from "react";
import useEventListener from "@use-it/event-listener";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "pages/MainRouter";
import { getHowlerAudio } from "util/audio";
import { Howler } from "howler";

const App = () => {
	const audio = getHowlerAudio("horror");

	// useEventListener("contextmenu", (event) => {
	// 	event.preventDefault();
	// });

	useEventListener("keydown", (event) => {
		if (event.keyCode === 123) {
			return false;
		}

		if (event.ctrlKey && event.shiftKey && event.keyCode === "I".charCodeAt(0)) {
			return false;
		}

		if (event.ctrlKey && event.shiftKey && event.keyCode === "J".charCodeAt(0)) {
			return false;
		}

		if (event.ctrlKey && event.keyCode === "U".charCodeAt(0)) {
			return false;
		}
	});

	useEffect(() => {
		document.documentElement.style.setProperty("--isVisible", "hidden");
		audio.play();
		Howler.volume(0.1);

		return () => {
			audio.stop();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<BrowserRouter>
			<div className="maze-runner-app">
				<MainRouter />
			</div>
		</BrowserRouter>
	);
};

export default App;
