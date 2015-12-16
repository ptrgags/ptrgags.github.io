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
        panel = $("<div>").addClass 'panel panel-default'
        panel_body = $("<div>").addClass('panel-body').appendTo panel
        $("<h2>").html(@project.title).appendTo panel_body
        $("<p>").html(@project.years).appendTo panel_body
        description = $("<p>").html(@project.description).appendTo panel_body
        $("<p>").prop("id", "labels-#{@project.title}").appendTo panel_body
        buttons = $('<div>').addClass("btn-group").appendTo panel_body

        if @project.github_link?
            $('<a role="button">')
                .prop("href", @project.github_link)
                .addClass("btn btn-success")
                .html("View on GitHub")
                .appendTo buttons

        #TODO: handle the project for this website
        if @project.github_page? and @project.github_page isnt ""
            $('<a role="button">')
                .prop("href", @project.github_page)
                .addClass("btn btn-success")
                .html("View GitHub Page")
                .appendTo buttons

        ###
        if @project.with?
            collab_p = make_elem "p", info_col
            collab_p.innerHTML = "With "

            collab = make_elem "a", collab_p
            collab.innerHTML = @project.with
            collab.href = "https://github.com/#{@project.with}"
        ###

        ###
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

        if @project.dropbox_link? and @project.version?
            dropbox_link = make_elem "a", buttons
            dropbox_link.href = "https://dl.dropboxusercontent.com/u/25993970/github/#{@project.dropbox_link}"
            dropbox_link.className = "btn btn-success"
            dropbox_link.role = "button"
            dropbox_link.innerHTML = "View Version #{@project.version}"
        ###
        panel
