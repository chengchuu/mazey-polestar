# Archived WordPress runtime

This directory preserves the readable legacy WordPress runtime after its required behavior migrated
to the Polestar theme. The files originally lived at `src/pages/wordpress/index.js` and
`src/pages/wordpress/previous.js`, and formerly produced `lib/wordpress.js`.

The active compatibility notice is `src/wordpress.js`. The current implementation is
`/Users/mazey/Web/web/blog-mazey-net/wp-content/themes/polestar/js/wordpress-runtime.js`; future
behavior changes belong in that theme. The migration was introduced by commit
`f50968f7bfbef38f82f6519523583943318d5af5`.

This archive is historical and intentionally not buildable. Do not build, import, deploy, fix, or
use these files as the source of current behavior.
