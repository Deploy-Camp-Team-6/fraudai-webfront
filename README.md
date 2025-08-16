# FraudAI Web Frontend

This is the official web frontend for the FraudAI platform, a developer-first tool for integrating fraud detection and security services into modern applications. This repository contains the complete source code for the Angular-based single-page application (SPA).

The application provides a user-friendly interface for managing API keys, exploring documentation, and testing API endpoints in a sandboxed playground.

## ✨ Features

-   **API Key Management:** Securely generate, view, and revoke API keys.
-   **Interactive Documentation:** Browse and understand the FraudAI API.
-   **API Playground:** Make real-time API requests to the FraudAI sandbox environment.
-   **Modern UI/UX:** Built with the **Onyx Neon** design system for a clean, developer-focused experience.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-repo/fraudai-webfront.git
    cd fraudai-webfront
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

### Running the Application

To start the local development server, run:

```sh
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## 📂 Project Structure

The project follows a standard Angular CLI structure. Key directories include:

-   `src/app/`: Contains the core application logic.
    -   `components/`: Global, rarely used components.
    -   `core/`: Core modules, services, guards, and models that are shared across the application.
    -   `pages/`: Feature modules and components representing the main pages of the application (e.g., `auth`, `docs`, `api-keys`).
    -   `shared/`: Reusable components, directives, and pipes used across multiple feature modules.
    -   `theme/`: Global styles and design tokens (`variables.scss`).
-   `src/assets/`: Static assets like images and icons.
-   `src/environments/`: Environment-specific configuration (e.g., for production and development).

## 📜 Available Scripts

In the project directory, you can run the following scripts:

-   `npm start`: Runs the app in development mode.
-   `npm run build`: Builds the app for production to the `www` folder.
-   `npm test`: Runs the unit tests via Karma.
-   `npm run lint`: Lints the source code using ESLint.

## 🎨 Design System: Onyx Neon

This project uses a custom design system named **Onyx Neon**, which is documented in `README.design.md`.

-   **Theme:** Dark-first, developer-focused, with a neon-teal accent.
-   **Tokens:** All colors, spacing, and other style properties are defined as CSS custom properties (tokens) in `src/theme/variables.scss`.
-   **Components:** A rich set of reusable components is available in `src/app/shared/components/`.

When contributing, please adhere to the principles of the design system by using the provided tokens and shared components.

## 🤝 Contributing

Contributions are welcome! Please see `CONTRIBUTING.md` for details on how to get started, our code style, and commit message guidelines.
