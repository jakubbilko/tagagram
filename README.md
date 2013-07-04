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
