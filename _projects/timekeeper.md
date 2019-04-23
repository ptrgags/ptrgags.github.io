---
layout: project
title: Timekeeper
permalink: /projects/timekeeper/
description: A web page for converting times between timezones.
purpose: >
    Before my current co-op, I wanted to brush up on AngularJS. I decided to
    make a quick web page for converting timestamps between timezones since
    that is something I have to do relatively often.
status: demo
repo: timekeeper
link: "https://ptrgags.github.io/timekeeper"
languages:
    - JavaScript (Including ECMAScript 6 features)
    - Bootstrap
    - AngularJS
    - MomentJS
concepts:
    - Timezones
    - Unix Timestamps
accomplishments:
    - Convert current time to different timezones
    - Convert timestamp between timezones
    - convert a Unix timestamp to local time or UTC
improvements:
    - Fix overflow on mobile
    - Make up new time formats just for fun
    - Arbitrary time to Unix timestamp
thumbnail: "default-thumbnail.svg"
years: 2016
sort_year: 2016
---

### Current Local Time -> Different Timezones

When talking to someone in a different timezone, it is often helpful
to know when "now" is for them. My web app supports converting to the
following:

* Universal Coordinated Time (UTC)
* Arbitrary Timezone
* Unix Timestamp
* Swatch Internet Time (Just for laughs)

### Compare Time Zones

Sometimes when trying to plan when to Skype with someone in
a different timezone, it would be nice to convert an arbitrary local time
to their timezone. My web app supports converting a date and time to a different
timezone. It also shows how many hours apart the two timezones are.

### Convert Unix Timestamp

I'm a programmer, so I often deal with Unix timestamps. Thus, I made a
converter between Unix time and local/UTC time.
