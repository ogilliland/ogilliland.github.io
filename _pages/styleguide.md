---
layout: post
permalink: styleguide/
title: "Style Guide"
---
## Colors

<div style="padding: 0.3rem 0.5rem; color: black; background-color: #ffcc11"><b>#ffcc11</b> <span style="float: right">$color-primary</span></div>
<div style="padding: 0.3rem 0.5rem; color: black; background-color: #ffffff"><b>#ffffff</b> <span style="float: right">$color-secondary</span></div>
<div style="padding: 0.3rem 0.5rem; color: black; background-color: #f4f4f4"><b>#f4f4f4</b> <span style="float: right">$color-acc-light</span></div>
<div style="padding: 0.3rem 0.5rem; color: black; background-color: #808080"><b>#808080</b> <span style="float: right">$color-acc-mid</span></div>
<div style="padding: 0.3rem 0.5rem; color: white; background-color: #1e1e1e"><b>#1e1e1e</b> <span style="float: right">$color-acc-dark</span></div>

## Fonts

<div class="box">
<span class="block" style="font-size: 2rem; font-weight: 700; font-family: Lato, Helvetica, Arial, sans-serif;">$font-primary: Lato, Helvetica, Arial, sans-serif;</span>
<span class="block" style="font-size: 1.5rem; font-weight: 700; font-family: 'Open Sans', Helvetica, Arial, sans-serif;">$font-secondary: "Open Sans", Helvetica, Arial, sans-serif;</span>
</div>

## Headings

<div class="box">
<h1 style="margin-top: 0;">Heading One</h1>
<h2 style="margin-top: 0;">Heading Two</h2>
<h3 style="margin-top: 0;">Heading Three</h3>
</div>

## Block Quotes

With author, title, and URL:

{% include blockquote.html quote="Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing." author="Jules" title="Pulp Fiction" url="https://www.imdb.com/title/tt0110912/" %}

With author only:

{% include blockquote.html quote="I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times." author="Bruce Lee" %}

Without author:

{% include blockquote.html quote="It was a dark and stormy night; the rain fell in torrents — except at occasional intervals, when it was checked by a violent gust of wind which swept up the streets (for it is in London that our scene lies), rattling along the housetops, and fiercely agitating the scanty flame of the lamps that struggled against the darkness." %}

## Pull Quotes

*When nothing is sure, everything is possible.*{:.pullquote}

*You think water moves fast? You should see ice.*{:.pullquote-left data-quote="You think water moves fast? You should see ice."} It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man.

So I guess this is where I tell you what I learned – my conclusion, right? Well, my conclusion is: *Hate is baggage.*{:.pullquote-right data-quote="Hate is baggage."} Life’s too short to be pissed off all the time. It’s just not worth it. Derek says it’s always good to end a paper with a quote. He says someone else has already said it best. So if you can’t top it, steal from them and go out strong. So I picked a guy I thought you’d like. "We are not enemies, but friends. We must not be enemies. Though passion may have strained, it must not break our bonds of affection. The mystic chords of memory will swell when again touched, as surely they will be, by the better angels of our nature."

## Images

Full width:

![image 3](https://picsum.photos/800/600/?random){:.img-full}

Double spread:

![image 4](https://picsum.photos/600/400/?random){:.img-left} ![image 5](https://picsum.photos/600/401/?random){:.img-right}

## Code Blocks

Here is some text with an inline code block for `alert("hello")`.

Multi-line:

{% highlight javascript %}
for (var i = 0; i < 10; i++) {
	console.log(i);
}
{% endhighlight %}

Multi-line with line numbers:

{% highlight javascript linenos %}
for (var i = 0; i < 10; i++) {
	console.log(i);
}
{% endhighlight %}

## Footnotes

Here is some text with a footnote[^1] in the middle.

And another one[^2].

[^1]: Footnotes are a way of including additional context or references in a document without disrupting it's readibility.

[^2]: When writing prose, numbers should always be written as text.

## Project List

<div class="project-list full-width">
	{% assign sorted = (site.projects | sort: 'date') | reverse %}
	{% for post in sorted limit: 6 %}
	<a class="no-underline" href="{{ post.url }}" aria-label="view project">
		<div class="project">
			{% if post.image %}
			<img src="{{ post.image }}">
			{% endif %}
			<div class="project__content">
				<h3 class="project__title">{{ post.title }}</h3>
				{% for tag in post.tags %}
				<span class="project__tag pill">{{ tag }}</span>
				{% endfor %}
			</div>
		</div>
	</a>
	{% endfor %}
</div>

## Post List

<div class="post-list full-width">
	{% assign sorted = (site.posts | sort: 'date') | reverse %}
	{% for post in sorted limit: 4 %}
	<a class="no-underline" href="{{ post.url }}" aria-label="continue reading">
		<div class="post">
			{% if post.image %}
			<img src="{{ post.image }}">
			{% endif %}
			<div class="post__content">
				<h3 class="post__title">{{ post.title }}</h3>
				{% for tag in post.tags %}
				<span class="post__tag pill">{{ tag }}</span>
				{% endfor %}
				<span class="post__date info-text">{{ post.date | date: "%d %b %Y" }}</span>
				<span class="post__intro">{{ post.content | strip_html | truncate: 250 }}</span>
			</div>
		</div>
	</a>
	{% endfor %}
</div>
