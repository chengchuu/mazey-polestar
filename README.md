# webpack-build-demo

[![npm version][npm-image]][npm-url]
[![license][l-image]][l-url]

[npm-image]: https://img.shields.io/npm/v/mazey-polestar
[npm-url]: https://www.npmjs.com/package/mazey-polestar
[l-image]: https://img.shields.io/npm/l/mazey-polestar
[l-url]: https://github.com/chengchuu/webpack-build-demo/blob/main/LICENSE

Not just a demo.

## Install

Use mazey-polestar via [npm](https://www.npmjs.com/package/mazey-polestar).

```bash
npm install mazey-polestar --save
```

## Contributing

### Development Environment

| Dependency | Version  |
|------------|----------|
| Node.js    | v22.22.2 |

### Develop library entries

Compile and serve every maintained JavaScript library on `127.0.0.1:4131`:

```bash
npm run dev
```

The server watches `addstyle.js`, `cdn.js`, `confluence.js`, `index.js`, `link.js`, `list.js`, `obfuscator.js`, `webhook.user.js`, and `wordpress.js`. It keeps output in memory and does not serve legacy `tiny.js` or `tiny.css`.

The sibling `pages` project owns the integrated Link HTML at <http://127.0.0.1:4130/link/>, and the sibling `mazey.css` project serves `link.css` on port `4132`. Run all three development servers while working on the Link page.

## License

This software is released under the terms of the [GPL-2.0 license](https://github.com/chengchuu/webpack-build-demo/blob/main/LICENSE).
