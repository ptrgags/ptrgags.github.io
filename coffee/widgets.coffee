#TODO: Use JQuery instead of this
@make_elem = (tag, parent) ->
    elem = document.createElement tag
    if parent?
        parent.appendChild elem
    elem

#TODO: Use JQuery
class @Widget
    render: ->
        paragraph = make_elem "p"
        paragraph.innerHTML = "Widget"
        paragraph

#TODO: Use JQuery
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
        tags = $("<p>").appendTo panel_body

        description = $("<p>").html(@project.description).appendTo panel_body


        if @project.version_tag?
            if @project.version_tag is ""
                text = "No Releases"
                klass = "label label-danger"
            else
                text = @project.version_tag
                klass = 'label label-success'
            $("<span>").addClass(klass).html(text).appendTo tags

        $("<span>")
            .addClass("label label-primary")
            .html(@project.years)
            .appendTo tags

        buttons = $('<div>').addClass("btn-group").appendTo panel_body
        if @project.github_link?
            $('<a role="button">')
                .prop("href", @project.github_link)
                .addClass("btn btn-success")
                .html("View on GitHub")
                .appendTo buttons
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
        panel
