---
# NOTE: The filename should be <end date>_CreativeRecap.md. This does mean
# if I miss a week, I have to rename the file

layout: article
# Date range should be the sunday of the start range to the ending saturday
title: Creative Recap for YYYY-MM-DD/DD
# These dates should both be the end date
sort_key: 'YYYY-MM-DD'
blog_date: 'YYYY-MM-DD'
summary: >
    SUMMARY -- SUMMARY -- SUMMARY
# Backblaze link here. 
# NOTE: in Backblaze, thumbnails are stored by the START date, not the end date.
thumbnail: path/to/thumbnail.png

# Keep this true until the Saturday morning when I publish
hide: true
---
<script setup lang="ts">
import {backblaze_link} from '../core/links'
</script>

## New Pattern: YYY

<img :src="backblaze_link('pattern/PATTERN_ID/thumbnail.png')" />

See the `../pattern/PATTERN_ID/` page on this website.

DESCRIPTION
