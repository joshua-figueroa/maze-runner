import { Howl } from "howler";

export const getAudioElement = (audioName) => new Audio(require(`assets/sounds/${audioName}.wav`));

export const getHowlerAudio = (audioName) =>
	new Howl({
		src: require(`assets/sounds/${audioName}.wav`),
		autoplay: true,
		loop: true,
	});
