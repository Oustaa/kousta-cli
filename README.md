# Kousta Node CLI

Kousta Node CLI is a command-line tool designed to bootstrap Node.js API projects quickly and efficiently. It supports creating new projects with different database options and adding authentication features.

## Installation

To install Kousta Node CLI globally, run:

```sh
npm install -g kousta-node-cli
```

## Usage
The CLI provides various commands to create projects and resources. Below are the available commands and their usage.

### General Usage
kousta-node-cli [command] [options]

### Commands

#### Create Project
Creates a new Node.js API project with specified options.
```sh
kousta-node-cli create-project [project-name] [options]
```
Options
-db, --database <type>: Add database support. Supported values are mongodb and mysql. Default is mongodb.
-auth, --authentication: Add authentication support.


