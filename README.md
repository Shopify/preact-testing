
# `@shopify/preact-testing`

[![Build Status](https://travis-ci.org/Shopify/preact-testing.svg?branch=master)](https://travis-ci.org/Shopify/preact-testing)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md) [![npm version](https://badge.fury.io/js/%40shopify%2Fpreact-testing.svg)](https://badge.fury.io/js/%40shopify%2Fpreact-testing.svg) 

Modern testing support for Preact, based on @shopify/react-testing

## This library is a pre-release WIP

Not everything will work currently. Check back later.

### Things that work right now:
- basic finds
- some less common traversals
- setting props/state and rerendering
- serializing output

### Things that are broken or buggy
- traversing through `memo`'d components
- traversing through `<Portal />`s
- types are hacky in some spots
- matchers have not been ported over yet


The e2e tests should give a reasonable approximation of how it's working, so run `yarn test` if you want to know

## Installation

```bash
$ yarn add @shopify/preact-testing
```

## Usage
