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
    var image_div = clone.getElementsByClassName('images')[0]
    for(image of json.metadata.images) {
        image_div.style.display = "block"
        image_template = image_div.getElementsByClassName('image-template')[0].cloneNode(true);
        image_template.class = ""
        image_template.style.display = "block"
        image_template.src=image
        image_div.appendChild(image_template);
    }

    element.parentElement.appendChild(clone)
}