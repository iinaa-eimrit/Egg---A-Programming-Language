# Egg Language IDE Frontend

This is the application for the **Egg Language IDE**, a web-based Integrated Development Environment for executing and experimenting with the Egg programming language. The project is built using **JavaScript**,  **Next.js**, **React**, and **shadcn/ui**, with TypeScript for type safety.

## Table of Contents

-   [Features](https://chatgpt.com/c/6742cd50-9c28-8004-bd3f-ab166d6efcf1#features)
-   [Prerequisites](https://chatgpt.com/c/6742cd50-9c28-8004-bd3f-ab166d6efcf1#prerequisites)
-   [Installation](https://chatgpt.com/c/6742cd50-9c28-8004-bd3f-ab166d6efcf1#installation)
-   [Development](https://chatgpt.com/c/6742cd50-9c28-8004-bd3f-ab166d6efcf1#development)
-   [Folder Structure](https://chatgpt.com/c/6742cd50-9c28-8004-bd3f-ab166d6efcf1#folder-structure)
-   [Contributing](https://chatgpt.com/c/6742cd50-9c28-8004-bd3f-ab166d6efcf1#contributing)
-   [License](https://chatgpt.com/c/6742cd50-9c28-8004-bd3f-ab166d6efcf1#license)

----------

## Features

-   **Interactive Programming Environment**: Users can write, run, and debug Egg code.
-   **Preloaded Examples**: Easily access example programs to understand Egg's capabilities.
-   **Modern UI**: Built with Tailwind CSS and shadcn/ui for responsive and accessible interfaces.

----------

## Prerequisites

Before setting up the project, ensure you have the following installed:

-   **Node.js** (v16 or later)  
    [Download Node.js](https://nodejs.org/)
-   **npm** or **yarn**  
    npm comes with Node.js. Yarn can be installed using `npm install -g yarn`.

----------

## Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/egg-language-ide.git
cd egg-language-ide

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Initialize shadcn/ui

Run the following command to configure **shadcn/ui**:

```bash
npx shadcn@latest init

```

During setup, choose the following options:

-   **Use TypeScript?**: Yes
-   **CSS variables for colors?**: Yes
-   **Global CSS file**: `app/globals.css`
-   **React Server Components?**: Yes

### 4. Add Required UI Components

Install components for the user interface:

```bash
npx shadcn@latest add button card textarea

```

----------

## Development

### Running the Development Server

To start the application locally, run:

```bash
npm run dev

```

Visit [http://localhost:3000](http://localhost:3000/) in your browser.

----------

## Folder Structure

```plaintext
egg-language-ide/
├── components/           # UI Components for the IDE
│   ├── egg-ide.tsx       # Main IDE component
│   ├── example-programs.tsx # Example programs listing
├── lib/                  # Library for Egg language logic
│   └── egg.ts            # Interpreter for Egg programming language
├── public/               # Public assets (images, fonts, etc.)
├── styles/               # CSS and Tailwind configuration
├── pages/                # Next.js pages
│   └── index.tsx         # Entry point for the app
├── app/                  # Next.js App Router (if enabled)
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies and scripts

```

----------

## How It Works

1.  **User Interface**: The user writes Egg code in a textarea provided by the `EggIDE` component.
2.  **Interpreter**: The code is sent to the Egg interpreter (defined in `lib/egg.ts`) for parsing and evaluation.
3.  **Execution**: The result is displayed in the IDE's output section.

----------

## Debugging & Error Handling

### Common Errors

-   **`'expr.name' is possibly 'undefined'`:**  
    Update the TypeScript type annotations to ensure all properties of the `Expression` type are properly checked.
    
-   **`Type 'undefined' cannot be used as an index type`:**  
    Add null checks for properties like `args`, `operator`, and `name`.
    

### Solution for Errors

Replace code sections with type guards or null checks, like so:

```typescript
if (expr.name && expr.name in scope) {
  return scope[expr.name];
}

```

For further debugging, review the `egg.ts` file in the `lib/` folder.

----------

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature/bug fix.
3.  Commit your changes.
4.  Open a Pull Request with a detailed description of your work.
----------

## Support

If you encounter any issues or need help, feel free to create an issue in the repository or reach out at [a16raj@gmail.com](mailto: a16raj@gmail.com).
