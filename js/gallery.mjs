export class Gallery {
    constructor(images, videos, media, div) {
        this.container = [];
        for(const image of images) {
            this.container.push(new DisplayType(image, "image"));
        }
        for(const video of videos) {
            this.container.push(new DisplayType(video, "video"));
        }
        for(const med of media) {
            this.container.push(new DisplayType(med, "media"));
        }
        this.index = 0;
        const wrapper = div.getElementsByClassName("image-wrapper")[0];
        this.div = div;
        this.image = wrapper.getElementsByClassName("gallery-member-image")[0];
        this.video = wrapper.getElementsByClassName("video-template")[0];
        this.media = wrapper.getElementsByClassName("media-template")[0];
        this.setImageIndex(0);
        const right = div.parentElement.getElementsByClassName("right-arrow")[0]
        const left = div.parentElement.getElementsByClassName("left-arrow")[0]
        if(this.container.length == 1) {
            div.parentElement.getElementsByClassName("dots-container")[0].style = "display: none;"
        } else {
            right.addEventListener('click', () => {this.changeImage(1);})
            left.addEventListener('click', () => {this.changeImage(-1);})
            for (var i = 0; i < this.container.length - 2; i++){
                const cloned_dot = this.div.parentElement.getElementsByClassName("dot")[1].cloneNode();
                this.div.parentElement.getElementsByClassName("dots")[0].appendChild(cloned_dot);
                console.log(this.div.parentElement.getElementsByClassName("dots"));
            }
            for(let i = 0; i < this.container.length; i++) {
                const dot = this.div.parentElement.getElementsByClassName("dot")[i];
                dot.addEventListener('click', () => {this.setImageIndex(i)});
            }
        }
    }

    changeImage(direction) {
        this.setImageIndex(this.index + direction);
    } 

    setImageIndex(index) {
        console.log(`Switching to index ${index}`)
        this.index = index;
        if(this.index < 0) {
            this.index = this.container.length - 1;
        }
        this.index %= this.container.length;
        const toDisplay = this.container[this.index];
        this.div.parentElement.getElementsByClassName("current")[0].classList.toggle("current");
        this.div.parentElement.getElementsByClassName("dot")[this.index].classList.toggle("current");
        this.image.style.display = "none";
        this.video.style.display = "none";
        this.media.style.display = "none";

        switch (toDisplay.type) {
            case "image":
                this.image.style.display = "flex";
                this.image.src = toDisplay.path;
                break;
            case "video":
                this.video.style.display = "flex";
                this.video.src = toDisplay.path;
                break;
            case "media":
                this.media.style.display = "flex";
                this.media.src = toDisplay.path;
                break;
            default:
                break;
        }
    } 
}

class DisplayType {
    constructor(path, type) {
        this.path = path;
        this.type = type;
    }
}