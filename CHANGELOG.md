# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2020-03-23

## Changed

- Restructured and enhanced documentation
- Bumping to 1.0.0 is mostly a formality here to show that the library is considered stable and feature complete

## [0.2.0]

### Added

- `@shopify/preact-testing/matchers` now aliases it's matchers under the same names as `@shopify/react-testing` for ease of use. This means that apps which use module aliases to substitute `preact` for `react` can switch their tests to use `preact-testing` rather than `react-testing` without having to convert calls to matchers like `toContainReactComponent` to the `toContainComponent` naming used in this library.


## [0.1.6]

### Fixed

- Components with `null` children no longer break `toContainText`

## [0.1.5]

### Fixed

- Mounting large trees no longer causes node to run out of memory [#11](https://github.com/Shopify/preact-testing/pull/11)

## [0.1.2]

### Fixed

- Fixed finding text nested directly inside a fragment
- Fixed matcher types when used with a React alias jest setup

## [0.1.1]

### Fixed

- Fixed build artifacts not being properly included in release

## [0.1.0]

### Added

- `@shopify/preact-testing` package
