import React from "react";
import "./Button.scss";

const Button = ({ handleClick, text, className, icon = "retro-gaming" }) => {
	return (
		<button className={`custom-btn ${className}`} onClick={handleClick}>
			<img src={require(`assets/images/${icon}.png`)} alt={text} /> {text}
		</button>
	);
};

export default Button;
