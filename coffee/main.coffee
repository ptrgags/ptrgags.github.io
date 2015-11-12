@onload = ->
    contents = document.getElementById("content")
    for key of projects
        proj = projects[key]

        panel = document.createElement 'div'
        panel.className = "panel panel-default"
        contents.appendChild panel

        panel_body = document.createElement 'div'
        panel_body.className = "panel-body"
        panel.appendChild panel_body

        heading = document.createElement 'h2'
        heading.innerHTML = proj.title
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

        tags = document.createElement 'p'
        info_col.appendChild tags

        if proj.version?
            if not proj.version_prefix
                proj.version_prefix = "Version"
            version_tag = document.createElement 'span'
            version_tag.className = "label label-success"
            version_tag.innerHTML = "#{proj.version_prefix} #{proj.version}"
            tags.appendChild version_tag

        if proj.dev_number?
            if not proj.dev_status
                proj.dev_status = "backlog"
            status_tag = document.createElement 'span'
            if proj.dev_status is 'backlog'
                status_tag.className = "label label-danger"
                status_tag.innerHTML = "v#{proj.dev_number} on Backlog"
            else if proj.dev_status is 'development'
                status_tag.className = "label label-warning"
                status_tag.innerHTML = "v#{proj.dev_number} in Development"
            tags.appendChild status_tag

        if proj.description?
            description = document.createElement 'p'
            description.innerHTML = proj.description
            info_col.appendChild description

        buttons = document.createElement "div"
        buttons.className = "btn-group"
        panel_body.appendChild buttons

        if proj.github_link?
            github_link = document.createElement "a"
            github_link.href = "https://github.com/ptrgags/#{proj.github_link}"
            github_link.className = "btn btn-default"
            github_link.role = "button"
            github_link.innerHTML = "View on Github"
            buttons.appendChild github_link

        if proj.dropbox_link? and proj.version?
            dropbox_link = document.createElement "a"
            dropbox_link.href = "https://dl.dropboxusercontent.com/u/25993970/github/#{proj.dropbox_link}"
            dropbox_link.className = "btn btn-default"
            dropbox_link.role = "button"
            dropbox_link.innerHTML = "View Version #{proj.version}"
            buttons.appendChild dropbox_link
