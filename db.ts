import { Level } from "level";
import { constants } from "./constants";

export const db = async () => new Level(constants.db, { valueEncoding: "json" });
