function loadHTML(elementId, filePath) {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Error loading ${filePath}`);
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error("Error:", error));
}

function populateProject(json, id) {
    var element = document.getElementById(id)
    var clone = element.cloneNode(true)
    clone.style.display = "block"
    clone.id += "-" + json.title
    for(const key in json) {
        if(key != "metadata") {
            try {
                clone.getElementsByClassName(key)[0].innerHTML = json[key]
            } catch (error) {
                console.log("Unknown project section " + key)
            }
        }
    }

    populateDiv(clone, json, 'images', 'image-template', 'images')
    populateDiv(clone, json, 'videos', 'video-template', 'videos')
    populateDiv(clone, json, 'media', 'media-template', 'media')
    
    var link_div = clone.getElementsByClassName('links')[0]
    for(link of json.metadata.links) {
        link_div.style.display = "block"
        link_template = link_div.getElementsByClassName('link-template')[0].cloneNode(true);
        link_a_template = link_template.getElementsByClassName('link-a-template')[0];
        link_a_template.class = "";
        link_a_template.href = link.link
        link_a_template.innerHTML = link.link
        link_template.class = ""
        link_template.style.display = "block"
        link_template.innerHTML = link.title + ": " + link_template.innerHTML
        link_div.appendChild(link_template);
    }

    element.parentElement.appendChild(clone)
}

function populateDiv(parent, json, div_name, template_name, metadata_target) {
    var div = parent.getElementsByClassName(div_name)[0]
    for(content of json.metadata[metadata_target]) {
        div.style.display = "block"
        template = div.getElementsByClassName(template_name)[0].cloneNode(true);
        template.class = ""
        template.style.display = "block"
        template.src=content
        div.appendChild(template);
    }
}