// Generated by CoffeeScript 1.10.0
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.make_elem = function(tag, parent) {
    var elem;
    elem = document.createElement(tag);
    if (parent != null) {
      parent.appendChild(elem);
    }
    return elem;
  };

  this.Widget = (function() {
    function Widget() {}

    Widget.prototype.render = function() {
      var paragraph;
      paragraph = make_elem("p");
      paragraph.innerHTML = "Widget";
      return paragraph;
    };

    return Widget;

  })();

  this.IdeasCard = (function(superClass) {
    extend(IdeasCard, superClass);

    function IdeasCard(ideas) {
      this.ideas = ideas;
    }

    IdeasCard.prototype.render = function() {
      var i, idea, intro, item, len, p, panel, panel_body, ref, ul;
      panel = make_elem('div');
      panel.className = "panel panel-default";
      panel_body = make_elem('div', panel);
      panel_body.className = "panel-body";
      intro = make_elem('p', panel_body);
      intro.innerHTML = "This is a list of possible future projects I'd be interested in trying. I probably won't find time for most of them, but if enough people ask me about a single idea, I might consider making it a project.";
      p = make_elem("p", panel_body);
      p.innerHTML = "Feel free to take inspiration from this list! If you develop something cool, let me know at ptrgags@gmail.com. I'd love to hear about it!";
      ul = make_elem("ul", panel_body);
      ref = this.ideas;
      for (i = 0, len = ref.length; i < len; i++) {
        idea = ref[i];
        item = make_elem("li", ul);
        item.innerHTML = idea;
      }
      return panel;
    };

    return IdeasCard;

  })(Widget);

  this.ProjectCard = (function(superClass) {
    extend(ProjectCard, superClass);

    function ProjectCard(project) {
      this.project = project;
    }

    ProjectCard.prototype.render = function() {
      var buttons, description, klass, panel, panel_body, tags, text;
      panel = $("<div>").addClass('panel panel-default');
      panel_body = $("<div>").addClass('panel-body').appendTo(panel);
      $("<h2>").html(this.project.title).appendTo(panel_body);
      tags = $("<p>").appendTo(panel_body);
      description = $("<p>").html(this.project.description).appendTo(panel_body);
      if (this.project.version_tag != null) {
        if (this.project.version_tag === "") {
          text = "No Releases";
          klass = "label label-danger";
        } else {
          text = this.project.version_tag;
          klass = 'label label-success';
        }
        $("<span>").addClass(klass).html(text).appendTo(tags);
      }
      $("<span>").addClass("label label-primary").html(this.project.years).appendTo(tags);
      buttons = $('<div>').addClass("btn-group").appendTo(panel_body);
      if (this.project.github_link != null) {
        $('<a role="button">').prop("href", this.project.github_link).addClass("btn btn-success").html("View on GitHub").appendTo(buttons);
      }
      if ((this.project.github_page != null) && this.project.github_page !== "") {
        $('<a role="button">').prop("href", this.project.github_page).addClass("btn btn-success").html("View GitHub Page").appendTo(buttons);
      }

      /*
      if @project.with?
          collab_p = make_elem "p", info_col
          collab_p.innerHTML = "With "
      
          collab = make_elem "a", collab_p
          collab.innerHTML = @project.with
          collab.href = "https://github.com/#{@project.with}"
       */
      return panel;
    };

    return ProjectCard;

  })(Widget);

}).call(this);