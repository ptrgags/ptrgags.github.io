// Generated by CoffeeScript 1.10.0
(function() {
  var NUM_COLS;

  NUM_COLS = 2;

  this.refresh = function() {
    switch (location.hash) {
      case "":
        return show_home();
      case "#home":
        return show_home();
      case "#projects":
        return show_repos();
      case "#ideas":
        return show_ideas();
      default:
        return console.warn("Invalid hash... Fix this");
    }
  };

  this.refresh_repo = function(title_key) {
    var card, repo;
    repo = repos[title_key];
    card = new ProjectCard(repo);
    return $("#" + title_key).html(card.render());
  };

  this.score = function(proj) {
    var val;
    val = 0;
    if (proj.priority != null) {
      val |= 0x04;
    }
    if (proj.version != null) {
      val |= 0x02;
    }
    if ((proj.dev_status != null) && proj.dev_status === 'development') {
      val |= 0x01;
    }
    return val;
  };

  this.sort_projects = function(a, b) {
    var a_score, b_score;
    a_score = score(a);
    b_score = score(b);
    if (a_score > b_score) {
      return -1;
    }
    if (a_score < b_score) {
      return 1;
    }
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  };

  this.show_home = function() {
    var home_widget;
    $('#content').html("");
    $("<h1>").html("GagsDev Home").appendTo("#content");
    home_widget = new HomeCard;
    return $("#content").append(home_widget.render());
  };

  this.show_ideas = function() {
    var ideas_widget;
    $("#content").html("");
    $("<h1>").html("Future Project Ideas").appendTo("#content");
    ideas_widget = new IdeasCard(ideas);
    return $("#content").append(ideas_widget.render());
  };

  this.show_repos = function() {
    var col, column, repo, repo_name, results, row;
    $("#content").html("");
    $("<h1>").html("My GitHub Projects").appendTo("#content");
    column = 0;
    row = null;
    results = [];
    for (repo_name in repos) {
      repo = repos[repo_name];
      if (column === 0) {
        row = $('<div>').addClass("row").appendTo('#content');
      }
      col = $('<div>').addClass("col-sm-" + (Math.floor(12 / NUM_COLS))).prop("id", repo_name).appendTo(row);
      refresh_repo(repo_name);
      results.push(column = (column + 1) % NUM_COLS);
    }
    return results;
  };

  this.ideas = [];

  this.fetch_ideas = function() {
    return $.getJSON(urls.dropbox_ideas, "", function(data) {
      window.ideas = data;
      return refresh();
    });
  };

  fetch_ideas();

  this.onload = function() {
    $("#btn-github").click(show_repos);
    $("#btn-ideas").click(show_ideas);
    $("#btn-home").click(show_home);
    return refresh();
  };

}).call(this);