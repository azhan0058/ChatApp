package com.substring.chat.repositories;


import com.sbstring.chat.entities.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepository extends MongoRepository<Room, String> {
        //get room using room Id
        Room findById(String RoomId);
}