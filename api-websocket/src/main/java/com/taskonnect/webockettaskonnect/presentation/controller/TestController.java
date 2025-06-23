package com.taskonnect.webockettaskonnect.presentation.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class TestController {

    @MessageMapping("/test")
    public void testMessage(@Payload Map<String, String> mensaje) {
        System.out.println("✅ Mensaje recibido en el servidor: " + mensaje.get("contenido"));
    }
}
