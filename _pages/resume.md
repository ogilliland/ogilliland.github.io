---
layout: post
permalink: resume/
title: "Resume"
heading: "Oliver Gilliland"
description: "Results-driven and user focused Product Manager with 4+ years experience, seeking to leverage proven leadership and strategy skills to grow revenue in a fast-paced tech firm. Excited by opportunities that empower customers and deliver positive social impact."
---
{{ page.description }}

## Experience
<div class="about__timeline">
  {% assign sorted = (site.experience | sort: 'start') | reverse %}
  {% for position in sorted %}
  {% if company != position.company %}
  <div class="timeline__block timeline__block--logo" style="--bg-image: url('{{ position.image }}')">
    <span class="timeline__title"><b>{{ position.company }}</b>, {{ position.address }}</span>
  {% else %}
  <div class="timeline__block">
  {% endif %}
    {% assign company = position.company %}
    <span class="timeline__position"><b>{{ position.title }}</b></span>
    <span class="timeline__date info-text">{{ position.start | date: "%b %Y" }} - {% if position.end %}{{ position.end | date: "%b %Y" }}{% else %}Present{% endif %}</span>
    {{ position.content }}
  </div>
  {% endfor %}
</div>

## Education
<div class="about__timeline">
  {% assign sorted = (site.education | sort: 'end') | reverse %}
  {% for study in sorted %}
  <div class="timeline__block">
    <span class="timeline__title"><b>{{ study.institution }}</b>, {{ study.address }}</span>
    <span class="timeline__position"><b>{{ study.degree }}</b>, {{ study.grade }}</span>
    <span class="timeline__date info-text">{{ study.start | date: "%b %Y" }} - {% if study.end %}{{ study.end | date: "%b %Y" }}{% else %}Present{% endif %}</span>
    {{ study.content }}
  </div>
  {% endfor %}
</div>

## Skills
<div style="column-count: 2" markdown="1">
* Product vision and strategy
* User interviews
* Requirements gathering
* Wireframing and prototyping
* Data analysis and reporting
* Event storming
* JavaScript, HTML, CSS
* Python, PHP, SQL
* Tableau
* Google Analytics
* JIRA, Trello
* MS Office and Google Docs
* Domain Driven Design (DDD)
</div>