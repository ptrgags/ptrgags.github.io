@repos = []

@fetch_repos = ->
    #Grab data from each repo URL
    $.getJSON urls.github_repos_url, "", (repos) ->
        for repo in repos
            process_repo repo
        refresh()

@process_repo = (repo) ->
    info = {}
    info.title = repo.name

    #Description and years
    split_regex = /(?=\()/
    [info.description, info.years] = repo.description.split split_regex

    info.github_link = repo.html_url
    info.github_page = repo.homepage

    #Store the repo data for later
    repos.push info

fetch_repos()
