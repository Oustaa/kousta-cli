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

### Create Project
Creates a new Node.js API project with specified options.

```sh
kousta-node-cli create-project [project-name] [options]
```

* Options
   * db, --database <type>: Add database support. Supported values are mongodb and mysql. Default is mongodb.
   * auth, --authentication: Add authentication support.

### Examples

kousta-node-cli create-project my-project -db mongodb -auth
kousta-node-cli create-project another-project --database mysql

### Make Resource
Creates a new resource in the project.

```sh
kousta-node-cli make:resource
```

### Help Command
Display help information about the CLI and its commands.

```sh
kousta-node-cli --help
```

### Version Command
Display the version of the CLI.

```sh
kousta-node-cli --version
```

## Project Structure
After creating a project, the following structure will be generated:

```bash
my-project/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License
This project is licensed under the MIT License.

## Author
Oussama Tailba

```css
This README.md file is formatted to provide clear instructions and comprehensive information for users to understand and use the `kousta-node-cli` effectively, presented in a structured and visually appealing manner.
```





