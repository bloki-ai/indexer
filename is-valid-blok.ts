import { block as _block } from "./block";
import { partialBlok } from "./partial-blok";
import { Rune } from "./rune";

export const isValidBlok = async (rune: Rune, content: string) => {
    try {
        const { height, runes, name } = partialBlok(content);

        const block = await _block(height);

        if (
            block.runes.length !== runes ||
            rune.entry.spaced_rune !== `BLOK•BLOK•BLOK•${name}` ||
            rune.mintable === true ||
            rune.entry.premine !== (runes > 0 ? runes : 1)
        ) throw new Error();

        return true;
    } catch {
        return false;
    }
};
