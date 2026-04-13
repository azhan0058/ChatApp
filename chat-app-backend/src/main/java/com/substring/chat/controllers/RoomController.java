package com.substring.chat.controllers;

import com.substring.chat.entities.Room;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/rooms")
public class RoomController {

     private RoomRepository roomRepository;

     public RoomController(RoomRepository roomRepository) {
           this.roomRepository = roomRepository;
     }

     //create room
     @PostMapping
     public ResponseEntity<?> createRoom ( @RequestBody String roomId ) { 
         
            if(roomRepository.findByRoomId(roomId)!= null)
            {
               //room is already there
               return ResponseEntity.badRequest().body("Room Already exist")
            }

            //create new room
            Room room = new Room();
            room.setRoomId(roomId);
            Room savedRoom = roomRepository.save(room);
            return ResponseEntity.status(HttpStatus.CREATED).body(room);
           
     }

     
     //get room: join
     @GetMapping("/{roomId}")
     public ResponseEntity<?> (@PathVariable String roomId) {
     
         Room room = roomRepository.findBYRoomId(roomId);

         if(room == null) {
             return ResponseEntity.badRequest().body("Room not found!");
         }
      
         return ResponseEntity.ok(room);
     }

     
     //get message of room
     
     @GetMapping("/{roomId}/messages")
     public ResponseEntity<List<Message>>  (
            @PathVariable String roomId,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "20", required = false) int size
     ) {
        
          Room room = roomRepository.findByRoomId(roomId);
          if(room == null) {
             return ResponseEntity.badRequest().build();
          }
          //get message;
          //pagination
          List<Message> message = room.getMessage();
          int start = Math.max(0, message.size() - (page+1)* size);
          int end = Math.min(message.size(), start + size);
          List<Message> paginatedMessage = message.subList(start, end);
          return ResponseEntitty.ok(message);
}
     

















}
