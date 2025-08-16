# Contributing to FraudAI Web Frontend

Thank you for your interest in contributing to the FraudAI Web Frontend! We welcome all contributions, from bug fixes to new features. To ensure a smooth and collaborative process, please follow these guidelines.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior.

## How to Contribute

### Setting Up Your Development Environment

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```sh
    git clone https://github.com/your-username/fraudai-webfront.git
    cd fraudai-webfront
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```
4.  **Create a new branch** for your feature or bug fix:
    ```sh
    git checkout -b your-branch-name
    ```

### Making Changes

1.  **Write your code.** Ensure your code follows the style guidelines below.
2.  **Test your changes.** Run `npm test` to ensure all unit tests pass.
3.  **Commit your changes.** Please follow the commit message guidelines.
4.  **Push your changes** to your fork:
    ```sh
    git push origin your-branch-name
    ```
5.  **Open a pull request** from your fork to the main repository.

## Code Style

-   **Follow the existing code style.** We use ESLint to enforce a consistent code style. Before committing, run `npm run lint` to check for and fix any issues.
-   **Use the design system.** Adhere to the principles of the **Onyx Neon** design system. Use the design tokens from `src/theme/variables.scss` and the shared components from `src/app/shared/components/`.
-   **Keep it simple.** Write clean, readable, and maintainable code.

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This allows for automated changelog generation and helps keep the commit history clean and easy to understand.

Each commit message consists of a **header**, a **body**, and a **footer**.

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

-   **Type:** Must be one of the following: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
-   **Scope (optional):** The part of the codebase you are changing (e.g., `api-keys`, `auth`, `docs`).
-   **Subject:** A short, imperative-tense description of the change.

**Example:**
```
feat(api-keys): add button to copy API key to clipboard
```

Thank you for contributing!
