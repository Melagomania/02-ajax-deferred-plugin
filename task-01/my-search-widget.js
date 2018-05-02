(function ($) {
  $.fn.mySearchWidget = function (options) {
    var $this;
    var settings = $.extend( {
      api: 'wikipedia',
      limit: 10,
    }, options);
    
    setClickListener();

    function getAPI(elem) {    
      var api = elem.parent().attr('data-search-type');
      if(!api) {
        api = settings.api;
      }
      return api;
    }

    function getQuery(elem) {
      var input = elem.parent().children('.msw-search')[0];
      var regExp = /\S/;
      if(!regExp.test(input.value)) {
        throw new Error('Error');
      }
      return input.value;
    }

    function getURL(api, query) {
      if(api === 'wikipedia') {
        return `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srlimit=${settings.limit}&srsearch=${query}%20value`;
      } else if(api === 'google-books') {
        return 'https://www.googleapis.com/books/v1/volumes?maxResults=' + settings.limit + '&q=' + query + '%20value';
      }
    }

    function setClickListener() {
      $('body').on('click', '.msw-button', function() {
        $this = $(this);
        var elem = $(this);
        sendRequest(getAPI(elem), getQuery(elem));
      });
    }

    function sendRequest(api, query) {
      $.ajax({
        url: getURL(api, query),
        dataType: 'jsonp',
        method: 'GET',
        success: function(response) {
          var linksContainer = $this.parent().children('.msw-results');
          
          linksContainer.empty();
          var linksList = getLinksList(response, api);
          renderLinksList(linksContainer, linksList);
          addLinksListener();
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });
    }

    function getLinksList(response, api) {
      var links = [];
      var arr;
      if(api === 'wikipedia') {
        arr =  response.query.search;
        // console.log(arr);
        for(let i in arr) {
          links.push({
            href: getLink(api, arr[i]),
            title: getTitle(api, arr[i])
          });
        }
      } else if(api === 'google-books') {
        arr =  response.items; 
        for(let i in arr) {
          links.push({
            href: getLink(api, arr[i]),
            title: getTitle(api, arr[i])
          });
        }
      }
      return links;
    }

    function renderLinksList(container, list) {
      container.append('<ul></ul>');
      var ul = container.children('ul');
      $.each(list, function(key, value) {
        var li = $(document.createElement('li'));
        var a = $(document.createElement('a'));
        a.attr('href', value.href);
        a.attr('target', 'blank');
        a.text(value.title);
        a.css('color', 'black');
        li.append(a);
        ul.append(li);       
      });
    }

    function addLinksListener() {
      $('body').on('click', 'a', function() {
        $(this).children('span').empty();
        $(this).prepend('<span>[READ] </span>');
        $(this).css('background-color', 'mediumseagreen');
      });
    }

    function getLink(api, item) {
      if(api === 'wikipedia') {
        return ('https://en.wikipedia.org/wiki/' + item.title).replace(/\s/, '_');
      } else if(api === 'google-books') {
        return item.volumeInfo.infoLink;        
      }
    }

    function getTitle(api, item) {
      if(api === 'wikipedia') {
        return item.title;
      } else if(api === 'google-books') {
        return item.volumeInfo.title;        
      }
    }
  };
})(jQuery);