package com.personal.mazerunner.controller.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.personal.mazerunner.model.MessageDTO;

@RestController
public class WebSocketTextController {
    
	@Autowired
    SimpMessagingTemplate template;

	@PostMapping(path = "/send/{roomID}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> sendMessage(@RequestBody MessageDTO messageDTO, @PathVariable String roomID) {
		template.convertAndSend("/room/" + roomID, messageDTO);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@MessageMapping("/room/{roomID}")
	@SendTo("/room/${roomID}")
	public MessageDTO broadcastMessage(@Payload MessageDTO messageDTO) {
		return messageDTO;
	}
}
