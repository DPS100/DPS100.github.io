import { Gallery } from './gallery.mjs';

export function loadHTML(elementId, filePath) {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Error loading ${filePath}`);
            return response.text();
        })
        .then(data => {

            const container = typeof elementId === "string" ? document.getElementById(elementId) : elementId;

            // Insert the HTML content
            container.innerHTML += data;

            // Find and execute <script> tags in the loaded HTML
            const scripts = container.querySelectorAll('script');
            scripts.forEach((script) => {
                const newScript = document.createElement('script');
                newScript.textContent = script.textContent;

                // Copy any attributes (like `src`)
                Array.from(script.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });

                // Append to the DOM to execute
                document.body.appendChild(newScript);
                script.remove(); // Optional: Clean up the old <script> tag
            });
        })
        .catch(error => console.error("Error:", error));
}

export function highlightCurrentPage() {
    const path = window.location.pathname;
    const hash = window.location.hash;
    switch (path) {
        case "/":
            document.getElementById("home-button").classList.add("active");
            break;
        case "/projects":
            document.getElementById("projects-button").classList.add("active");
            break;
        default:
            break;
    }
}

export function populateProject(json, id) {

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
    
    var link_div = clone.getElementsByClassName('links')[0]
    for(const link of json.metadata.links) {
        link_div.style.display = "block"
        const link_template = link_div.getElementsByClassName('link-template')[0].cloneNode(true);
        const link_a_template = link_template.getElementsByClassName('link-a-template')[0];
        link_a_template.class = "";
        link_a_template.href = link.link
        link_a_template.innerHTML = link.link
        link_template.class = ""
        link_template.style.display = "block"
        link_template.innerHTML = link.title + ": " + link_template.innerHTML
        link_div.appendChild(link_template);
    }

    if(json.metadata.images.length + json.metadata.media.length + json.metadata.videos.length > 0) {
        var galleryDiv = clone.getElementsByClassName("gallery-container")[0];
        populateGallery(json.metadata, galleryDiv);
    }

    element.parentElement.appendChild(clone);

    const sidebar = document.getElementById("sidebar").getElementsByClassName("navbar-nav")[0];
    const sidebarListItemClone = sidebar.getElementsByClassName("sidebar-list-element")[0].cloneNode(true);
    sidebarListItemClone.style.display = "block";
    const sidebarQuicklink = sidebarListItemClone.getElementsByClassName("sidebar-quicklink")[0];
    sidebarQuicklink.href=`#${clone.id}`
    sidebarQuicklink.innerHTML = json.title;
    sidebar.appendChild(sidebarListItemClone)
}

export function populateGallery(metadata, galleryDiv) {
    galleryDiv.style.display = "flex"; 
    const wrapper = galleryDiv.getElementsByClassName("image-wrapper")[0];
    Promise.all([
        loadHTML(wrapper, "html/image.html"),
        loadHTML(wrapper, "html/video.html"),
        loadHTML(wrapper, "html/media.html")
    ]).then(() => {
        new Gallery(metadata.images, metadata.videos, metadata.media, galleryDiv);
    });
}