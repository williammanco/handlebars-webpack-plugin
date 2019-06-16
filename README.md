<h1 align="center"><img src="./docs/hbs-wp-plugin.png" width="276" alt="handlebars webpack plugin"></h1>

> Server-side template rendering using [Handlebars](http://handlebarsjs.com/).


`npm install handlebars-webpack-plugin --save-dev`


## Usage

In your webpack config register and setup the handlebars plugin

```javascript
const path = require("path");
const HandlebarsPlugin = require("handlebars-webpack-plugin");

const webpackConfig = {

  plugins: [

    new HandlebarsPlugin({
      // path to hbs entry file(s)
      entry: path.join(process.cwd(), "app", "src", "*.hbs"),
      // output path and filename(s). This should lie within the webpacks output-folder
      // if ommited, the input filepath stripped of its extension will be used
      output: path.join(process.cwd(), "build", "[name].html"),
      // data passed to main hbs template: `main-template(data)`
      data: require("./app/data/project.json"),
      // or add it as filepath to rebuild data on change using webpack-dev-server
      data: path.join(__dirname, "app/data/project.json"),

      // globbed path to partials, where folder/filename is unique
      partials: [
        path.join(process.cwd(), "app", "src", "components", "*", "*.hbs")
      ],

      // register custom helpers. May be either a function or a glob-pattern
      helpers: {
        nameOfHbsHelper: Function.prototype,
        projectHelpers: path.join(process.cwd(), "app", "helpers", "*.helper.js")
      },

      // hooks
      /**
       * Modify the default output path of each entry-template
       * @param {String} filepath   - the source of the template
       * @param {String} outputTemplate - the filepath template defined in `output`
       * @return {String} final path, where the rendered html-file should be saved
       */
      // getTargetFilepath: function (filepath, outputTemplate) {},
      
      /**
       * Modify the hbs partial-id created for a loaded partial
       * @param {String} filePath   - filePath to the loaded partial
       * @return {String} hbs-partialId, per default folder/partialName is used
       */
      // getPartialId: function (filePath) {}

      onBeforeSetup: function (Handlebars) {},
      onBeforeAddPartials: function (Handlebars, partialsMap) {},
      onBeforeCompile: function (Handlebars, templateContent) {},
      onBeforeRender: function (Handlebars, data) {},
      onBeforeSave: function (Handlebars, resultHtml, filename) {},
      onDone: function (Handlebars, filename) {}
    })
  ]
};
```

Partial ids are registered by `parentFolder/filename` (without file extensions)

Use handlebars in your main and partials like, i.e.

```hbs
<body>
  {{> partialFolder/partialName}}

  {{> header/header title="page title"}}

  {{> partial/content}}
</body>
```


## Html Webpack Plugin

> Use the [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) to generate partials, that are
> dynamically registered to the handlebars-webpack-plugin

- the `HtmlWebpackPlugin` should be placed before the HandlebarsWebpackPlugin
- multiple HtmlWebpackPlugins may be used
- per default, the partials get registered to `html/<outputfilename>`, i.e. a filename `/dist/partials/head.hbs` will be registered as `html/head` to handlebars


```js
plugins: [
   new HtmlWebpackPlugin({
    title: "Generic Head Title",
    // the template you want to use
    template: path.join(__dirname, "src", "generatedpartial", "head.hbs"),
    // the output file name
    filename: path.join(__dirname, "dist", "partials", "head.hbs"),
    inject: "head"
  }),

  new HandlebarsWebpackPlugin({

    htmlWebpackPlugin: {
    enabled: true, // register all partials from html-webpack-plugin, defaults to `false`
    prefix: "html" // where to look for htmlWebpackPlugin output. default is "html"
    },

    entry: path.join(process.cwd(), "src", "hbs", "*.hbs"),
    output: path.join(process.cwd(), "dist", "[name].html"),

    partials: [
      path.join(process.cwd(), "html",/* <-- this should match htmlWebpackPlugin.prefix */ "*", "*.hbs"),
      path.join(process.cwd(), "src", "hbs", "*", "*.hbs")
    ]
  })
]
```

## Contributors

<a href="https://github.com/TheReincarnator">
    <img width="80" height="80" style="max-width:100%;" 
        title="TheReincarnator" src="https://avatars0.githubusercontent.com/u/840370?s=460&v=4">
</a>

<a href="https://github.com/muuki88">
    <img width="80" height="80" style="max-width:100%;" 
        title="muuki88" src="https://avatars2.githubusercontent.com/u/647727?s=460&v=4">
</a>

<a href="https://github.com/emilchristensen">
    <img width="80" height="80" style="max-width:100%;" 
        title="emilchristensen" src="https://avatars3.githubusercontent.com/u/575486?s=460&v=4">
</a>

<a href="https://github.com/alisonailea">
    <img width="80" height="80" style="max-width:100%;" 
        title="alisonailea" src="https://avatars2.githubusercontent.com/u/3362490?s=460&v=4">
</a>

<a href="https://github.com/vredondoGL">
    <img width="80" height="80" style="max-width:100%;" 
        title="vredondoGL" src="https://avatars3.githubusercontent.com/u/35344609?s=460&v=4">
</a>

<a href="https://github.com/mkungla">
    <img width="80" height="80" style="max-width:100%;" 
        title="mkungla" src="https://avatars2.githubusercontent.com/u/15878458?s=460&v=4">
</a>

<a href="https://github.com/bywo">
    <img width="80" height="80" style="max-width:100%;" 
        title="bywo" src="https://avatars2.githubusercontent.com/u/1434481?s=460&v=4">
</a>

<a href="https://github.com/baldurh">
    <img width="80" height="80" style="max-width:100%;" 
        title="baldurh" src="https://avatars3.githubusercontent.com/u/1823617?s=460&v=4">
</a>

<a href="https://github.com/DannyDelott">
    <img width="80" height="80" style="max-width:100%;" 
        title="DannyDelott" src="https://avatars3.githubusercontent.com/u/4524175?s=460&v=4">
</a>

<a href="https://github.com/amandabouveng">
    <img width="80" height="80" style="max-width:100%;" 
        title="amandabouveng" src="https://avatars2.githubusercontent.com/u/15197360?s=460&v=4">
</a>

<a href="https://github.com/patrikniebur">
    <img width="80" height="80" style="max-width:100%;" 
        title="patrikniebur" src="https://avatars0.githubusercontent.com/u/6452693?s=460&v=4">
</a>


