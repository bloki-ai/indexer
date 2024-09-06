import { Level } from "level";

export const putHeight = async (height: number, db: Level) => await db.put('height', height.toString());
