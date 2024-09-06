import { encodeBase26 } from "./encode-base26";

export const partialBlok = (content: string) => {
    const info = content.split(':');

    const height = parseInt(info[0]);
    const runes = parseInt(info[1]);
    
    const name = encodeBase26(height);

    return { height, runes, name };
};
