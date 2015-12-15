// Generated by CoffeeScript 1.10.0
(function() {
  var NUM_COLS;

  NUM_COLS = 2;

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

  this.show_ideas = function() {
    var contents, ideas_widget, title;
    contents = document.getElementById("content");
    contents.innerHTML = "";
    title = make_elem("h1", contents);
    title.innerHTML = "Future Project Ideas";
    ideas_widget = new IdeasCard(ideas);
    return contents.appendChild(ideas_widget.render());
  };

  this.show_projects = function() {
    var card, col, column, contents, i, key, len, proj, project_arr, results, row, title;
    contents = document.getElementById("content");
    contents.innerHTML = "";
    column = 0;
    row = null;
    title = make_elem("h1");
    title.innerHTML = "My GitHub Projects";
    contents.appendChild(title);
    project_arr = (function() {
      var results;
      results = [];
      for (key in projects) {
        results.push(projects[key]);
      }
      return results;
    })();
    project_arr.sort(sort_projects);
    results = [];
    for (i = 0, len = project_arr.length; i < len; i++) {
      proj = project_arr[i];
      if (column === 0) {
        row = make_elem("div", contents);
        row.className = "row";
      }
      col = make_elem("div", row);
      col.className = "col-sm-" + (Math.floor(12 / NUM_COLS));
      card = new ProjectCard(proj);
      col.appendChild(card.render());
      results.push(column = (column + 1) % NUM_COLS);
    }
    return results;
  };

  this.projects = {};

  this.ideas = [];

  this.fetch_data = function() {
    var base_url, ideas_url, projects_url;
    base_url = "https://dl.dropboxusercontent.com/u/25993970/github/website";
    projects_url = base_url + "/projects.json";
    ideas_url = base_url + "/ideas.json";
    $.getJSON(projects_url, "", function(data) {
      window.projects = data;
      if (location.hash === "#projects" || location.hash === "") {
        return show_projects();
      }
    });
    return $.getJSON(ideas_url, "", function(data) {
      window.ideas = data;
      if (location.hash === "#ideas") {
        return show_ideas();
      }
    });
  };

  fetch_data();

  this.onload = function() {
    document.getElementById("btn-github").onclick = show_projects;
    document.getElementById("btn-ideas").onclick = show_ideas;
    if (location.hash === "#projects") {
      return show_projects();
    } else if (location.hash === "#ideas") {
      return show_ideas();
    } else {
      return show_projects();
    }
  };


  /*
  TODO: Remove this when done
  <!DOCTYPE html>
  <html>
  <head>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
      <script>
  
          var process_repo = function(repo) {
              //Info object to be returned
              var info = {};
              info.title = repo.name;
  
              //Description and years
              var description_splitter = / (?=\()/; //Match the space before the date
              var description_parts = repo.description.split(description_splitter);
              info.description = description_parts[0];
              info.years = description_parts[1] || '';
              console.log(description_parts);
  
              $("#content").append(info.title + ": " + info.years + "<br/>");
  
          };
  
          var process_repos = function(repos) {
              for (var i in repos) {
                  process_repo(repos[i]);
              }
          };
  
  
  
  
          var user_url = "https://api.github.com/users/ptrgags";
          var repos_url = user_url + "/repos";
  
          $.getJSON(repos_url, "", process_repos);
  
      </script>
  </head>
  <body>
      <div id="content"></div>
  </body>
  </html>
   */

}).call(this);
