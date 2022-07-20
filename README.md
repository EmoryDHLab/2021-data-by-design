# Data By Design

This is the repository for the Data By Design book. To see the latest version, go to https://dev.dataxdesign.io/.

## Getting Started

Please install Node v16. We highly recommend using [nvm](https://github.com/nvm-sh/nvm). 
There is a [known issue](#node-17) with Node v17+.

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

We use [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/). 
You are expected to check that your code is valid according to both before 
committing code. There is a GitHub Action that validates both, but it is also 
recommended that you create a [pre-commit hook]()

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Known Issues

### Node v17+

With Node versions 17 or later, there is a possible OpenSSL issue that manifests 
in the following error:

```
Error: error:0308010C:digital envelope routines::unsupported 
```

To fix, use Node v16. There's also a flag `--openssl-legacy-provider` that can be 
passed to Node as well.
