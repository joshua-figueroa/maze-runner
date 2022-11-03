import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "redux/reducers/user";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const useSockJsClient = (url, path) => {
	const [client, setClient] = useState();
	const { userId, userName } = useSelector(selectUser);
	const [connected, setConnected] = useState(false);
	const [message, setMessage] = useState({});

	const _initStompClient = () => {
		const stompClient = Stomp.over(new SockJS(url));
		stompClient.debug = false;
		setClient(stompClient);

		return stompClient;
	};

	const _processMessage = (msgBody) => {
		try {
			return JSON.parse(msgBody);
		} catch (e) {
			return msgBody;
		}
	};

	useEffect(() => {
		const client = _initStompClient();
		client.connect({}, () => {
			setConnected(true);
			client.subscribe(path, (greeting) => {
				const message = _processMessage(greeting.body);
				if (message.userId !== userId) setMessage(message);
			});
		});

		return () => {
			if (client !== null) {
				client.disconnect();
			}
			setConnected(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const sendMessage = (message) => {
		if (connected && client) {
			client.send(
				path,
				{},
				JSON.stringify({
					...message,
					userId,
					userName,
				})
			);
		}
	};

	return [connected, message, sendMessage];
};

export default useSockJsClient;
