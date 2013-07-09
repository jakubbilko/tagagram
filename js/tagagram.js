/*!
* jQuery tagagram Plugin v0.1.0
* https://github.com/kozulowski/tagagram
*
* Copyright 2013 Jakub Bilko
* Released under the MIT license
*/
(function ($) {
	
	var container, settings, currpage, maxpage;
	
	$.fn.getTaggedMedia = function(options) {
		container = this;
		
		settings = $.extend({
			clientId: '',
			tagName: '',
			mode: 'single',		// single, multiPage, all
			limit: 20,
			pageCount: 1,
			template: '<a href="{link}"><img src="{low_resolution}" alt="" /></a>'
		}, options);
		
		url = generateUrl(settings.tagName, settings.limit, settings.clientId, settings.mode)
		
		if(settings.mode == 'single') {
			getSinglePageTagged(url);
		}
		else if(settings.mode == 'multiPage') {
			currpage = 0;
			maxpage = settings.pageCount;
			getMultipages(url);
		}
		else if(settings.mode == 'all') {
			getAllTagged(url);
		}
		
	};
	
	function generateUrl(tag, limit, id, mode) {
		var url;
		if(mode == 'single') {
			url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=' + id + '&limit=' + limit;
		}
		else if(mode == 'multiPage' || mode == 'all') {
			url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=' + id;
		}
		return url;
	};
	
	function getSinglePageTagged(url) {
		$.ajax({
			url: url,
			type: "GET",
			dataType: "jsonp",
			cache: false
		}).done(function(data) {
			$.each(data.data, function(index, value) {
				container.append(createElementFromTemplate(value));	
			});
		});
	};
	
	function getMultipages(url) {
		if(currpage < maxpage) {
			$.ajax({
				url: url,
				type: "GET",
				dataType: "jsonp",
				cache: false
			}).done(function(data) {
				$.each(data.data, function(index, value) {
					container.append(createElementFromTemplate(value));	
				});
				currpage++;
				if(data.pagination.next_url) getMultipages(data.pagination.next_url);
			});
		}
	}
	
	function getAllTagged(url) {
		$.ajax({
				url: url,
				type: "GET",
				dataType: "jsonp",
				cache: false
			}).done(function(data) {
				$.each(data.data, function(index, value) {
					container.append(createElementFromTemplate(value));	
				});
				if(data.pagination.next_url) getAllTagged(data.pagination.next_url);
		});
	}
	
	function createElementFromTemplate(element) {
		var elem = settings.template;
		elem = elem.replace('{link}', element.link);
		elem = elem.replace('{low_resolution}', element.images.low_resolution.url);
		elem = elem.replace('{thumbnail}', element.images.thumbnail.url);
		elem = elem.replace('{standard_resolution}', element.images.standard_resolution.url);
		if(element.caption) elem = elem.replace('{caption}', element.caption.text);
		elem = elem.replace('{likes}', element.likes.count);
		return elem;
	}
	

	
})(jQuery)