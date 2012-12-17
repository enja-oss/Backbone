+  元文書: [backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub](https://github.com/documentcloud/backbone/blob/9890d49db164e63b9b56e9d664ec0aab2289e0de/index.html "backbone/index.html at 9890d49db164e63b9b56e9d664ec0aab2289e0de · documentcloud/backbone · GitHub")

## Backbone.View

Backbone views are almost more convention than they are code — they don't determine anything about your HTML or CSS for you, and can be used with any JavaScript templating library. The general idea is to organize your interface into logical views, backed by models, each of which can be updated independently when the model changes, without having to redraw the page. Instead of digging into a JSON object, looking up an element in the DOM, and updating the HTML by hand, you can bind your view's render function to the model's "change" event — and now everywhere that model data is displayed in the UI, it is always immediately up to date.

### extend `Backbone.View.extend(properties, [classProperties])`

Get started with views by creating a custom view class. You'll want to override the render function, specify your declarative events, and perhaps the tagName, className, or id of the View's root element.

```javascript
var DocumentRow = Backbone.View.extend({

  tagName: "li",

  className: "document-row",

  events: {
    "click .icon":          "open",
    "click .button.edit":   "openEditDialog",
    "click .button.delete": "destroy"
  },

  render: function() {
    ...
  }

});
```

### constructor / initialize `new View([options])`

When creating a new View, the options you pass are attached to the view as this.options, for future reference. There are several special options that, if passed, will be attached directly to the view: model, collection, el, id, className, tagName and attributes. If the view defines an initialize function, it will be called when the view is first created. If you'd like to create a view that references an element already in the DOM, pass in the element as an option: new View({el: existingElement})

```javascript
var doc = Documents.first();

new DocumentRow({
  model: doc,
  id: "document-row-" + doc.id
});
```

### el `view.el`

All views have a DOM element at all times (the el property), whether they've already been inserted into the page or not. In this fashion, views can be rendered at any time, and inserted into the DOM all at once, in order to get high-performance UI rendering with as few reflows and repaints as possible. this.el is created from the view's tagName, className, id and attributes properties, if specified. If not, el is an empty div.

```javascript
var ItemView = Backbone.View.extend({
  tagName: 'li'
});

var BodyView = Backbone.View.extend({
  el: 'body'
});

var item = new ItemView();
var body = new BodyView();

alert(item.el + ' ' + body.el);
```

### $el `view.$el`

A cached jQuery (or Zepto) object for the view's element. A handy reference instead of re-wrapping the DOM element all the time.

```javascript
view.$el.show();

listView.$el.append(itemView.el);
```

### setElement `view.setElement(element)`

If you'd like to apply a Backbone view to a different DOM element, use setElement, which will also create the cached $el reference and move the view's delegated events from the old element to the new one.

### attributes `view.attrributes`

A hash of attributes that will be set as HTML DOM element attributes on the view's el (id, class, data-properties, etc.), or a function that returns such a hash.

### $ (jQuery or Zepto) `view.$(selector)`

If jQuery or Zepto is included on the page, each view has a $ function that runs queries scoped within the view's element. If you use this scoped jQuery function, you don't have to use model ids as part of your query to pull out specific elements in a list, and can rely much more on HTML class attributes. It's equivalent to running: view.$el.find(selector)

```javascript
ui.Chapter = Backbone.View.extend({
  serialize : function() {
    return {
      title: this.$(".title").text(),
      start: this.$(".start-page").text(),
      end:   this.$(".end-page").text()
    };
  }
});
```

### render `view.render()`

The default implementation of render is a no-op. Override this function with your code that renders the view template from model data, and updates this.el with the new HTML. A good convention is to return this at the end of render to enable chained calls.

```javascript
var Bookmark = Backbone.View.extend({
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});
```
Backbone is agnostic with respect to your preferred method of HTML templating. Your render function could even munge together an HTML string, or use document.createElement to generate a DOM tree. However, we suggest choosing a nice JavaScript templating library. Mustache.js, Haml-js, and Eco are all fine alternatives. Because Underscore.js is already on the page, _.template is available, and is an excellent choice if you've already XSS-sanitized your interpolated data.

Whatever templating strategy you end up with, it's nice if you never have to put strings of HTML in your JavaScript. At DocumentCloud, we use Jammit in order to package up JavaScript templates stored in /app/views as part of our main core.js asset package.

### remove `view.remove()`

Convenience function for removing the view from the DOM. Equivalent to calling $(view.el).remove();

### make `view.make(tagName, [attributes], [content])`

Convenience function for creating a DOM element of the given type (tagName), with optional attributes and HTML content. Used internally to create the initial view.el.

```javascript
var view = new Backbone.View;

var el = view.make("b", {"class": "bold"}, "Bold! ");

$("#make-demo").append(el);
```

### delegateEvents `delegateEvents([events])`

Uses jQuery's delegate function to provide declarative callbacks for DOM events within a view. If an events hash is not passed directly, uses this.events as the source. Events are written in the format {"event selector": "callback"}. The callback may be either the name of a method on the view, or a direct function body. Omitting the selector causes the event to be bound to the view's root element (this.el). By default, delegateEvents is called within the View's constructor for you, so if you have a simple events hash, all of your DOM events will always already be connected, and you will never have to call this function yourself.

The events property may also be defined as a function that returns an events hash, to make it easier to programmatically define your events, as well as inherit them from parent views.

Using delegateEvents provides a number of advantages over manually using jQuery to bind events to child elements during render. All attached callbacks are bound to the view before being handed off to jQuery, so when the callbacks are invoked, this continues to refer to the view object. When delegateEvents is run again, perhaps with a different events hash, all callbacks are removed and delegated afresh — useful for views which need to behave differently when in different modes.

A view that displays a document in a search result might look something like this:

```javascript
var DocumentView = Backbone.View.extend({

  events: {
    "dblclick"                : "open",
    "click .icon.doc"         : "select",
    "contextmenu .icon.doc"   : "showMenu",
    "click .show_notes"       : "toggleNotes",
    "click .title .lock"      : "editAccessLevel",
    "mouseover .title .date"  : "showTooltip"
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },

  open: function() {
    window.open(this.model.get("viewer_url"));
  },

  select: function() {
    this.model.set({selected: true});
  },

  ...

});
```

### undelegateEvents `undelegateEvents()`

Removes all of the view's delegated events. Useful if you want to disable or remove a view from the DOM temporarily.
