#RoyalScript

*A functional programming language for the web that's Royal!*

##Intro

RoyalScript is a special functional programming language that transcompiles to compressed JavaScript. It's purpose is to build on the fundamentals of functional programming by adding in extendable lists, mutable data, structs, loops, and much more. You can make functions with recursion, looping, or just use a lambda. It even has a type system!

RoyalScript also emphasizes the nature of simplicity, the entire language is all functions, aside from the comments. 

##Installation and Setup

To install `RoyalScript`, you can use npm by typing the command:

```
$ npm install -g pike
```
RoyalScript, when run natively uses `.royal` files. To compile a RoyalScrpt file to javascript, use

```
royalscript -j path/to/royalscriptfile
```
This will output the transcompiled, compressed javascript in your terminal. To compile and run a royalscript file, you can use

```
royalscript -e path/to/royalscriptfile
```

##Quick Start 

You can use this small interpreter below to try `RoyalScript` out.

####Syntax

In RoyalScript, all statements abide by a concise function syntax as follows

```
<FUNCTION>(<ARGUMENT 1>, <ARGUMENT 2>....)

nested functions:

<FUNCTION 1>(<FUNCTION 2>(<ARGUEMNT 1>), <ARGUMENT 1>....)

series of functions:

<FUNCTION>(<ARGUMENT 1>, <ARGUMENT 2>...), <FUNCTION>()
```

So statements or programs in Oblivion