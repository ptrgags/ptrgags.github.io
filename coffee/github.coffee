@repos = {};

@fetch_repos = ->
    $.getJSON urls.dropbox_repos, "", (repos) ->
        for repo_name, repo of repos
            process_repo repo_name, repo
        refresh()

@process_repo = (repo_name, repo_obj) ->
    repos[repo_name] = repo_obj

fetch_repos()
