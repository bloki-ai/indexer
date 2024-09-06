import { Level } from "level";
import { constants } from "./constants";

export const height = async (db: Level) => {
    let _height = constants.height;

    try {
        _height = parseInt(
            await db.get('height')
        )
    } catch {}

    return _height;
};
