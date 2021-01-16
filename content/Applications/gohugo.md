---
date: 2018-06-01
title: GoHugo
menu:
    sidebar:
        parent: Applications
---



## Install
Releases: https://github.com/gohugoio/hugo/releases
Add bin to PATH.
No need to install go.

## Commands
```
hugo new site siteName
hugo serve
```

## Add a theme
```
git init
git submodule add https://github.com/userA/hugo-theme.git themes/hugo-theme

# Edit config.toml
# theme = "hugo-theme"
```

## Configuration
```config.toml
baseURL = "https://example.com/"
languageCode = "en-us"
title = "Example Site"
theme = "hugo-theme"
```

## Structure
```
archetypes/              # Templates to create new content.
config.toml              # Configuration file
content/                 # Website content
    about/
        _index.md        example.com/about/
    authors/
        authorA.md
        authorB.md
    posts/
        postA.md
        postB.md
    events/
        eventA.md
        eventB.md
    ...
data/                    # Stores external data that can be used in website.
layouts/                 # Templates/html views (used by content files)
static/                  # Static content (css, js, ..) copied as-is.
themes/                  
    themeA/...           # A theme dir contains the same structure as the top
                         # level site directory. The top-level dirs override
                         # the active theme dirs.
```

## Content
The site's sections correspond to directories at the root `content/`.

Examples of Sections:
- About
- Authors
- Posts
- Events

__Index__
Hugo generates an index (webpage) for each section.
Each index is meant to list its content.
An index takes its template for its respective layout file.
It is possible to specify an index's content/frontmatter with a file named `_index.md`.

Template Lookup Order 
Example: section `posts`:
1. `layouts/section/posts.html`
2. `layouts/posts/list.html`
3. `layouts/_default/section.html`
4. `layouts/_default/list.html`
5. `/themes/...`

__Page__
It is posssible to explitly specify the content type and layout used in the frontmatter of a page.

Template Lookup Order
Example: page `post.md`
1. `/layouts/<type>/<layout>.html`
2. `/layouts/<section>/<layout>.html`
3. `/layouts/<type>/single.html`
4. `/layouts/<section>/single.html`
5. `/layouts/_default/single.html`
6. `/themes/...`


__ContentType__
By default, every file under a section will use the section's name as its content type.
Ex: posts/post.md
- The content type of post.md is `posts`.

## Content Pages
```
---
title: PostTitle
date: 2017-02-20T15:26:23-06:00
categories: [one]
#tags: [one, two, three]
---

## Introduction
Paragraph. 

## Heading 1
Paragraph. 

## Heading 2
Paragraph. 

```
- Table of content: automatically created.

Notes:
- Pages are sensitive to tabs. Convert them to spaces.
- Pages or index can't be rendered without a proper template.
- Links in pages are case-sensitive.
    + Ex: `./Cfia.PNG`
        + Good: `![Screen](./Cfia.PNG)`
        + Bad : `![Screen](./cfia.png)`


## Template
.Site
    .AllPages
    .Author
    .BaseURL
    .Copyright : defined in configuration
    .Menus
    .Pages
    .Sections  : top-level directories
    .Title

.Page
    .Title : defined in content file (frontmatter)
    .LinkTitle : title of links to it
    .Description
    .Date
    .PublishDate
    .Lastmod
    .Content : file content
    .IsHome : true if homepage
    .IsNode : false if content page
    .IsPage : true if content page
    .IsTranslated
    .Keywords : meta keywords
    .Kind : [page, home, section, taxonomy, taxonomyTerm, RSS, sitemap, 404]
    .Next : link to next page, based on PublishDate
    .NextInSection : link to next page in same section. Ex: .NextInSection.Permalink
    .Prev
    .PrevInSection
    .Permalink
    .Plain : content without html tags
    .RawContent : raw markdown without frontmatter
    .Ref
    .Site
    .Summary : excerpt defined by breakpoint `<!--more-->`
    .TableOfContents
    .Type : content type
    .URL : url relative to root
    .WordCount
    .Params
        .tags
        .categories


## Build
```
hugo --destionation filePath
```


## Images
Example
```
tech/
    images/
          xXx.png
    _index.md
    document.md
```

In `document.md`:

+ Good: `![](../images/xXx.png)`
+ Wrong: `![](../images/xxx.png)`
    - Paths are case-sensitive.



In that same example, image references must be like so:

+ In `_index.md`: `![](./images/x.png)`
    + Since BaseURL = `/tech/`
+ In `document.md`: `![](../images/x.png)`
    + Since BaseURL = `/tech/document`



## Menu 
Using the config option `sectionPagesMenu: sidebar` makes it so every folder directly under `content` will have an entry in the specified menu, named `sidebar` in this case.

Adding a document to the sidebar menu requires adding to its frontmatter the following:

```
---
...
menu:
    sidebar:
        parent: ParentId
...
---
```

ParentId must be the name of the folder that contains it. It is case sensitive: ParentId must be an exact match to the folder's name, case included. Otherwise, you might see a duplicate top-level entry in the sidebar without any sub entries.

Automatic Menu:
    In config, put `sectionPagesMenu = "menuName"`.
    Use the menu with `.Site.Menus.menuName`.
    This menu only contains the top-level sections.
    Their pages don't appear as menu items.

Manual Menu:
    In config, you can configure non-page menu items.
    You can reference these items from Frontpage matter,
    by specifying `parent: identifierOfItem`.
