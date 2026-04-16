import type { Player, Room } from "./room.type";

const rooms = new Map<string, Room>();

export const createRoom = (roomId: string): Room => {
  const room: Room = {
    id: roomId,
    players: [],
  };

  rooms.set(roomId, room);
  return room;
};

export const getRoom = (roomId: string) => {
  return rooms.get(roomId);
};

export const addPlayerToRoom = (roomId: string, player: Player) => {
  const room = rooms.get(roomId);
  if (!room) return null;

  room.players.push(player);
  return room;
};
