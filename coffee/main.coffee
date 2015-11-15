@make_elem = (tag, parent) ->
    elem = document.createElement tag
    if parent?
        parent.appendChild elem
    elem

class @Widget
    render: ->
        paragraph = make_elem "p"
        paragraph.innerHTML = "Widget"
        paragraph

class @IdeasCard extends Widget
    constructor: (@ideas) ->

    render: ->
        panel = make_elem 'div'
        panel.className = "panel panel-default"

        panel_body = make_elem 'div', panel
        panel_body.className = "panel-body"

        intro = make_elem 'p', panel_body
        intro.innerHTML = "This is a list of possible future projects
        I'd be interested in trying. I probably won't find time for most of them,
        but if enough people ask me about a single idea, I might
        consider making it a project."

        p = make_elem "p", panel_body
        p.innerHTML = "Feel free to take inspiration from this list! If you
        develop something cool, let me know at ptrgags@gmail.com.
        I'd love to hear about it!"

        ul = make_elem "ul", panel_body

        for idea in @ideas
            item = make_elem "li", ul
            item.innerHTML = idea

        panel

class @ProjectCard extends Widget
    constructor: (@project) ->

    render: ->
        panel = make_elem 'div'
        panel.className = "panel panel-default"

        panel_body = make_elem 'div', panel
        panel_body.className = "panel-body"

        heading = make_elem 'h2', panel_body
        heading.innerHTML = @project.title

        row = make_elem 'div', panel_body
        row.className = "row"

        info_col = make_elem 'div', row
        info_col.className = "col-sm-6"

        pic_col = make_elem 'div', row
        pic_col.className = "col-sm-6"

        if @project.with?
            collab_p = make_elem "p", info_col
            collab_p.innerHTML = "With "

            collab = make_elem "a", collab_p
            collab.innerHTML = @project.with
            collab.href = "https://github.com/#{@project.with}"

        tags = make_elem 'p', info_col

        if @project.version?
            if not @project.version_prefix
                @project.version_prefix = "Version"
            version_tag = make_elem 'span',  tags
            version_tag.className = "label label-success"
            version_tag.innerHTML = "#{@project.version_prefix} #{@project.version}"

        if @project.dev_number?
            if not @project.dev_status
                @project.dev_status = "backlog"
            status_tag = make_elem 'span', tags
            if @project.dev_status is 'backlog'
                status_tag.className = "label label-danger"
                status_tag.innerHTML = "v#{@project.dev_number} on Backlog"
            else if @project.dev_status is 'development'
                status_tag.className = "label label-warning"
                status_tag.innerHTML = "v#{@project.dev_number} in Development"

        if @project.description?
            description = make_elem 'p', info_col
            description.innerHTML = @project.description

        buttons = make_elem "div", panel_body
        buttons.className = "btn-group"

        if @project.github_link?
            github_link = make_elem "a", buttons
            github_link.href = "https://github.com/ptrgags/#{@project.github_link}"
            github_link.className = "btn btn-success"
            github_link.role = "button"
            github_link.innerHTML = "View on Github"

        if @project.dropbox_link? and @project.version?
            dropbox_link = make_elem "a", buttons
            dropbox_link.href = "https://dl.dropboxusercontent.com/u/25993970/github/#{@project.dropbox_link}"
            dropbox_link.className = "btn btn-success"
            dropbox_link.role = "button"
            dropbox_link.innerHTML = "View Version #{@project.version}"

        if @project.link? and @project.link_text
            link = make_elem "a", buttons
            link.href = "#{@project.link}"
            link.className = "btn btn-success"
            link.role = "button"
            link.innerHTML = @project.link_text
        panel

NUM_COLS = 2

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
    contents = document.getElementById("content")
    contents.innerHTML = ""

    title = make_elem "h1", contents
    title.innerHTML = "Future Project Ideas"

    ideas_widget = new IdeasCard ideas
    contents.appendChild ideas_widget.render()

@show_projects = ->
    contents = document.getElementById("content")
    contents.innerHTML = ""
    column = 0
    row = null

    title = make_elem "h1"
    title.innerHTML = "My GitHub Projects"
    contents.appendChild title

    project_arr = (projects[key] for key of projects)
    project_arr.sort sort_projects

    for proj in project_arr
        if column is 0
            row = make_elem "div", contents
            row.className = "row"

        col = make_elem "div", row
        col.className = "col-sm-#{12 // NUM_COLS}"

        card = new ProjectCard proj
        col.appendChild card.render()

        column = (column + 1) % NUM_COLS

@onload = ->
    document.getElementById("btn-github").onclick = show_projects
    document.getElementById("btn-ideas").onclick = show_ideas

    if location.hash is "#projects"
        show_projects()
    else if location.hash is "#ideas"
        show_ideas()
    else
        show_projects()
