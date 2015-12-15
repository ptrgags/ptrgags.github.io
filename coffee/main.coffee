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

@projects = {}
@ideas = []

@fetch_data = ->
    base_url = "https://dl.dropboxusercontent.com/u/25993970/github/website"
    projects_url = "#{base_url}/projects.json"
    ideas_url = "#{base_url}/ideas.json"
    $.getJSON projects_url, "", (data) ->
        window.projects = data
        if location.hash is "#projects" or location.hash is ""
            show_projects()
    $.getJSON ideas_url, "", (data) ->
        window.ideas = data
        if location.hash is "#ideas"
            show_ideas()
fetch_data()

@onload = ->
    document.getElementById("btn-github").onclick = show_projects
    document.getElementById("btn-ideas").onclick = show_ideas

    if location.hash is "#projects"
        show_projects()
    else if location.hash is "#ideas"
        show_ideas()
    else
        show_projects()


###
TODO: Remove this when done
<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>

        var process_repo = function(repo) {
            //Info object to be returned
            var info = {};
            info.title = repo.name;

            //Description and years
            var description_splitter = / (?=\()/; //Match the space before the date
            var description_parts = repo.description.split(description_splitter);
            info.description = description_parts[0];
            info.years = description_parts[1] || '';
            console.log(description_parts);

            $("#content").append(info.title + ": " + info.years + "<br/>");

        };

        var process_repos = function(repos) {
            for (var i in repos) {
                process_repo(repos[i]);
            }
        };




        var user_url = "https://api.github.com/users/ptrgags";
        var repos_url = user_url + "/repos";

        $.getJSON(repos_url, "", process_repos);

    </script>
</head>
<body>
    <div id="content"></div>
</body>
</html>

###
