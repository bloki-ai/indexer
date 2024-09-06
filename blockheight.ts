import { constants } from "./constants";

export const blockheight = async () => parseInt(
    await (
        await fetch(constants.ordinals.api + constants.ordinals.blockheight)
    ).text()
);
