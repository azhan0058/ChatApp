package com.substring.chat.repositories;

import com.substring.chat.entities.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepository extends MongoRepository<Room, String> {

    // custom query
    Room findByRoomId(String roomId);
}