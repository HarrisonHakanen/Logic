package com.logic_back.logic_back;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.pengrad.telegrambot.TelegramBot;
import com.pengrad.telegrambot.UpdatesListener;
import com.pengrad.telegrambot.response.SendResponse;
import com.pengrad.telegrambot.request.SendMessage;


import java.io.File;


@SpringBootApplication
@EnableScheduling
public class LogicBackApplication {
	
	@Value("${chat.id}")
    private long chatId;

	public static void main(String[] args) {
		SpringApplication.run(LogicBackApplication.class, args);
	}
	
	@Scheduled(fixedRate = 600000)
    public void checkDiskSpace() {
		
		
        File discoRaiz = new File("/");
        long espacoLivreMb = discoRaiz.getFreeSpace();
        String espacoLivre = "Espaço livre no disco: " + espacoLivreMb / (1024 * 1024) + " MB";
        
        
        TelegramBot bot = new TelegramBot("1410586795:AAHbI7S1jUDSfk9OLYotnQdGJyAdbMMYAkc");
        
        bot.setUpdatesListener(updates -> {
            return UpdatesListener.CONFIRMED_UPDATES_ALL;
        }, e -> {
            if (e.response() != null) { 
                e.response().errorCode();
                e.response().description();
            } else {
                e.printStackTrace();
            }
        });
        
        SendResponse response = bot.execute(new SendMessage(chatId, espacoLivre));
    }
}
