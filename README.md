# Rebirth Framework (Recontinued under new Repository and Name `https://github.com/BigBoyLeft/Codus`)

<img src="./src/code/assets/rebirth.png" style="right:0" align="right" width="250px">

## A Typescript Framework that runs on the Javascript & NodeJS runtime

This framework was built in hopes of becoming `superior` to other frameworks like ESX or QBCore. While most frameworks use Lua as the main language I have decided to build the entire framework using Typescript

#### This framework should only be `Used` and `Edited` by those who understand programming in typescript and are Skilled in a few of the following: 

1. Command Line Usage
2. Javascript/Typescript
3. Understanding module bundlers such as `Webpack` `ESBuild`
4. Node.JS Package Managers such as [NPM](https://www.npmjs.com/) | [YARN](https://yarnpkg.com/)
5. Experience in Database Programs such as [MongoDB](https://www.mongodb.com)

## Framework Features
| Feature      | Description |
| :-----       | :-----      |
| Custom Chat System | Custom Chat System built from scratch and build completely into the framework |
| Single Handler System | All Ticks, and Events are handled within the framework |
| Database Wrapper   | Easy to use Database Wrapper based around MongoDB |
| Command Wrapper | Ease to use Command Wrapper which replaces the old & boring native `RegisterCommand` |
| NUI | Fast and Responsive `UI` build using `ReactJS` |
| NUI Wrapper | Easy to use NUI Wrapper which makes it easy to talk between the `UI` and the `Client` |

# Plugin System

This Framework includes a built-in drag and drop plugin system, allowing developers to harness the power of typescript without having to build and set up a new typescript resource, instead, they can develop a plugin within the framework ``./src/code/plugins`` folder and the framework will build the plugin into a separate resource allowing for you to restart the plugin without having to restart the framework. This also means that users who wish to use your plugin can drag and drop the plugin you provided them into the plugin folder located inside the framework ``./src/code/plugins`` and run the ``npm run build:plugins`` command. while in development you can also use the ``npm run build:plugins:watch`` command to auto rebuild the plugin on code change allowing for a more efficient workflow.

##### Plugin examples can be found inside the Frameworks Plugin Directory ``./src/code/plugins``

# Framework Setup

1. Clone Repository.
2. cd into the Repository via `cd Rebirth` and run `npm install` to install all packages.
3. Next build the framework by using the `npm run R:BuildP` command
4. Rename `Config.json.example` to `Config.json` and fill in the config values.
5. Add `start Rebirth` to your `server.cfg`.
6. And last start your server.

## Framework Contribution

| Command | Description |
| :------ | :- |
| `npm run build:core` | Compiles the Framework into a Production build |
| `npm run build:core:watch` | Compiles framework and then rebuilds on code change |
| `npm run build:plugins` | Compiles all Plugins located inside the framework's Plugin Directory ``./src/code/plugins`` |
| `npm run build:core:watch` | Compiles framework's Plugins and then rebuilds on code change |
| `npm run build:ui` | Compiles UI into a production build |
| `npm run ui:dev` | Starts the UI Development Server in your browser ``https://localhost:3000`` |

## Framework NUI Contrubution
#### `cd src/ui`

| Command | Description |
| :------ | :- |
| `npm run UI:Build` | Compiles the UI into a Production Build |
| `npm run UI:Watch` | Starts the Development server which you can access in your browser via `http://localhost:3000` |
| `npm run UI:Preview` | Serves the Production build which you can access in your browser via `http://localhost:4173` |

## Ideator's

| Discord |
| :------ |
| `MatrixTalents#6285` |
| `Edvard#3614` |

###### Copyright &copy; 2022 Rebirth Networks owned by [Left](https://github.com/BigBoyLeft). Rebirth Networks and its associates are not affiliated with or endorsed by Rockstar North, Take-Two Interactive, or other rightsholders. Any trademarks used belong to their respective owners.
