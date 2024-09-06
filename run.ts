import * as cbor from "cbor";
import { db as _db } from "./db";
import { blockheight as _blockheight } from "./blockheight";
import { height as _height } from "./height";
import { block as _block } from "./block";
import { rune as _rune } from "./rune";
import { inscription as _inscription } from "./inscription";
import { content as _content } from "./content";
import { putHeight } from "./put-height";
import { isValidBlok } from "./is-valid-blok";
import { partialBlok } from "./partial-blok";
import { metadata as _metadata } from "./metadata";

export * from './db';

export type Blok = {
    address: string;
    index: string;
    id: string;
    height: string;
    runes: string;
    name: string;
    supply: string;
    content: string;
    parent: string;
    inscription: string;
    keywords: string;
};

export const run = async () => {
    const db = await _db();
    const blockheight = await _blockheight();
    let height = await _height(db);

    while (blockheight >= height) {
        console.time(height.toString());
        const block = await _block(height);
    
        const bloks = block.runes.filter((rune) => rune.includes("BLOK•BLOK•BLOK"));
        
        for (const blok of bloks) {
            const rune = await _rune(blok);
            let content = await _content(rune.parent);

            const valid = await isValidBlok(rune, content);

            if (!valid) continue;

            const partial = await partialBlok(content);

            try {
                await db.get<string, string>(partial.name, { valueEncoding: "json" });
                continue;
            } catch {}

            let length = 0;
            
            try {
                length = parseInt(await db.get<string, string>("length", { valueEncoding: "json" }));
            } catch {}

            let keywords = "";
            const parent = await _inscription(rune.parent);

            let address = parent.address;
            let ins = rune.parent;

            if (parent.children.length > 0) {
                const inscription = parent.children[parent.children.length - 1];
                content = await _content(inscription);
                const child = await _inscription(inscription);
                address = child.address;
                ins = child.id;

                try {
                    const metadata = await _metadata(inscription);
                    const meta = cbor.decode(metadata);
                    if (meta.keywords && Array.isArray(meta.keywords)) {
                        keywords = meta.keywords.join(', ');
                    }
                } catch {}
            }

            const data: Blok = {
                address,
                index: length.toString(),
                id: rune.id,
                parent: rune.parent,
                height: partial.height.toString(),
                runes: partial.runes.toString(),
                name: rune.entry.spaced_rune,
                supply: rune.entry.premine.toString(),
                content,
                inscription: ins,
                keywords,
            };

            await db.put<string, Blok>(partial.name, data, { valueEncoding: "json" });
            await db.put<string, string>(length.toString(), partial.name, { valueEncoding: "json" });
            await db.put<string, string>(rune.parent, partial.name, { valueEncoding: "json" });
            await db.put<string, string>("length", (length + 1).toString(), { valueEncoding: "json" });
        }

        let synced = false;
        
        try {
            synced = await db.get<string, boolean>('synced', {  valueEncoding: "json" });
        } catch {}

        if (synced) {
            for (const inscription of block.inscriptions) {
                const data = await _inscription(inscription);
                for (const parent of data.parents) {
                    try {
                        const partial = await db.get<string, string>(parent, { valueEncoding: "json" });
                        const content = await _content(data.id);
                        const blok = await db.get<string, Blok>(partial, { valueEncoding: "json" });
    
                        blok.inscription = data.id;
                        blok.content = content;
                        blok.address = data.address;
    
                        try {
                            const metadata = await _metadata(inscription);
                            const meta = cbor.decode(metadata);
                            if (meta.keywords && Array.isArray(meta.keywords)) {
                                blok.keywords = meta.keywords.join(', ');
                            }
                        } catch {}

                        await db.put(partial, blok, { valueEncoding: "json" });
                    } catch {}
                }
            }
        }

        console.timeEnd(height.toString());

        height = height + 1;
        await putHeight(height, db);
    }

    await db.put<string, boolean>("synced", true, { valueEncoding: "json" });
};
