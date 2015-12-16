@repos = {};

@fetch_repos = ->
    #Grab data from each repo URL
    $.getJSON urls.github_repos_url, "", (repos) ->
        for repo in repos
            process_repo repo
        refresh()

@fetch_tags = (title_key) ->
    repo_name = repos[title_key].title
    url = "#{urls.github_repo_base}/#{repo_name}/tags"
    $.getJSON url, "", (tags) ->
        if tags.length >= 1
            version_tag = tags[0].name
        else
            version_tag = ""

        repos[title_key].version_tag = version_tag
        refresh_repo title_key

@process_repo = (repo) ->
    info = {}
    info.title = repo.name

    #Description and years
    split_regex = /(?=\()/
    [info.description, info.years] = repo.description.split split_regex

    #Remove parentheses from years
    info.years = info.years.substring(1, info.years.length - 1)

    info.github_link = repo.html_url
    info.github_page = repo.homepage

    #Store the repo data for later
    title_key = info.title.replace(/\./g, "-")
    repos[title_key] = info

    #Fetch other information to add to the page
    @fetch_tags title_key



fetch_repos()
