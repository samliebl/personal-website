# Personal Website

My website. [Located here](https://samliebl.com/).

#### Contents

1. [Construction](#section_Construction)
1. [Site Content](#section_SiteContent)
	1. [Poems (Writing)](#section_Poems)
	1. [Portfolio items](#section_PortfolioItems)
	1. [Professional information](#section_ProfessionalInformation)
1. [Acknowledgments](#section_Acknowledgments)
1. [License](#section_License)

<!-- Construction -->

<h2 id="section_Construction">Construction</h2>

It&rsquo;s just basic HTML and CSS. There is no build step: the pages are written by hand and served as-is.

The small amount of JavaScript lives in `js/main.js` and is loaded by every page. It displays the current year in the footer, counts the poems on a collection page and counts the words in a novel chapter. Each function looks for its own target element (`#yearDisplay`, `#poemCount`, `#wordCount`) and does nothing on pages that don&rsquo;t have one, so pages need no inline script of their own.

<!-- Site Content -->

<h3 id="section_SiteContent">Site Content</h3>

<h4 id="section_DirectoryStructure">Directory Structure</h4>

```
.
|- css/
|  |- vendor/
|  |  |- classes.css
|  |  |- normalize.css
|  |  |- novel.css
|  |  |- style.css
|  |  |- tachyons.pieces.css
|  |
|  |- index.css
|  |- user.css
|
|- js/
|  |- main.js
|
|- work/
|  |- resume.html
|  |- skills.html
|  |- work.html
|
|- writing/
|  |- novel/
|  |  |- index.html
|  |  |- chapter01.html
|  |  |- chapter02.html
|  |  |- chapter03.html
|  |  |- chapter04.html
|  |  |- chapter05.html
|  |  |- lore.html
|  |  |- novel.html
|  |
|  |- poems.html
|  |- stranger.html
|  |- young.html
|
|- colophon.html
|- index.html
|
|- CHANGELOG.txt
|- LICENSE.txt
|- README.md
|- robots.txt
|- sitemap.xml
|
|- Droplet.png
|- droplet-favicon.png
|- favicon.ico
|- tile.png
```

This site contains content in the forms of a) **writing**, b) **portfolio items** and c) **professional information**.

1. Writing &rarr; `writing/*`
1. Portfolio items &rarr; `work/work.html`
1. Professional information &rarr;  `work/skills.html`, `work/resume.html`

Within `writing/`, the poetry collections are `poems.html` (Someone),
`stranger.html` and `young.html`. The novel, *Eathel the Bastard*, is in
`writing/novel/`, with `index.html` as its table of contents, one file per
chapter and `lore.html` for supporting material.

<!-- Poems (Writing) -->

<h4 id="section_Poems">Poems</h4>

I write poems and post them intermittently. The collections live in `writing/`.

<!-- Portfolio items  -->

<h3 id="section_PortfolioItems">Portfolio items</h3>

Things I've made and designed. Logos, illustrations, mockups, etc.

<!-- Poems (Writing) -->

<h3 id="section_PoemsWriting">Poems (Writing)</h3>

Things I've written

Location(s): `writing/*`

<!-- Professional information -->

<h3 id="section_ProfessionalInformation">Professional information</h3>


<h4 id="section_Experience">Experience</h4>

Things I've done and what I've learned

Location(s): `work/skills.html`, `work/work.html`, `work/resume.html`

---

<!-- Acknowledgments -->

<h4 id="section_Acknowledgments">Acknowledgments</h4>

Selected dependencies and inspiration

<details>
	<summary>Acknowledgments *(click to expand)*</summary>

- HTML5 Boilerplate + their CSS template  
[[Website](https://html5boilerplate.com)] [[GitHub](https://github.com/h5bp/html5-boilerplate)]  
- Normalize.css and that body of work by Nicolas Gallagher, *et al*.  
[[Website](https://necolas.github.io/normalize.css/)] [[GitHub](https://github.com/necolas/normalize.css)]  
- Adam Morse (Colors)  
[[Website](https://clrs.cc)] [[GitHub](https://github.com/mrmrs/colors-saturated/)]  
- Stanley Morison (Times New Roman)  
[[Britannica](https://www.britannica.com/biography/Stanley-Morison)] [[Monotype](https://www.monotype.com)]  
- Rasmus Andersson (Inter)  
[[Website](https://rsms.me/)] [[GitHub](https://github.com/rsms/inter)]  
- Christian Robinson (Roboto)  
[[Website](https://www.theartoffun.com)] [[Twitter/X](https://twitter.com/cr64)]  
- Wikipedia  
[[Wikimedia Foundation](https://www.wikimedia.org)] [[Wikipedia](https://www.wikipedia.org)]  
- Tachyons  
[[Website](http://tachyons.io)] [[Github](https://github.com/tachyons-css/tachyons/)]
- Mozilla Foundation (in particular their web docs)  
[[Website](https://www.mozilla.org/)] [[Web Docs](https://developer.mozilla.org/)]

</details>

<!-- License -->

<h4 id="section_License">License</h4>

Two different kinds of thing live in this repository and they are not under
the same terms. The split below is by *kind* rather than by folder, so that
moving or renaming a file doesn't change what applies to it.

**The code** is available under the MIT license in `./LICENSE.txt`: the HTML
structure and page scaffolding, `css/index.css`, `css/user.css` and
`js/main.js`.

**The creative work is &copy; Sam Liebl. All rights reserved.** It may not be
used or reproduced without permission, wherever it appears in this
repository. This covers:

- **Writing** &mdash; the poems, the novel and all other prose and page
  copy. Most of it is under `writing/`, but this applies to the words on
  every page, not just that directory.
- **Design and graphics I made** &mdash; logos, illustrations, mockups and
  other artwork, both as image files (`Droplet.png`, `droplet-favicon.png`,
  `favicon.ico`, `tile.png`) and as artwork embedded directly in a page as
  inline SVG (`work/work.html`).

**Third-party material is under its own terms and is not mine to license.**
Each of these carries its own copyright and license notice in the file
itself:

- `css/vendor/normalize.css` &mdash; Nicolas Gallagher, Jonathan Neal *et
  al.*, MIT
- `css/vendor/style.css` &mdash; HTML5 Boilerplate, MIT
- `css/vendor/tachyons.pieces.css` &mdash; excerpted from Tachyons, &copy;
  Adam Morse and John Otander, MIT

The technology logos reproduced on `work/skills.html` &mdash; Nunjucks,
Sketch, Tachyons, GitHub, Sass, jQuery, Gulp, HTML5 Boilerplate,
Browsersync, Furtive, Adobe Creative Suite, Bash, CSS, git, JSON, Node.js,
3CX, CentOS, Debian, FreeSWITCH, Google Workspace, Ubuntu, Asterisk, VS Code
and Perl &mdash; are each the property of their respective owners. They are
reproduced to identify the tools I use. Their presence implies no
affiliation with or endorsement by those owners. Several are registered
trademarks.

Most of the portfolio on `work/work.html` is self-initiated. The companies,
brands, book titles and authors are invented, made as design exercises
rather than for real clients. Those logos and book covers are wholly mine
and fall under the reserved terms above. Any resemblance to a real
organization or publication is unintended.

Some are real and the credit belongs elsewhere. The Feline Foundation of
Greater Washington, Conservatives for Clean Energy and
[Imagemin](https://github.com/imagemin/imagemin) are real organizations: the
design work shown is mine but the marks are theirs. Showing them is not a
claim on them.

Two of the book covers are for real books rather than invented titles. One
is *Write. Publish. Repeat.* by Sean Platt and Johnny B. Truant; the other
credits Kimberly Johnson. The titles, the names and the writing behind them
belong to their authors; only the cover treatments are mine.

Two files sit in `css/vendor/` but are my own work rather than anyone
else&rsquo;s. They fall under the MIT terms above with the rest of the code:
`classes.css` (a generated spacing scale) and `novel.css`.

See [Acknowledgments](#section_Acknowledgments) for the wider list of work
this site builds on.

---

> Make your choice, adventurous Stranger,  
Strike the bell and bide the danger,  
Or wonder, till it drives you mad,  
What would have followed if you had.

Thanks for visiting•••SL