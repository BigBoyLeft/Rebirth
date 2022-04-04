# Rebirth Framework

<img src="./src/code/assets/rebirth.png" style="right:0" align="right" width="250px">

## A Typescript Framework that runs on the Javascript & NodeJS runtime

This framework was built in hopes of becoming `superior` to other frameworks like ESX or QBCore. While most frameworks use Lua as the main language we have decided to build the entire framework using Typescript

#### This framework should only be `Used` and `Edited` by those who understand programming in typescript and are Skilled in a few of the following: 

1. Command Line Usage
2. Javascript/Typescript
3. Understanding module bunders such as `Webpack` `ESBuild`
4. Node.JS Package Managers such as [NPM](https://www.npmjs.com/) | [YARN](https://yarnpkg.com/)
5. Experience in Database Programs such as [MongoDB](https://www.mongodb.com)

## Framework Features
| Feature     | Description |
| :----       | :-----      |
| Single Handler System | All Ticks, and Events are handled within the framework |
| MongoDB Integration | Easy to use Database Wrapper based around MongoDB, Framework `AUTO` creates all needed `Collections` needed to operate  |
| Command Wrapper | Ease to use Command Wrapper which replaces the old & boring native `RegisterCommand` |
| NUI | Fast and Responsive `UI` build using `ReactJS` |
| NUI Wrapper | Easy to use NUI Wrapper which makes it easy to talk between the `UI` and the `Client` |

## Framework Setup

1. Clone Repository.
2. cd into the Repository via `cd Rebirth` and run `npm install` to install all packages.
3. Run `npm run R:BuildP` to compile the Framework into a game ready Production Build
2. Rename `Config.json.example` to `Config.json` and fill in the config values.
3. add `start Rebirth` to your `server.cfg`.
4. start the server.

## Framework Contrubution

| Command | Description |
| :------ | :- |
| `npm run R:BuildP` | Compiles the the Framework into a game ready Production Build |
| `npm run R:BuildPW` | Compiles the the Framework into a game ready Production Build and Rebuilds on code Change |
| `npm run R:BuildD` | Compiles the Framework into a Development build |
| `npm run R:BuildDW` | Compiles the Framework into a Development build and Rebuilds on code Change |

## Framework NUI Contrubution
#### `cd src/ui`

| Command | Description |
| :------ | :- |
| `npm run UI:Build` | Compiles the UI into a Production Build |
| `npm run UI:Watch` | Starts the Development server which you can access in your browser via `http://localhost:3000` |
| `npm run UI:Preview` | Serves the Production build which you can access in your browser via `http://localhost:4173` |

###### Copyright &copy; 2022 Rebirth Networks owned by [Left](https://github.com/BigBoyLeft). Rebirth Networks and its associates are not affiliated with or endorsed by Rockstar North, Take-Two Interactive or other rightsholders. Any trademarks used belong to their respective owners.
