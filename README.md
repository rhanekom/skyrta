# skyrta

A Node.js wrapper around popular graphing tools to generate graphs.


[![npm version](https://badge.fury.io/js/skyrta.svg)](https://badge.fury.io/js/skyrta) [![Build Status](https://travis-ci.org/rhanekom/skyrta.svg?branch=master)](https://travis-ci.org/rhanekom/skyrta) [![Maintainability](https://api.codeclimate.com/v1/badges/f839be9c69b30a2dd7e1/maintainability)](https://codeclimate.com/github/rhanekom/skyrta/maintainability) ![Dependencies](https://david-dm.org/rhanekom/skyrta.svg)

A wrapper around some popular graph tools to generate diagrams from their text representation.

This package currently supports:

-   [SvgBobRus][bobrus] for ASCII diagrams
-   [GraphViz][graphviz] for diagrams expressed in dot
-   [Mermaid][mermaid] for diagrams and flowcharts (in the latest beta)

This package is simple in that it  passes in the input provided directly over stdin to the appropriate process and returns the generated SVG.

## Usage

### General

```bash
npm install skyrta --save
```

And then:

```javascript
const skyrta = require('skyrta');
let svg = skyrta.generate('bob', '----->');
```

To get the raw string data you can either call `toString()` on the object or use the `value` property:

```javascript
let svg = skyrta.generate('bob', '----->').toString();
```

or

```javascript
let svg = skyrta.generate('bob', '----->').value;
```

Some diagramming tools like GraphViz outputs full SVG, including `DOCTYPE` and XML tags.  To strip these for embedding purposes in HTML you can use the `toEmbed` function which will strip out anything outside of the `<svg>` tag.

```javascript
let svg = skyrta.generate('bob', '----->').toEmbed();
```

### Options

Skyrta supports plugin specific options.  You can pass them directly to the generate function:

```javascript
let svg = skyrta.generate('bob', '----->', {
    // Your options here
}).toEmbed();
```

You can find the specific options for each diagram type below.

### Diagrams

#### SvgBobRus diagrams

This package expects svgbob_cli to available in the system path.  Installation:

`cargo install svgbob_cli`

You can find specific instructions on the [repo page][bobrus].

```javascript
let svg = skyrta.generate('bob', '*----->').toEmbed();
```


An input like this

![Bob markup](doc/bob-markup.png)

will provide the following (rendered) SVG diagram:

![Bob diagram](doc/bobrus.png)


#### Options

| Option      | Translates to  |
| ----------- | -------------- |
| fontFamily  | --font-family  |
| fontSize    | --font-size    |
| scale       | --scale        |
| strokeWidth | --stroke-width |

Please see the [official documentation][bobrus] for detailed descriptions on these options.  Example:

```javascript
{
    fontFamily: "arial"
    fontSize: 14,
    scale: 1,
    strokeWidth: 2
}
```



#### Graphviz

Graphviz can be installed in most cases via your package manager.  See the [download page][graphviz-download] for manual downloads and installation instruction instructions.

A simple graph

![Graphviz markup](doc/graphviz-markup.png)

will provide the following (rendered) SVG diagram:

![Graphviz output](doc/graphviz.png)



#### Options



| Option              | Translates to |
| ------------------- | ------------- |
| graphAttributes: {} | -Gname=val    |
| nodeAttributes:  {} | -Nname=val    |
| edgeAttributes:  {} | -Ename=val    |
| scale               | -s\[scale\]   |
| engine              | -Kv           |

Please see the [official documentation][graphviz-dot] for possible values of these parameters.

`graphAttributes`, `nodeAttributes`, and `edgeAttributes` are multi-valued options.  In other words, for each key a `-G`, `-N`, or `E` option will be passed to the `dot` executable.

For example, to set the default styles for arrowheads to  `empty` you can provide the following options:

```javascript
edgeAttributes: {
   'arrowtail': 'empty',
   'arrowhead': 'empty'
}
```

A list of possible attributes can be found [here][graphviz-attributes].

## Demo

`Skyrta` is used in the `gatsby-remark-draw` plugin to convert code blocks in Markdown to inline SVG.  You can see some samples in action [here](https://rhanekom.github.io/gatsby-remark-draw-demo/).



## Version history

**1.4.**

Added options to pass to the rendering executable.

**1.3**

SVG returned in wrapper class with the `toEmbed()` function to strip excess XML for HTML embedding purposes.

## TODO

-   ~~Options support~~
-   CLI
-   Mermaid support
-   PlantUML support

[bobrus]: https://github.com/ivanceras/svgbobrus

[graphviz]: https://www.graphviz.org/

[graphviz-download]: https://www.graphviz.org/download/

[graphviz-dot]: https://www.graphviz.org/doc/info/command.html

[graphviz-attributes]: https://www.graphviz.org/doc/info/attrs.html

[mermaid]: https://github.com/knsv/mermaid
