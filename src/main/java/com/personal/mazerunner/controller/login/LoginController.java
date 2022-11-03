package com.personal.mazerunner.controller.login;

import javax.validation.Valid;

import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mail.MailParseException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    private JavaMailSender emailSender;

    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void sendSimpleMessage(@Valid @RequestBody JsonNode payload) {
        String recipientEmail = payload.get("email").asText();

        MimeMessagePreparator mailMessage = mimeMessage -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true);

            try {
                message.setSubject("Maze Runner Authentication"); 
                message.setFrom("noreply.mazerunner@gmail.com", "Maze Runner");
                message.addTo(recipientEmail); 
                message.setText("028313");
            } catch (Exception e) {
                throw new MailParseException(recipientEmail, e);
            }
        };
        
        emailSender.send(mailMessage);
    }
}
