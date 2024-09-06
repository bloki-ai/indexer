import { constants } from "./constants";

export type Rune = {
    entry: {
        spaced_rune: string,
        premine: number,
    },
    id: string,
    parent: string,
    mintable: boolean,
};

export const rune = async (rune: string): Promise<Rune> => {
    return await (
        await fetch(
            constants.ordinals.api + constants.ordinals.rune.replace(':rune', rune),
            {
                headers: {
                    accept: "application/json",
                },
            }
        )
    ).json();
}