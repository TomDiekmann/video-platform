# VR video portal for the University of Paderborn

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

### Usage

1. Clone the repo
   ```sh
   git clone
   ```
2. Navigate to the project folder and install the NPM packages
   ```sh
   npm install
   ```
3. Run local server and set the environment variables. You can also pass the environment variables as en environment file with the option `--env-file`

   ```sh
    MYSQL_ROOT_PASSWORD=test12345 NEXTAUTH_SECRET=supersecret NEXTAUTH_URL=http://localhost:3000 ADMIN_PASSWORD=admin12345 docker compose up --build
   ```

   The server will be automatically configured in 5 Steps (see `./docker-compose.yml`):

   1. Initializion of an empty mysql database
   2. Preperation of the nextjs docker image (see `./Dockerfile`)
   3. Import of the database schema (configured in `./prisma/schema.prisma`)
   4. Insert the database seed data (configured in `./prisma/seed.ts`)
   5. Starting the webserver on port 3000
      <br/>
      <br/>

4. Wait until the server is ready and open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Used Technologies

- [Next.js](https://nextjs.org/) is a React framework that provides a solution for server-side rendering, routing and tooling for React based apps.
- [Prisma](https://www.prisma.io/) is a database toolkit that consists of a type-safe ORM, migrations and a schema management system.
- [Tailwind CSS](https://tailwindcss.com/) is a utility-first CSS framework for rapidly building custom user interfaces.

### Recommended IDE-Setup

- [Visual Studio Code](https://code.visualstudio.com/)
- [ESLint Plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier Plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Tailwind CSS IntelliSense Plugin](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Prisma Plugin](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
