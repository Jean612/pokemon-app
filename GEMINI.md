# Project Overview

This is a [React Native](https://reactnative.dev/) application built with [Expo](https://expo.dev/). It serves as a starter template for building mobile applications. The project uses [TypeScript](https://www.typescriptlang.org/) and features a tab-based navigation structure implemented with [Expo Router](https://docs.expo.dev/router/introduction/).

The application includes examples of common features such as:

*   **File-based routing:** The app uses `expo-router` to handle navigation between screens.
*   **Light and dark mode:** The app supports both light and dark color schemes.
*   **Animations:** The project includes an example of an animated component using `react-native-reanimated`.
*   **Custom components:** The `components` directory contains several reusable components.

# Building and Running

To get started with the project, follow these steps:

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Start the development server:**

    ```bash
    npx expo start
    ```

    This will open the Expo developer tools in your browser. You can then run the app on a simulator or a physical device.

## Available Scripts

The `package.json` file includes the following scripts:

*   `npm start`: Starts the Expo development server.
*   `npm run android`: Starts the app on an Android emulator or connected device.
*   `npm run ios`: Starts the app on an iOS simulator or connected device.
*   `npm run web`: Starts the app in a web browser.
*   `npm run lint`: Lints the project files using ESLint.
*   `npm run reset-project`: Resets the project to a blank state by moving the example code to an `app-example` directory.

# Development Conventions

*   **File-based routing:** The app uses a file-based routing system. New screens can be created by adding files to the `app` directory.
*   **Styling:** The project uses a combination of inline styles and `StyleSheet` for styling components.
*   **Theming:** The app uses a custom theme system that supports both light and dark modes. The theme colors are defined in `constants/theme.ts`.
*   **Linting:** The project uses ESLint to enforce a consistent coding style. You can run the linter with `npm run lint`.
