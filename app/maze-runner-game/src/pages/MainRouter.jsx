import Board from "pages/Board";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "pages/Home";
import Monitor from "./Monitor";

const MainRouter = () => {
	return (
		<Routes>
			<Route index element={<Home />} />

			<Route path="room">
				<Route index element={<Navigate to="/" replace />} />
				<Route path=":roomId" element={<Board />} />
			</Route>

			<Route path="monitor">
				<Route index element={<Navigate to="/" replace />} />
				<Route path=":roomId" element={<Monitor />} />
			</Route>

			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default MainRouter;
