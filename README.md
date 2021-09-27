# 基于PIXI 4.X，pixi-skin@0.0.7

# TypeScript-Babel-Starter

# What is this?

This is a small sample repository that uses Babel to transform TypeScript to plain JavaScript, and uses TypeScript for type-checking.
This README will also explain step-by-step how you can set up this repository so you can understand how each component fits together.

For simplicity, we've used `babel-cli` with a bare-bones TypeScript setup, but we'll also demonstrate integration with JSX/React, as well as adding bundlers into the mix.
Specifically, we'll show off integration with Webpack for if you're deploying an application, and Rollup for if you're producing a library.

# How do I use it?

## Building the repo

```sh
npm run build
```

## Type-checking the repo

```sh
npm run type-check
```

And to run in `--watch` mode:

```sh
npm run type-check:watch
```

# How would I set this up myself?

## Install your dependencies

Either run the following:

```sh
npm install --save-dev typescript @babel/core @babel/cli @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-typescript
```

or make sure that you add the appropriate `"devDependencies"` entries to your `package.json` and run `npm install`:

```json
"devDependencies": {
    "@babel/cli": "^7.8.3",
    "@babel/core": "^7.8.3",
    "@babel/plugin-proposal-class-properties": "^7.8.3",
    "@babel/preset-env": "^7.8.3",
    "@babel/preset-typescript": "^7.8.3",
    "typescript": "^3.7.5"
}
```

## Create your `tsconfig.json`

Then run

```sh
tsc --init --declaration --allowSyntheticDefaultImports --target esnext --outDir lib
```

**Note:** TypeScript also provides a `--declarationDir` option which specifies an output directory for generated declaration files (`.d.ts` files).
For our uses where `--emitDeclarationOnly` is turned on, `--outDir` works equivalently.

## Create your `.babelrc`

Then copy the `.babelrc` in this repo, or the below:

```json
{
    "presets": [
        "@babel/env",
        "@babel/typescript"
    ],
    "plugins": [
        "@babel/proposal-class-properties"
    ]
}
```

## Set up your build tasks

Add the following to the `"scripts"` section of your `package.json`

```json
"scripts": {
    "type-check": "tsc --noEmit",
    "type-check:watch": "npm run type-check -- --watch",
    "build": "npm run build:types && npm run build:js",
    "build:types": "tsc --emitDeclarationOnly",
    "build:js": "babel src --out-dir lib --extensions \".ts,.tsx\" --source-maps inline"
}
```

# 工程目录结构

    |-- build
    |   |-- core
    |   |   |-- crc32.js
    |   |   |-- file.js
    |   |   |-- params_analyze.js
    |   |   |-- path.js
    |   |-- release
    |   |   |-- index.html
    |   |-- build.js
    |   |-- config.js
    |   |-- dev-server.js
    |   |-- preVersion.js
    |   |-- upload.js
    |   |-- utils.js
    |   |-- webpack.config.dev.js
    |   |-- webpack.config.js
    |-- libs
    |   |-- appEngine
    |   |   |-- Application.d.ts
    |   |   |-- Application.d.ts.map
    |   |   |-- Application.js
    |   |   |-- Application.js.map
    |   |   |-- core
    |   |   |   |-- Core.d.ts
    |   |   |   |-- Core.d.ts.map
    |   |   |   |-- Core.js
    |   |   |   |-- Core.js.map
    |   |   |   |-- command
    |   |   |   |   |-- Command.d.ts
    |   |   |   |   |-- Command.d.ts.map
    |   |   |   |   |-- Command.js
    |   |   |   |   |-- Command.js.map
    |   |   |   |   |-- ICommandConstructor.d.ts
    |   |   |   |   |-- ICommandConstructor.d.ts.map
    |   |   |   |   |-- ICommandConstructor.js
    |   |   |   |   |-- ICommandConstructor.js.map
    |   |   |   |-- global
    |   |   |   |   |-- IConstructor.d.ts
    |   |   |   |   |-- IConstructor.d.ts.map
    |   |   |   |   |-- IConstructor.js
    |   |   |   |   |-- IConstructor.js.map
    |   |   |   |   |-- Patch.d.ts
    |   |   |   |   |-- Patch.d.ts.map
    |   |   |   |   |-- Patch.js
    |   |   |   |   |-- Patch.js.map
    |   |   |   |-- injector
    |   |   |   |   |-- Injector.d.ts
    |   |   |   |   |-- Injector.d.ts.map
    |   |   |   |   |-- Injector.js
    |   |   |   |   |-- Injector.js.map
    |   |   |   |-- interfaces
    |   |   |   |   |-- IConstructor.d.ts
    |   |   |   |   |-- IConstructor.d.ts.map
    |   |   |   |   |-- IConstructor.js
    |   |   |   |   |-- IConstructor.js.map
    |   |   |   |   |-- IDisposable.d.ts
    |   |   |   |   |-- IDisposable.d.ts.map
    |   |   |   |   |-- IDisposable.js
    |   |   |   |   |-- IDisposable.js.map
    |   |   |   |   |-- IOpenClose.d.ts
    |   |   |   |   |-- IOpenClose.d.ts.map
    |   |   |   |   |-- IOpenClose.js
    |   |   |   |   |-- IOpenClose.js.map
    |   |   |   |   |-- JSFile.d.ts
    |   |   |   |   |-- JSFile.d.ts.map
    |   |   |   |   |-- JSFile.js
    |   |   |   |   |-- JSFile.js.map
    |   |   |   |-- message
    |   |   |   |   |-- CommonMessage.d.ts
    |   |   |   |   |-- CommonMessage.d.ts.map
    |   |   |   |   |-- CommonMessage.js
    |   |   |   |   |-- CommonMessage.js.map
    |   |   |   |   |-- CoreMessage.d.ts
    |   |   |   |   |-- CoreMessage.d.ts.map
    |   |   |   |   |-- CoreMessage.js
    |   |   |   |   |-- CoreMessage.js.map
    |   |   |   |   |-- IMessage.d.ts
    |   |   |   |   |-- IMessage.d.ts.map
    |   |   |   |   |-- IMessage.js
    |   |   |   |   |-- IMessage.js.map
    |   |   |   |   |-- Message.d.ts
    |   |   |   |   |-- Message.d.ts.map
    |   |   |   |   |-- Message.js
    |   |   |   |   |-- Message.js.map
    |   |   |   |-- observable
    |   |   |   |   |-- IObservable.d.ts
    |   |   |   |   |-- IObservable.d.ts.map
    |   |   |   |   |-- IObservable.js
    |   |   |   |   |-- IObservable.js.map
    |   |   |   |   |-- Observable.d.ts
    |   |   |   |   |-- Observable.d.ts.map
    |   |   |   |   |-- Observable.js
    |   |   |   |   |-- Observable.js.map
    |   |   |-- engine
    |   |   |   |-- Engine.d.ts
    |   |   |   |-- Engine.d.ts.map
    |   |   |   |-- Engine.js
    |   |   |   |-- Engine.js.map
    |   |   |   |-- bind
    |   |   |   |   |-- Bind.d.ts
    |   |   |   |   |-- Bind.d.ts.map
    |   |   |   |   |-- Bind.js
    |   |   |   |   |-- Bind.js.map
    |   |   |   |   |-- BindManager.d.ts
    |   |   |   |   |-- BindManager.d.ts.map
    |   |   |   |   |-- BindManager.js
    |   |   |   |   |-- BindManager.js.map
    |   |   |   |   |-- Dep.d.ts
    |   |   |   |   |-- Dep.d.ts.map
    |   |   |   |   |-- Dep.js
    |   |   |   |   |-- Dep.js.map
    |   |   |   |   |-- Mutator.d.ts
    |   |   |   |   |-- Mutator.d.ts.map
    |   |   |   |   |-- Mutator.js
    |   |   |   |   |-- Mutator.js.map
    |   |   |   |   |-- Utils.d.ts
    |   |   |   |   |-- Utils.d.ts.map
    |   |   |   |   |-- Utils.js
    |   |   |   |   |-- Utils.js.map
    |   |   |   |   |-- Watcher.d.ts
    |   |   |   |   |-- Watcher.d.ts.map
    |   |   |   |   |-- Watcher.js
    |   |   |   |   |-- Watcher.js.map
    |   |   |   |-- env
    |   |   |   |   |-- Environment.d.ts
    |   |   |   |   |-- Environment.d.ts.map
    |   |   |   |   |-- Environment.js
    |   |   |   |   |-- Environment.js.map
    |   |   |   |   |-- Explorer.d.ts
    |   |   |   |   |-- Explorer.d.ts.map
    |   |   |   |   |-- Explorer.js
    |   |   |   |   |-- Explorer.js.map
    |   |   |   |   |-- Hash.d.ts
    |   |   |   |   |-- Hash.d.ts.map
    |   |   |   |   |-- Hash.js
    |   |   |   |   |-- Hash.js.map
    |   |   |   |   |-- Query.d.ts
    |   |   |   |   |-- Query.d.ts.map
    |   |   |   |   |-- Query.js
    |   |   |   |   |-- Query.js.map
    |   |   |   |-- injector
    |   |   |   |   |-- BindUtil.d.ts
    |   |   |   |   |-- BindUtil.d.ts.map
    |   |   |   |   |-- BindUtil.js
    |   |   |   |   |-- BindUtil.js.map
    |   |   |   |   |-- Injector.d.ts
    |   |   |   |   |-- Injector.d.ts.map
    |   |   |   |   |-- Injector.js
    |   |   |   |   |-- Injector.js.map
    |   |   |   |-- mediator
    |   |   |   |   |-- IMediator.d.ts
    |   |   |   |   |-- IMediator.d.ts.map
    |   |   |   |   |-- IMediator.js
    |   |   |   |   |-- IMediator.js.map
    |   |   |   |   |-- IMediatorBasicPart.d.ts
    |   |   |   |   |-- IMediatorBasicPart.d.ts.map
    |   |   |   |   |-- IMediatorBasicPart.js
    |   |   |   |   |-- IMediatorBasicPart.js.map
    |   |   |   |   |-- IMediatorBindPart.d.ts
    |   |   |   |   |-- IMediatorBindPart.d.ts.map
    |   |   |   |   |-- IMediatorBindPart.js
    |   |   |   |   |-- IMediatorBindPart.js.map
    |   |   |   |   |-- IMediatorConstructor.d.ts
    |   |   |   |   |-- IMediatorConstructor.d.ts.map
    |   |   |   |   |-- IMediatorConstructor.js
    |   |   |   |   |-- IMediatorConstructor.js.map
    |   |   |   |   |-- IMediatorModulePart.d.ts
    |   |   |   |   |-- IMediatorModulePart.d.ts.map
    |   |   |   |   |-- IMediatorModulePart.js
    |   |   |   |   |-- IMediatorModulePart.js.map
    |   |   |   |   |-- IMediatorTreePart.d.ts
    |   |   |   |   |-- IMediatorTreePart.d.ts.map
    |   |   |   |   |-- IMediatorTreePart.js
    |   |   |   |   |-- IMediatorTreePart.js.map
    |   |   |   |   |-- Mediator.d.ts
    |   |   |   |   |-- Mediator.d.ts.map
    |   |   |   |   |-- Mediator.js
    |   |   |   |   |-- Mediator.js.map
    |   |   |   |   |-- MediatorMessage.d.ts
    |   |   |   |   |-- MediatorMessage.d.ts.map
    |   |   |   |   |-- MediatorMessage.js
    |   |   |   |   |-- MediatorMessage.js.map
    |   |   |   |   |-- MediatorStatus.d.ts
    |   |   |   |   |-- MediatorStatus.d.ts.map
    |   |   |   |   |-- MediatorStatus.js
    |   |   |   |   |-- MediatorStatus.js.map
    |   |   |   |-- message
    |   |   |   |   |-- EngineMessage.d.ts
    |   |   |   |   |-- EngineMessage.d.ts.map
    |   |   |   |   |-- EngineMessage.js
    |   |   |   |   |-- EngineMessage.js.map
    |   |   |   |-- model
    |   |   |   |   |-- Model.d.ts
    |   |   |   |   |-- Model.d.ts.map
    |   |   |   |   |-- Model.js
    |   |   |   |   |-- Model.js.map
    |   |   |   |-- module
    |   |   |   |   |-- ModuleManager.d.ts
    |   |   |   |   |-- ModuleManager.d.ts.map
    |   |   |   |   |-- ModuleManager.js
    |   |   |   |   |-- ModuleManager.js.map
    |   |   |   |   |-- ModuleMessage.d.ts
    |   |   |   |   |-- ModuleMessage.d.ts.map
    |   |   |   |   |-- ModuleMessage.js
    |   |   |   |   |-- ModuleMessage.js.map
    |   |   |   |-- resource
    |   |   |   |   |-- ResourceConfig.d.ts
    |   |   |   |   |-- ResourceConfig.d.ts.map
    |   |   |   |   |-- ResourceConfig.js
    |   |   |   |   |-- ResourceConfig.js.map
    |   |   |   |   |-- ResourceItem.d.ts
    |   |   |   |   |-- ResourceItem.d.ts.map
    |   |   |   |   |-- ResourceItem.js
    |   |   |   |   |-- ResourceItem.js.map
    |   |   |   |   |-- ResourceLoader.d.ts
    |   |   |   |   |-- ResourceLoader.d.ts.map
    |   |   |   |   |-- ResourceLoader.js
    |   |   |   |   |-- ResourceLoader.js.map
    |   |   |   |   |-- ResourceManager.d.ts
    |   |   |   |   |-- ResourceManager.d.ts.map
    |   |   |   |   |-- ResourceManager.js
    |   |   |   |   |-- ResourceManager.js.map
    |   |   |   |-- scene
    |   |   |   |   |-- IScene.d.ts
    |   |   |   |   |-- IScene.d.ts.map
    |   |   |   |   |-- IScene.js
    |   |   |   |   |-- IScene.js.map
    |   |   |   |   |-- IScenePolicy.d.ts
    |   |   |   |   |-- IScenePolicy.d.ts.map
    |   |   |   |   |-- IScenePolicy.js
    |   |   |   |   |-- IScenePolicy.js.map
    |   |   |   |   |-- NoneScenePolicy.d.ts
    |   |   |   |   |-- NoneScenePolicy.d.ts.map
    |   |   |   |   |-- NoneScenePolicy.js
    |   |   |   |   |-- NoneScenePolicy.js.map
    |   |   |   |   |-- SceneManager.d.ts
    |   |   |   |   |-- SceneManager.d.ts.map
    |   |   |   |   |-- SceneManager.js
    |   |   |   |   |-- SceneManager.js.map
    |   |   |   |   |-- SceneMediator.d.ts
    |   |   |   |   |-- SceneMediator.d.ts.map
    |   |   |   |   |-- SceneMediator.js
    |   |   |   |   |-- SceneMediator.js.map
    |   |   |   |   |-- SceneMessage.d.ts
    |   |   |   |   |-- SceneMessage.d.ts.map
    |   |   |   |   |-- SceneMessage.js
    |   |   |   |   |-- SceneMessage.js.map
    |   |   |   |-- system
    |   |   |   |   |-- System.d.ts
    |   |   |   |   |-- System.d.ts.map
    |   |   |   |   |-- System.js
    |   |   |   |   |-- System.js.map
    |   |   |-- utils
    |   |   |   |-- ArrayUtil.d.ts
    |   |   |   |-- ArrayUtil.d.ts.map
    |   |   |   |-- ArrayUtil.js
    |   |   |   |-- ArrayUtil.js.map
    |   |   |   |-- ConstructUtil.d.ts
    |   |   |   |-- ConstructUtil.d.ts.map
    |   |   |   |-- ConstructUtil.js
    |   |   |   |-- ConstructUtil.js.map
    |   |   |   |-- CookieUtil.d.ts
    |   |   |   |-- CookieUtil.d.ts.map
    |   |   |   |-- CookieUtil.js
    |   |   |   |-- CookieUtil.js.map
    |   |   |   |-- Dictionary.d.ts
    |   |   |   |-- Dictionary.d.ts.map
    |   |   |   |-- Dictionary.js
    |   |   |   |-- Dictionary.js.map
    |   |   |   |-- DisplayUtil.d.ts
    |   |   |   |-- DisplayUtil.d.ts.map
    |   |   |   |-- DisplayUtil.js
    |   |   |   |-- DisplayUtil.js.map
    |   |   |   |-- HTMLUtil.d.ts
    |   |   |   |-- HTMLUtil.d.ts.map
    |   |   |   |-- HTMLUtil.js
    |   |   |   |-- HTMLUtil.js.map
    |   |   |   |-- HTTPUtil.d.ts
    |   |   |   |-- HTTPUtil.d.ts.map
    |   |   |   |-- HTTPUtil.js
    |   |   |   |-- HTTPUtil.js.map
    |   |   |   |-- LocalStrorageUtil.d.ts
    |   |   |   |-- LocalStrorageUtil.d.ts.map
    |   |   |   |-- LocalStrorageUtil.js
    |   |   |   |-- LocalStrorageUtil.js.map
    |   |   |   |-- NumberUtil.d.ts
    |   |   |   |-- NumberUtil.d.ts.map
    |   |   |   |-- NumberUtil.js
    |   |   |   |-- NumberUtil.js.map
    |   |   |   |-- ObjectUtil.d.ts
    |   |   |   |-- ObjectUtil.d.ts.map
    |   |   |   |-- ObjectUtil.js
    |   |   |   |-- ObjectUtil.js.map
    |   |   |   |-- SyncUtil.d.ts
    |   |   |   |-- SyncUtil.d.ts.map
    |   |   |   |-- SyncUtil.js
    |   |   |   |-- SyncUtil.js.map
    |   |   |   |-- TimeUtil.d.ts
    |   |   |   |-- TimeUtil.d.ts.map
    |   |   |   |-- TimeUtil.js
    |   |   |   |-- TimeUtil.js.map
    |   |   |   |-- URLUtil.d.ts
    |   |   |   |-- URLUtil.d.ts.map
    |   |   |   |-- URLUtil.js
    |   |   |   |-- URLUtil.js.map
    |   |-- pixiModule
    |   |   |-- PixiApplication.d.ts
    |   |   |-- PixiApplication.d.ts.map
    |   |   |-- PixiApplication.js
    |   |   |-- PixiApplication.js.map
    |   |   |-- log
    |   |   |   |-- Log.d.ts
    |   |   |   |-- Log.d.ts.map
    |   |   |   |-- Log.js
    |   |   |   |-- Log.js.map
    |   |   |-- scene
    |   |   |   |-- FadeScenePolicy.d.ts
    |   |   |   |-- FadeScenePolicy.d.ts.map
    |   |   |   |-- FadeScenePolicy.js
    |   |   |   |-- FadeScenePolicy.js.map
    |   |-- pixi_scene
    |   |   |-- PixiScene1.d.ts
    |   |   |-- PixiScene1.d.ts.map
    |   |   |-- PixiScene1.js
    |   |   |-- PixiScene1.js.map
    |   |-- index.d.ts
    |   |-- index.d.ts.map
    |   |-- index.js
    |   |-- index.js.map
    |   |-- src
    |   |   |-- appEngine
    |   |   |   |-- core
    |   |   |   |   |-- Core.d.ts
    |   |   |   |   |-- Core.d.ts.map
    |   |   |   |   |-- command
    |   |   |   |   |   |-- Command.d.ts
    |   |   |   |   |   |-- Command.d.ts.map
    |   |   |   |   |   |-- ICommandConstructor.d.ts
    |   |   |   |   |   |-- ICommandConstructor.d.ts.map
    |   |   |   |   |-- global
    |   |   |   |   |   |-- IConstructor.d.ts
    |   |   |   |   |   |-- IConstructor.d.ts.map
    |   |   |   |   |   |-- Patch.d.ts
    |   |   |   |   |   |-- Patch.d.ts.map
    |   |   |   |   |-- injector
    |   |   |   |   |   |-- Injector.d.ts
    |   |   |   |   |   |-- Injector.d.ts.map
    |   |   |   |   |-- interfaces
    |   |   |   |   |   |-- IConstructor.d.ts
    |   |   |   |   |   |-- IConstructor.d.ts.map
    |   |   |   |   |   |-- IDisposable.d.ts
    |   |   |   |   |   |-- IDisposable.d.ts.map
    |   |   |   |   |   |-- IOpenClose.d.ts
    |   |   |   |   |   |-- IOpenClose.d.ts.map
    |   |   |   |   |   |-- JSFile.d.ts
    |   |   |   |   |   |-- JSFile.d.ts.map
    |   |   |   |   |-- message
    |   |   |   |   |   |-- CommonMessage.d.ts
    |   |   |   |   |   |-- CommonMessage.d.ts.map
    |   |   |   |   |   |-- CoreMessage.d.ts
    |   |   |   |   |   |-- CoreMessage.d.ts.map
    |   |   |   |   |   |-- IMessage.d.ts
    |   |   |   |   |   |-- IMessage.d.ts.map
    |   |   |   |   |   |-- Message.d.ts
    |   |   |   |   |   |-- Message.d.ts.map
    |   |   |   |   |-- observable
    |   |   |   |   |   |-- IObservable.d.ts
    |   |   |   |   |   |-- IObservable.d.ts.map
    |   |   |   |   |   |-- Observable.d.ts
    |   |   |   |   |   |-- Observable.d.ts.map
    |   |   |   |-- engine
    |   |   |   |   |-- Engine.d.ts
    |   |   |   |   |-- Engine.d.ts.map
    |   |   |   |   |-- bind
    |   |   |   |   |   |-- Bind.d.ts
    |   |   |   |   |   |-- Bind.d.ts.map
    |   |   |   |   |   |-- BindManager.d.ts
    |   |   |   |   |   |-- BindManager.d.ts.map
    |   |   |   |   |   |-- Dep.d.ts
    |   |   |   |   |   |-- Dep.d.ts.map
    |   |   |   |   |   |-- Mutator.d.ts
    |   |   |   |   |   |-- Mutator.d.ts.map
    |   |   |   |   |   |-- Utils.d.ts
    |   |   |   |   |   |-- Utils.d.ts.map
    |   |   |   |   |   |-- Watcher.d.ts
    |   |   |   |   |   |-- Watcher.d.ts.map
    |   |   |   |   |-- env
    |   |   |   |   |   |-- Environment.d.ts
    |   |   |   |   |   |-- Environment.d.ts.map
    |   |   |   |   |   |-- Explorer.d.ts
    |   |   |   |   |   |-- Explorer.d.ts.map
    |   |   |   |   |   |-- Hash.d.ts
    |   |   |   |   |   |-- Hash.d.ts.map
    |   |   |   |   |   |-- Query.d.ts
    |   |   |   |   |   |-- Query.d.ts.map
    |   |   |   |   |-- injector
    |   |   |   |   |   |-- BindUtil.d.ts
    |   |   |   |   |   |-- BindUtil.d.ts.map
    |   |   |   |   |   |-- Injector.d.ts
    |   |   |   |   |   |-- Injector.d.ts.map
    |   |   |   |   |-- mediator
    |   |   |   |   |   |-- IMediator.d.ts
    |   |   |   |   |   |-- IMediator.d.ts.map
    |   |   |   |   |   |-- IMediatorBasicPart.d.ts
    |   |   |   |   |   |-- IMediatorBasicPart.d.ts.map
    |   |   |   |   |   |-- IMediatorBindPart.d.ts
    |   |   |   |   |   |-- IMediatorBindPart.d.ts.map
    |   |   |   |   |   |-- IMediatorConstructor.d.ts
    |   |   |   |   |   |-- IMediatorConstructor.d.ts.map
    |   |   |   |   |   |-- IMediatorModulePart.d.ts
    |   |   |   |   |   |-- IMediatorModulePart.d.ts.map
    |   |   |   |   |   |-- IMediatorTreePart.d.ts
    |   |   |   |   |   |-- IMediatorTreePart.d.ts.map
    |   |   |   |   |   |-- Mediator.d.ts
    |   |   |   |   |   |-- Mediator.d.ts.map
    |   |   |   |   |   |-- MediatorMessage.d.ts
    |   |   |   |   |   |-- MediatorMessage.d.ts.map
    |   |   |   |   |   |-- MediatorStatus.d.ts
    |   |   |   |   |   |-- MediatorStatus.d.ts.map
    |   |   |   |   |-- message
    |   |   |   |   |   |-- EngineMessage.d.ts
    |   |   |   |   |   |-- EngineMessage.d.ts.map
    |   |   |   |   |-- model
    |   |   |   |   |   |-- Model.d.ts
    |   |   |   |   |   |-- Model.d.ts.map
    |   |   |   |   |-- module
    |   |   |   |   |   |-- ModuleManager.d.ts
    |   |   |   |   |   |-- ModuleManager.d.ts.map
    |   |   |   |   |   |-- ModuleMessage.d.ts
    |   |   |   |   |   |-- ModuleMessage.d.ts.map
    |   |   |   |   |-- resource
    |   |   |   |   |   |-- ResourceConfig.d.ts
    |   |   |   |   |   |-- ResourceConfig.d.ts.map
    |   |   |   |   |   |-- ResourceItem.d.ts
    |   |   |   |   |   |-- ResourceItem.d.ts.map
    |   |   |   |   |   |-- ResourceLoader.d.ts
    |   |   |   |   |   |-- ResourceLoader.d.ts.map
    |   |   |   |   |   |-- ResourceManager.d.ts
    |   |   |   |   |   |-- ResourceManager.d.ts.map
    |   |   |   |   |-- scene
    |   |   |   |   |   |-- IScene.d.ts
    |   |   |   |   |   |-- IScene.d.ts.map
    |   |   |   |   |   |-- IScenePolicy.d.ts
    |   |   |   |   |   |-- IScenePolicy.d.ts.map
    |   |   |   |   |   |-- NoneScenePolicy.d.ts
    |   |   |   |   |   |-- NoneScenePolicy.d.ts.map
    |   |   |   |   |   |-- SceneManager.d.ts
    |   |   |   |   |   |-- SceneManager.d.ts.map
    |   |   |   |   |   |-- SceneMediator.d.ts
    |   |   |   |   |   |-- SceneMediator.d.ts.map
    |   |   |   |   |   |-- SceneMessage.d.ts
    |   |   |   |   |   |-- SceneMessage.d.ts.map
    |   |   |   |   |-- system
    |   |   |   |   |   |-- System.d.ts
    |   |   |   |   |   |-- System.d.ts.map
    |   |   |   |-- utils
    |   |   |   |   |-- ArrayUtil.d.ts
    |   |   |   |   |-- ArrayUtil.d.ts.map
    |   |   |   |   |-- ConstructUtil.d.ts
    |   |   |   |   |-- ConstructUtil.d.ts.map
    |   |   |   |   |-- CookieUtil.d.ts
    |   |   |   |   |-- CookieUtil.d.ts.map
    |   |   |   |   |-- Dictionary.d.ts
    |   |   |   |   |-- Dictionary.d.ts.map
    |   |   |   |   |-- DisplayUtil.d.ts
    |   |   |   |   |-- DisplayUtil.d.ts.map
    |   |   |   |   |-- HTMLUtil.d.ts
    |   |   |   |   |-- HTMLUtil.d.ts.map
    |   |   |   |   |-- HTTPUtil.d.ts
    |   |   |   |   |-- HTTPUtil.d.ts.map
    |   |   |   |   |-- LocalStrorageUtil.d.ts
    |   |   |   |   |-- LocalStrorageUtil.d.ts.map
    |   |   |   |   |-- NumberUtil.d.ts
    |   |   |   |   |-- NumberUtil.d.ts.map
    |   |   |   |   |-- ObjectUtil.d.ts
    |   |   |   |   |-- ObjectUtil.d.ts.map
    |   |   |   |   |-- SyncUtil.d.ts
    |   |   |   |   |-- SyncUtil.d.ts.map
    |   |   |   |   |-- TimeUtil.d.ts
    |   |   |   |   |-- TimeUtil.d.ts.map
    |   |   |   |   |-- URLUtil.d.ts
    |   |   |   |   |-- URLUtil.d.ts.map
    |   |   |   |-- Application.d.ts
    |   |   |   |-- Application.d.ts.map
    |   |   |-- pixi_scene
    |   |   |   |-- PixiScene1.d.ts
    |   |   |   |-- PixiScene1.d.ts.map
    |   |   |-- pixiModule
    |   |   |   |-- PixiApplication.d.ts
    |   |   |   |-- PixiApplication.d.ts.map
    |   |   |   |-- log
    |   |   |   |   |-- Log.d.ts
    |   |   |   |   |-- Log.d.ts.map
    |   |   |   |-- scene
    |   |   |   |   |-- FadeScenePolicy.d.ts
    |   |   |   |   |-- FadeScenePolicy.d.ts.map
    |-- src
    |   |-- appEngine
    |   |   |-- Application.ts
    |   |   |-- index.ts
    |   |   |-- core
    |   |   |   |-- Core.ts
    |   |   |   |-- command
    |   |   |   |   |-- Command.ts
    |   |   |   |   |-- ICommandConstructor.ts
    |   |   |   |-- global
    |   |   |   |   |-- IConstructor.ts
    |   |   |   |   |-- Patch.ts
    |   |   |   |-- injector
    |   |   |   |   |-- Injector.ts
    |   |   |   |-- interfaces
    |   |   |   |   |-- IConstructor.ts
    |   |   |   |   |-- IDisposable.ts
    |   |   |   |   |-- IOpenClose.ts
    |   |   |   |   |-- JSFile.ts
    |   |   |   |-- message
    |   |   |   |   |-- CommonMessage.ts
    |   |   |   |   |-- CoreMessage.ts
    |   |   |   |   |-- IMessage.ts
    |   |   |   |   |-- Message.ts
    |   |   |   |-- observable
    |   |   |   |   |-- IObservable.ts
    |   |   |   |   |-- Observable.ts
    |   |   |-- engine
    |   |   |   |-- Engine.ts
    |   |   |   |-- bind
    |   |   |   |   |-- Bind.ts
    |   |   |   |   |-- BindManager.ts
    |   |   |   |   |-- Dep.ts
    |   |   |   |   |-- Mutator.ts
    |   |   |   |   |-- Utils.ts
    |   |   |   |   |-- Watcher.ts
    |   |   |   |-- env
    |   |   |   |   |-- Environment.ts
    |   |   |   |   |-- Explorer.ts
    |   |   |   |   |-- Hash.ts
    |   |   |   |   |-- Query.ts
    |   |   |   |-- injector
    |   |   |   |   |-- BindUtil.ts
    |   |   |   |   |-- Injector.ts
    |   |   |   |-- mediator
    |   |   |   |   |-- IMediator.ts
    |   |   |   |   |-- IMediatorBasicPart.ts
    |   |   |   |   |-- IMediatorBindPart.ts
    |   |   |   |   |-- IMediatorConstructor.ts
    |   |   |   |   |-- IMediatorModulePart.ts
    |   |   |   |   |-- IMediatorTreePart.ts
    |   |   |   |   |-- Mediator.ts
    |   |   |   |   |-- MediatorMessage.ts
    |   |   |   |   |-- MediatorStatus.ts
    |   |   |   |-- message
    |   |   |   |   |-- EngineMessage.ts
    |   |   |   |-- model
    |   |   |   |   |-- Model.ts
    |   |   |   |-- module
    |   |   |   |   |-- ModuleManager.ts
    |   |   |   |   |-- ModuleMessage.ts
    |   |   |   |-- resource
    |   |   |   |   |-- ResourceConfig.ts
    |   |   |   |   |-- ResourceItem.ts
    |   |   |   |   |-- ResourceLoader.ts
    |   |   |   |   |-- ResourceManager.ts
    |   |   |   |-- scene
    |   |   |   |   |-- IScene.ts
    |   |   |   |   |-- IScenePolicy.ts
    |   |   |   |   |-- NoneScenePolicy.ts
    |   |   |   |   |-- SceneManager.ts
    |   |   |   |   |-- SceneMediator.ts
    |   |   |   |   |-- SceneMessage.ts
    |   |   |   |-- system
    |   |   |   |   |-- System.ts
    |   |   |-- utils
    |   |   |   |-- ArrayUtil.ts
    |   |   |   |-- ConstructUtil.ts
    |   |   |   |-- CookieUtil.ts
    |   |   |   |-- Dictionary.ts
    |   |   |   |-- DisplayUtil.ts
    |   |   |   |-- HTMLUtil.ts
    |   |   |   |-- HTTPUtil.ts
    |   |   |   |-- LocalStrorageUtil.ts
    |   |   |   |-- NumberUtil.ts
    |   |   |   |-- ObjectUtil.ts
    |   |   |   |-- SyncUtil.ts
    |   |   |   |-- TimeUtil.ts
    |   |   |   |-- URLUtil.ts
    |   |-- pixi_scene
    |   |   |-- PixiScene1.ts
    |   |-- pixiModule
    |   |   |-- PixiApplication.ts
    |   |   |-- log
    |   |   |   |-- Log.ts
    |   |   |-- scene
    |   |   |   |-- FadeScenePolicy.ts
    |   |-- assetsVersion.ts
    |   |-- index.ts
    |   |-- types.d.ts
    |-- static
    |   |-- assets.json
    |   |-- fonts               字体
    |-- uiProject
    |   |-- .wing
    |   |   |-- exml.json
    |   |   |-- launch.json
    |   |   |-- settings.json
    |   |   |-- tasks.json
    |   |-- bin-debug
    |   |   |-- AssetAdapter.js
    |   |   |-- LoadingUI.js
    |   |   |-- Main.js
    |   |   |-- Test.js
    |   |   |-- ThemeAdapter.js
    |   |-- bin-release
    |   |   |-- web
    |   |   |   |-- game
    |   |   |   |   |-- js
    |   |   |   |   |   |-- assetsmanager.min_20ffd62d.js
    |   |   |   |   |   |-- default.thm_4dcbca1.js
    |   |   |   |   |   |-- egret.min_19d4f993.js
    |   |   |   |   |   |-- egret.web.min_d8748787.js
    |   |   |   |   |   |-- eui.min_351e486a.js
    |   |   |   |   |   |-- main.min_38cc6673.js
    |   |   |   |   |   |-- promise.min_83a6a5d.js
    |   |   |   |   |   |-- tween.min_6c5a88f9.js
    |   |   |   |   |-- resource
    |   |   |   |   |   |-- 486d10fe.json
    |   |   |   |   |   |-- default.thm.json
    |   |   |   |   |   |-- assets
    |   |   |   |   |-- assetsVersion.ts
    |   |   |   |   |-- index.html
    |   |   |   |   |-- manifest.json
    |   |-- libs
    |   |   |-- exml.e.d.ts
    |   |   |-- modules
    |   |   |   |-- assetsmanager
    |   |   |   |   |-- assetsmanager.d.ts
    |   |   |   |   |-- assetsmanager.js
    |   |   |   |   |-- assetsmanager.min.js
    |   |   |   |-- egret
    |   |   |   |   |-- egret.d.ts
    |   |   |   |   |-- egret.js
    |   |   |   |   |-- egret.min.js
    |   |   |   |   |-- egret.web.js
    |   |   |   |   |-- egret.web.min.js
    |   |   |   |-- eui
    |   |   |   |   |-- eui.d.ts
    |   |   |   |   |-- eui.js
    |   |   |   |   |-- eui.min.js
    |   |   |   |-- promise
    |   |   |   |   |-- promise.js
    |   |   |   |   |-- promise.min.js
    |   |   |   |-- tween
    |   |   |   |   |-- tween.d.ts
    |   |   |   |   |-- tween.js
    |   |   |   |   |-- tween.min.js
    |   |-- resource
    |   |   |-- eui_skins
    |   |   |   |-- ButtonSkin.exml
    |   |   |   |-- CheckBoxSkin.exml
    |   |   |   |-- HScrollBarSkin.exml
    |   |   |   |-- HSliderSkin.exml
    |   |   |   |-- ItemRendererSkin.exml
    |   |   |   |-- PanelSkin.exml
    |   |   |   |-- ProgressBarSkin.exml
    |   |   |   |-- RadioButtonSkin.exml
    |   |   |   |-- ScrollerSkin.exml
    |   |   |   |-- TextInputSkin.exml
    |   |   |   |-- ToggleSwitchSkin.exml
    |   |   |   |-- VScrollBarSkin.exml
    |   |   |   |-- VSliderSkin.exml
    |   |   |-- images                  皮肤图片静态资源
    |   |   |-- skin
    |   |   |   |-- FamilySkin.exml
    |   |   |-- assets.json
    |   |   |-- default.thm.json
    |   |-- scripts
    |   |   |-- api.d.ts
    |   |   |-- config.android.ts
    |   |   |-- config.bricks.ts
    |   |   |-- config.ios.ts
    |   |   |-- config.ts
    |   |   |-- config.wxgame.ts
    |   |   |-- myplugin.ts
    |   |   |-- node.d.ts
    |   |   |-- tsconfig.json
    |   |   |-- bricks
    |   |   |   |-- bricks.ts
    |   |   |-- wxgame
    |   |   |   |-- wxgame.ts
    |   |-- src
    |   |   |-- AssetAdapter.ts
    |   |   |-- LoadingUI.ts
    |   |   |-- Main.ts
    |   |   |-- Test.ts
    |   |   |-- ThemeAdapter.ts
    |   |-- template
    |   |   |-- runtime
    |   |   |   |-- native_loader.js
    |   |   |   |-- native_require.js
    |   |   |   |-- runtime_loader.js
    |   |   |-- web
    |   |   |   |-- index.html
    |   |-- egretProperties.json
    |   |-- index.html
    |   |-- manifest.json
    |   |-- tsconfig.json
    |   |-- wingProperties.json
    |-- .gitignore
    |-- .npmrc
    |-- LICENSE
    |-- README.md
    |-- hybrid-cli-online.json
    |-- hybrid-cli.json
    |-- index.html
    |-- package-lock.json
    |-- package.json
    |-- server.js
    |-- tsconfig.json


# How do I change it?

## Using JSX (and React)
> Full example available [**here**](https://github.com/a-tarasyuk/react-webpack-typescript-babel)

### Install your dependencies

Install the [@babel/preset-react](https://www.npmjs.com/package/@babel/preset-react) package as well as React, ReactDOM, and their respective type declarations

```sh
npm install --save react react-dom @types/react @types/react-dom
npm install --save-dev @babel/preset-react
```

### Update `.babelrc`

Then add `"@babel/react"` as one of the presets in your `.babelrc`.

### Update `tsconfig.json`

Update your `tsconfig.json` to set `"jsx"` to `"react"`.

### Use a `.tsx` file

Make sure that any files that contain JSX use the `.tsx` extension.
To get going quickly, just rename `src/index.ts` to `src/index.tsx`, and add the following lines to the bottom:

```ts
import React from 'react';
export let z = <div>Hello world!</div>;
```

## Using Webpack

> Full example available [**here**](https://github.com/a-tarasyuk/webpack-typescript-babel)

### Install your dependencies

```sh
npm install --save-dev webpack webpack-cli babel-loader
```

### Create a `webpack.config.js`

Create a `webpack.config.js` at the root of this project with the following contents:

```js
var path = require('path');

module.exports = {
    // Change to your "entry-point".
    entry: './engine/index',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    }
};
```

### Create a build task

Add

```json
"bundle": "webpack"
```

to the `scripts` section in your `package.json`.

### Run the build task

```sh
npm run bundle
```

## Using Rollup

> Full example available [**here**](https://github.com/a-tarasyuk/rollup-typescript-babel)

### Install your dependencies

```sh
npm install --save-dev rollup rollup-plugin-babel rollup-plugin-node-resolve rollup-plugin-commonjs
```

### Create a `rollup.config.js`

Create a `rollup.config.js` at the root of this project with the following contents:

```js
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const name = 'RollupTypeScriptBabel';

export default {
  input: './engine/index.ts',

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: [],

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['engine/**/*'] }),
  ],

  output: [{
    file: pkg.main,
    format: 'cjs',
  }, {
    file: pkg.module,
    format: 'es',
  }, {
    file: pkg.browser,
    format: 'iife',
    name,

    // https://rollupjs.org/guide/en#output-globals-g-globals
    globals: {},
  }],
};

```

### Create a build task

Add

```json
"bundle": "rollup -c"
```

to the `scripts` section in your `package.json`.

### Run the build task

```sh
npm run bundle
```
