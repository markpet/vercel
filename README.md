## Tic-Toc-Toe

1. Scaffolding Your First [Vite](https://vitejs.dev/guide/#trying-vite-online) Project

    $ npm create vite@latest

2. Install [TailwindCSS](https://tailwindcss.com/docs/guides/create-react-app) with React App
Install tailwindcss and its peer dependencies via npm, and then run the init command to generate both tailwind.config.js and postcss.config.js.

    $  npm install -D tailwindcss postcss autoprefixer
    $  npx tailwindcss init -p

3. Configure your template paths
Add the paths to all of your template files in your tailwind.config.js file.

4. Add the Tailwind directives to your CSS
Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.

5. Start your build process
Run your build process with `npm run dev`.

5. Start using Tailwind in your project
Start using Tailwind’s utility classes to style your content `App.ts`
```ts
export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
```


