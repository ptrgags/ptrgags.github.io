class @Widget
    render: ->
        $("<p>").html("Widget")

class @HomeCard extends Widget
    render: ->
        panel = $('<div>').addClass 'panel panel-default'
        panel_body = $("<div>").addClass('panel-body').appendTo panel
        $("<h2>").html("Welcome").appendTo panel_body
        $("<p>").html("Hello, my name is Peter Gagliardi.
        Welcome to my GitHub website! This site is my portfolio
        of programming projects. It fetches data about my public
        GitHub repositories and presents them all in one place.").appendTo panel_body
        $("<p>").html("I have a backend script + cron job that fetches my GitHub
        data and makes it accessible to the site. As a result, this site updates
        its content automatically at least once a week, even if I forget to
        run the script.").appendTo panel_body
        $("<p>").html("This website is a work in progress. There are many more
        features I would like to add over time, but I'm usually working
        on other projects.").appendTo panel_body
        panel

class @IdeasCard extends Widget
    constructor: (@ideas) ->

    render: ->
        panel = $('<div>').addClass 'panel panel-default'
        panel_body = $("<div>").addClass('panel-body').appendTo panel
        $('<p>').html("This is a list of possible future projects
        I'd be interested in trying. I probably won't find time for most of them,
        but if enough people ask me about a single idea, I might
        consider making it a project.").appendTo panel_body
        $('<p>').html("Feel free to take inspiration from this list! If you
        develop something cool, let me know at ptrgags@gmail.com.
        I'd love to hear about it!").appendTo panel_body

        ul = $("<ul>").appendTo panel_body

        for idea in @ideas
            $("<li>").html(idea).appendTo ul

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
        panel
