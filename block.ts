import { constants } from "./constants";

export const block = async (height: number): Promise<{ runes: string[], inscriptions: string[] }> => {
    return await (
        await fetch(
            constants.ordinals.api + constants.ordinals.block.replace(':block', height.toString()),
            {
                headers: {
                    accept: "application/json",
                }
            }
        )
    ).json();
}