import { constants } from "./constants";

export const content = async (inscription: string) => await (
    await fetch(constants.ordinals.api + constants.ordinals.content.replace(':inscription', inscription))
).text();
