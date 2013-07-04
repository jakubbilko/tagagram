tagagram
========

A jQuery plugin for downloading and displaying tagged media from instagram


## Installation

Include the script in your HEAD tag:

    <script type="text/javscript" src="tagagram.js"></script>
    
## Usage

    $('#container').getTaggedMedia(options)

## Plugin options

You can specify options for the plugin:

    $('#container').getTaggedMedia({
        clientId: '123456',
        tagName: 'test',
        mode: 'single',
        limit: 20,
        pageCount: 1,
        template: '<a href="{link}"><img src="{low_resolution}" alt="" /></a>'
    });

clientId - the client id you get when you register your app

tagName - name of the tag to fetch

mode - this has three possible values: 'single' - fetches a single page of results, 'multiPage' - fetches multiple pages of results, 'all' - fetches all images for the tag

limit - used when 'single' mode is set, limits the numbef of fetched pictures

pageCount - used when 'multiPage' mode is set, sets the number of pages you want to retreive

template - used to specify the template for a single picture

## Templates

The plugin offers a simple templating system for styling downloaded pictures. You can pass your tempalte in the 'template' option. Here are the template tags you can use:

{link} - link to the picture on instagram

{low_resolution} - low resolution picture url

{thumbnail} - thumbnail picture url

{standard_resolution} - standard resolution picture url

{caption} - picture caption

{likes} - like count
