NUM_COLS = 2

@refresh = ->
    switch location.hash
        when "" then show_repos()
        when "#projects" then show_repos()
        when "#ideas" then show_ideas()
        else console.warn "Invalid hash... Fix this"

@refresh_repo = (title_key) ->
    repo = repos[title_key]
    card = new ProjectCard repo
    $("##{title_key}").html card.render()

@score = (proj) ->
    val = 0
    if proj.priority?
        val |= 0x04
    if proj.version?
        val |= 0x02
    if proj.dev_status? and proj.dev_status is 'development'
        val |= 0x01
    val

@sort_projects = (a, b) ->
    a_score = score a
    b_score = score b

    if a_score > b_score
        return -1
    if a_score < b_score
        return 1

    if a.title.toLowerCase() < b.title.toLowerCase()
        return -1
    if a.title.toLowerCase() > b.title.toLowerCase()
        return 1

    return 0

@show_ideas = ->
    $("#content").html ""
    $("<h1>").html("Future Project Ideas").appendTo "#content"

    ideas_widget = new IdeasCard ideas
    $("#content").append ideas_widget.render()

@show_repos = ->
    $("#content").html ""
    $("<h1>").html("My GitHub Projects").appendTo "#content"

    column = 0
    row = null

    for repo_name, repo of repos
        if column is 0
            row = $('<div>').addClass("row").appendTo '#content'
        col = $('<div>')
            .addClass("col-sm-#{12 // NUM_COLS}")
            .prop("id", repo_name)
            .appendTo row
        refresh_repo repo_name
        column = (column + 1) % NUM_COLS


#Get data for the Project Ideas page
@ideas = []
@fetch_ideas = ->
    $.getJSON urls.dropbox_ideas, "", (data) ->
        window.ideas = data
        refresh()
fetch_ideas()

@onload = ->
    $("#btn-github").click refresh
    $("#btn-ideas").click refresh
    refresh()
