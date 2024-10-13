# Beemo Helper

Beemo Helper is a tool designed to help manage Discord servers, especially during attack situations such as raids. This tool automates the banning process, ensuring that your community remains safe and organized.

## Features

- **Raid Detection**: Beemo identifies when your server is under attack and takes swift action.
- **Rapid Banning**: Users are banned starting from the bottom of the list, effectively doubling the speed of the banning process.
- **Quick Recovery**: Restores order and security to the server in no time.

## Prerequisites

Before running the project, you will need:

- Node.js and npm installed on your system.
- A Discord bot configured with the appropriate permissions.
- To set up environment variables for the Discord bot.

## Installation

Follow the steps below to set up Beemo Helper on your machine:

1. **Clone the repository**:

   ```bash

   git clone https://github.com/eundrelucas/beemo-helper.git

   cd beemo-helper

   ```
2. **Install the dependencies**:

   ```bash

   npm install

   ```
3. **Configure environment variables**:

   Create a `.env` file in the root of the project and add your Discord credentials:

   ```

   DISCORD_ID=your_client_id

   DISCORD_TOKEN=your_token

   DATABASE_URL="file:dev.db"

   ```

## Usage

To start Beemo Helper, run the following command:

```bash

node index.js

```

Replace `index.js` with the name of your main project file if it differs.

## Contribution

Contributions are welcome! If you want to contribute, please follow these steps:

1. Fork the project.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push to the remote repository (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or suggestions, feel free to open an issue or reach out directly.
