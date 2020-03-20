---
layout: post
permalink: about/
title: "About Me"
description: "I'm a product designer, thing maker, artist, and educator."
---
{% capture aboutme %}{% include about.md %}{% endcapture %}
{{ aboutme | markdownify }}