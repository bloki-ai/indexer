import { constants } from "./constants";

export const inscription = async (inscription: string): Promise<{
    children: string[],
    parents: string[],
    id: string,
    address: string,
}> => await (
    await fetch(
        constants.ordinals.api + constants.ordinals.inscription.replace(':inscription', inscription),
        {
            headers: {
                accept: "application/json",
            }
        }
    )
).json();
