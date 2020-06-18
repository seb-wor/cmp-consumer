# CMP consumer implementation

Our use of AppNexus CMP. hest

## Intro

`cmp.bundle.js` is the file compiled in [https://github.com/guloggratis/cmp](https://github.com/guloggratis/cmp) project. It contains information about how the CMP tool should work and look.

`cmp.client-settings.js` contains information about how the CMP should be used on the current consumer project. The local functionality can be changed by updating this file.

Some more on local implementations: [https://github.com/appnexus/cmp/issues/58](https://github.com/appnexus/cmp/issues/58)


## Install

1. Download `cmp.bundle.js` and `cmp.client-settings.js` files in correct theme's folder
2. Paste them in the consumer app somewhere, where it makes send
3. Link to them in the index.html (or master template file), see example in `index.html`
