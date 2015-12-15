#TODO: Use JQuery instead of this
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
