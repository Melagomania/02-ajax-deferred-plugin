## DESCRIPTION:

**Implement mySearchWidget plugin for jQuery. This plugin allows to search throught Wikipedia and Google Books API and display links to found articles or books.**

User should be able to call plugin in next way:
```
jQuery('...').mySearchWidget()
```
`mySearchWidget` function should accept options object (optional) as its only parameter.

**By default plugin should use Wikipedia API for search and display first 10 results.**

Options object structure:

* `type` - type of API which should be used for search. Accepts only `'wikipedia'` and `'google-books'` as values. If other value passed - show validation error (standard browser alert modal) and prevent initialization.

* `limit` - maximum number of search results that should be displayed. If provided value less than `1` and more than `30` - show validation error (standard browser alert modal) and prevent initialization.

Each widget element can specify its own serch type and limit via `data-search-type` and `data-search-limit` attributes.

However if both element attribute and initialization option property are passed - later should be used.
For example: if element has attribute `data-search-limit="10"` and options object has property `limit: 15` - plugin should display 15 results.

Plugin should expect next structure of widget element:

* Text field with `msw-search` class - its value should be used as search query.

* Button with `msw-submit` class - should perform search when clicked. 

* Block with `msw-results` class - block will contain links to found articles/books.

> NOTE: See example in `index.html`.

Plugin should implement next functionality:

* User should be able to enter text into text field.

* Search should be performed only when search field contains at least one non whitespace character.

* Perform search if user pressed `Enter` key while text box with `msw-search` class is in focus.

* Perform search if user clicked on button with class `msw-submit` inside the widget block.

* Results should be displayed in block with `msw-results` class as list of titles. **Each item in the list should be a link to that article or book description page which opens in a new browser tab**

* After click on link - its text should be prepended with text `[READ] ` (for example `[READ] Original arlicle title` after click on link `Original arlicle title`) and whole list element should change its background color to `mediumseagreen` (you should use best pactices to change element style from js)

* Show descriptive error message (standard browser alert modal) if request failed.

### Wikipedia API Descriptions
API Request example
```
https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srlimit=5&srsearch=test%20value
```

Where
* `srlimit` limits number of results in resulting data
* `srsearch` search query

Checkout https://www.mediawiki.org/wiki/API:Search (and linked sandbox) for details.

> NOTE: Wikipedia API doesn't provide link to article in API response. It should be composed from atricle title.

### Google Books API Description
API Request example 
```
https://www.googleapis.com/books/v1/volumes?maxResults=5&q=test%20value
```

Where
* `maxResults` limits number of results in resulting data
* `q` search query

Checkout https://developers.google.com/books/docs/v1/reference/volumes/list for details.

Since both APIs have different request parameters and result structures - you should create configurable function wich will perform request and return normalized data (e.g. objects with only url and title) to avoid creating separate request and rendering functionalities.

## REQUIREMENTS:

* All requests should be performed via JSONP.
* Implementation should use Promise interface of the request objects.
* Plugin should support any number of search widgets on the page.
* Plugin should support any internal structure of the widget block (you can safely assume that it will contain only single `.msw-field`, `.msw-results` and `.msw-button` elements).
* Parameters specified on HTML element should take precendence over default parameters.
* Parameters specified during plugin call should take precendence over parameters specified on HTML element.
* All links should be opened in new browser tab.
* All events used inside of the plugin should be in the same namespace.
* Descriptive validation and error messages are shown in described cases.

Support all major browsers: 
 * Chrome
 * Firefox
 * Edge
 * Safari


## WORKFLOW:
Implement plugin in the `my-search-widget.js` file.

Commit all files to git into
branch `04-jquery`
folder `04-jquery/02-ajax-deffered-plugin/task-01`

## SOURCES:

`index.js` - File which contains basic HTML required for plugin and simple initialization.

`my-search-widget.js` - file which should contain plugin code.

## DEADLINE:

Due Date - 02-05-2018 23:59.
Penalty will be applied for each overdue day.
