---
date: 2018-09-27
title: Markdown
menu:
    sidebar:
        parent: Applications
---


## Headings
Headings from `h1` through `h6`.

* `# H1 Heading`
* `## H2 Heading`
* `### H3 Heading`
* `#### H4 Heading`
* `##### H5 Heading`
* `###### H6 Heading`

## Paragraph
* Paragraphs : Line space between paragraphs
* Line break : Add two spaces to the end of the line

This is a paragraph with an inline break.  
Sentence 2 comes here.

This is a second paragraph without an inline break.
Sentence 2 comes here.

## Emphasis
Styling plain text to emphasis parts of it.

* `**Bold text**` :  **bold text.**, __Bold Text__
*  `_Text in italics_` : _Text in italics_, *Text in italics*
* `==Highlight==` : ==Highlight==
* `~~Strike through~\~` : ~~Strike through~~

## Blockquotes
> Lorem ipsum dolor sit amet...

Nested blockquotes:
> Blockquote 1
>> Sub-quote 1.1
>>> Sub quote 1.1.1

## Escaping
Use the blackslash.

`great\_work\_` : great\_work\_, as opposed to great_work_

## Code

```inline-code` `` : `inline-code`

```java
public class HelloWorld{
    public static void main(String[] args){
        System.out.println("Hello, World!");
    }
}
```

**Warning**: as of July 2 - 2015, avoid using triple backticks to delimit blocks of code in Ghost.

## Lists

    * Item 1
    * Item 2

* Item 1
* Item 2
* `![Item 3](http://)`
* `[Item 4]()`

1. Item 1
2. Item 2
3. Item 3
4. Item 4
5. Item 5

# Horizontal rule

`--------`

-----------------------------
It's not very visible :^o

# Images

**Inline images**
![Alt text](/path/to/img.jpg "Optional title")

**Image reference**
![Alt text](id)

[id]: url/to/image "Optional title attribute"


## Links

[title](target)

`[External link](http://)` : [External link](http://)

` [Link to Headings.](#headings)` : [Link to Headings.](#headings)

Note: headings' ids are trimmed of whitespaces and special chars, as well as being lowercases.

### References links

Ex: I get 10 times more traffic from [Google][1] than from [Yahoo][2] or [MSN][3]

[1]: http:// "Google"
[2]: http:// "Yahoo search"
[3]: http:// "MSN search"

### Automatic link

`<http://url/>`

## Footnotes

`In a text[^1], you can place footnotes.` : In a text[^n], you can place footnotes.

`[^n]: This is the first footnote.` 
[^n]: This is the first footnote.




