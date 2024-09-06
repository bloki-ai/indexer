# @bloki/indexer

This module operates on top of Ordinals, indexing every valid Blok directly from Bitcoin in accordance with the Blok Protocol.

You can configure the Ordinals endpoint and data directory by updating the `constants.ts` file as needed.

Initialization is faster than updates because the code is designed to run frequently as part of a scheduled job or similar process.

Install using `npm install` build `npm build` and start `npm start`.
