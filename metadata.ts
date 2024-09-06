import { constants } from "./constants";

export const metadata = async (inscription: string): Promise<string> => {
    return await (
        await fetch(
            constants.ordinals.api + constants.ordinals.metadata.replace(':inscription', inscription),
            {
                headers: {
                    accept: "application/json",
                }
            }
        )
    ).json();
};
