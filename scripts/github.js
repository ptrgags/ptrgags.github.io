// Generated by CoffeeScript 1.10.0
(function() {
  this.repos = [];

  this.fetch_repos = function() {
    return $.getJSON(urls.github_repos_url, "", function(repos) {
      var i, len, repo;
      for (i = 0, len = repos.length; i < len; i++) {
        repo = repos[i];
        process_repo(repo);
      }
      return refresh();
    });
  };

  this.process_repo = function(repo) {
    var info, ref, split_regex;
    info = {};
    info.title = repo.name;
    split_regex = /(?=\()/;
    ref = repo.description.split(split_regex), info.description = ref[0], info.years = ref[1];
    info.github_link = repo.html_url;
    info.github_page = repo.homepage;
    return repos.push(info);
  };

  fetch_repos();

}).call(this);
