# Semantic Release Project

This project uses semantic-release for automated versioning and releases.

## Available Scripts

### Development
bash
Start development server
npm run start:dev
Build for development
npm run build:dev

### QA
bash
Start QA server
npm run start:qa
Build for QA
npm run build:qa

### UAT
bash
Start UAT server
npm run start:uat
Build for UAT
npm run build:uat

### Production
bash
Start production server
npm run start:prod
Build for production
npm run build:prod


Start production server
npm run start:prod
Build for production
npm run build:prod


## Commit Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Use the following types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: Other changes

## Branch Strategy

- `main`: Production releases
- `dev`: Development (beta)
- `qa`: QA testing
- `uat`: UAT testing
- `hotfix`: Hot fixes

## Environment Variables

Each environment has its own `.env` file:
- `.env.dev` - Development
- `.env.qa` - QA
- `.env.uat` - UAT
- `.env.prod` - Production