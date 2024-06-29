# Kousta CLI

Kousta CLI is a command-line tool designed to bootstrap Node.js API projects quickly and efficiently. It supports creating new projects with different database options and adding authentication features. Kousta CLI speeds up the process of creating an API by providing ready-to-use controllers and is built on top of popular Node.js third-party libraries such as:

- Express: For building the API.
- Joi: For data validation.
- Mongoose: For MongoDB ORM.
- Sequelize: For MySQL ORM.

This CLI tool is intended for personal development use, enabling the developer to quickly set up and start building API projects.

## Installation

To install Kousta Node CLI globally, run:

```sh
npm install -g kousta-cli
```

## Usage

The CLI provides various commands to create projects and resources. Below are the available commands and their usage.

### General Usage
kousta-cli [command] [options]

### Create Project
Creates a new Node.js API project with specified options.

```sh
kousta-cli create-project [project-name] [options]
```

* Options
   * db, --database <type>: Add database support. Supported values are mongodb and mysql. Default is mongodb.
   * auth, --authentication: Add authentication support.

### Examples

kousta-cli create-project my-project -db mongodb -auth
kousta-cli create-project another-project --database mysql

### Make Controller
Creates a new controller in the project.

```sh
kousta-cli make:controller  [controller-name]
```

### Make Model
Creates a new model in the project.

```sh
kousta-cli make:model [model-name]
```

### Make Request
Creates a new request in the project.

```sh
kousta-cli make:request  [request-name]
```

### Make Resource
Creates a new resource in the project.

```sh
kousta-cli make:resource  [resource-name]
```

### Make All
Creates a new controller in the project.

```sh
kousta-cli make:http-group [resource-name]
```

### Help Command
Display help information about the CLI and its commands.

```sh
kousta-cli --help
```

### Version Command
Display the version of the CLI.

```sh
kousta-cli --version
```

## Project Structure
After creating a project, the following structure will be generated:

```bash
my-project/
├── src/
│   ├── database/
│   ├── helpers/
│   ├── middleware/
│   ├── resources/
│   ├── utils/
│   ├── app.ts
│   └── index.ts
├── .env
├── .eslintrc.js
├── .prettierrc.js
├── kousta.json
├── package-lock.json
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

This README.md file is formatted to provide clear instructions and comprehensive information for users to understand and use the `kousta-cli` effectively, presented in a structured and visually appealing manner.






