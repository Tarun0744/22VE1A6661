# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# URL Shortener

A simple URL Shortener application built with React, Material-UI, and Vite. Shorten URLs, set expiration times, and view click statistics with a user-friendly interface.

## Features
- Shorten multiple URLs with custom shortcodes.
- Set validity periods in minutes (default 30 minutes).
- View statistics including click counts and timestamps.
- Local storage for persisting shortened URL data.
- Responsive design using Material-UI.

## Prerequisites
- Node.js (v14.x or later)
- npm (v6.x or later)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Tarun0744/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Usage
- Enter a URL, optional validity (in minutes), and custom shortcode (4-10 alphanumeric characters).
- Click "Shorten URLs" to generate shortened links.
- Use "Add Another URL" to shorten up to 5 URLs.
- Click "View Statistics" to see click data.
- Test shortened URLs by visiting them (e.g., `http://localhost:3000/[shortcode]`).

## Sample Inputs
- URL: `https://www.example.com`, Validity: `30`, Shortcode: `ex1`
- URL: `https://www.google.com`, Validity: `60`, Shortcode: `goog123`

## Troubleshooting
- Clear `localStorage` if issues persist:
  ```javascript
  localStorage.clear();
  ```
- Check the browser console (F12) for errors.
- Ensure all dependencies are installed.

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -m "Add feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## Acknowledgments
- Built with [React](https://reactjs.org/), [Material-UI](https://mui.com/), and [Vite](https://vitejs.dev/).
- Thanks to the open-source community for tools and inspiration.
