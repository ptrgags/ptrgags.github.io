class @Widget
    render: ->
        paragraph = document.createElement "p"
        paragraph.innerHTML = "Widget"
        paragraph

class @ProjectCard extends Widget
    constructor: (@project) ->

    render: ->
        panel = document.createElement 'div'
        panel.className = "panel panel-default"

        panel_body = document.createElement 'div'
        panel_body.className = "panel-body"
        panel.appendChild panel_body

        heading = document.createElement 'h2'
        heading.innerHTML = @project.title
        panel_body.appendChild heading

        row = document.createElement 'div'
        row.className = "row"
        panel_body.appendChild row

        info_col = document.createElement 'div'
        info_col.className = "col-sm-6"
        row.appendChild info_col

        pic_col = document.createElement 'div'
        pic_col.className = "col-sm-6"
        row.appendChild pic_col

        if @project.with?
            collab_p = document.createElement "p"
            collab_p.innerHTML = "With "
            info_col.appendChild collab_p

            collab = document.createElement "a"
            collab.innerHTML = @project.with
            collab.href = "https://github.com/#{@project.with}"
            collab_p.appendChild collab

        tags = document.createElement 'p'
        info_col.appendChild tags

        if @project.version?
            if not @project.version_prefix
                @project.version_prefix = "Version"
            version_tag = document.createElement 'span'
            version_tag.className = "label label-success"
            version_tag.innerHTML = "#{@project.version_prefix} #{@project.version}"
            tags.appendChild version_tag

        if @project.dev_number?
            if not @project.dev_status
                @project.dev_status = "backlog"
            status_tag = document.createElement 'span'
            if @project.dev_status is 'backlog'
                status_tag.className = "label label-danger"
                status_tag.innerHTML = "v#{@project.dev_number} on Backlog"
            else if @project.dev_status is 'development'
                status_tag.className = "label label-warning"
                status_tag.innerHTML = "v#{@project.dev_number} in Development"
            tags.appendChild status_tag

        if @project.description?
            description = document.createElement 'p'
            description.innerHTML = @project.description
            info_col.appendChild description

        buttons = document.createElement "div"
        buttons.className = "btn-group"
        panel_body.appendChild buttons

        if @project.github_link?
            github_link = document.createElement "a"
            github_link.href = "https://github.com/ptrgags/#{@project.github_link}"
            github_link.className = "btn btn-default"
            github_link.role = "button"
            github_link.innerHTML = "View on Github"
            buttons.appendChild github_link

        if @project.dropbox_link? and @project.version?
            dropbox_link = document.createElement "a"
            dropbox_link.href = "https://dl.dropboxusercontent.com/u/25993970/github/#{@project.dropbox_link}"
            dropbox_link.className = "btn btn-default"
            dropbox_link.role = "button"
            dropbox_link.innerHTML = "View Version #{@project.version}"
            buttons.appendChild dropbox_link

        if @project.link? and @project.link_text
            link = document.createElement "a"
            link.href = "#{@project.link}"
            link.className = "btn btn-default"
            link.role = "button"
            link.innerHTML = @project.link_text
            buttons.appendChild link

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

@onload = ->
    contents = document.getElementById("content")
    column = 0
    row = null

    project_arr = (projects[key] for key of projects)
    project_arr.sort sort_projects

    for proj in project_arr
        if column is 0
            row = document.createElement "div"
            row.className = "row"
            contents.appendChild row

        col = document.createElement "div"
        col.className = "col-sm-#{12 // NUM_COLS}"
        row.appendChild col

        card = new ProjectCard proj
        col.appendChild card.render()

        column = (column + 1) % NUM_COLS
