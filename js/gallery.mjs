export class Gallery {
    constructor(images, videos, media, div) {
        // TODO disable switching and hide arrows with only one member
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
        this.image = wrapper.getElementsByClassName("gallery-member-image")[0];
        this.video = wrapper.getElementsByClassName("video-template")[0];
        this.media = wrapper.getElementsByClassName("media-template")[0];
        this.changeImage(0);
        div.getElementsByClassName("right-arrow")[0].addEventListener('click', () => {this.changeImage(1);})
        div.getElementsByClassName("left-arrow")[0].addEventListener('click', () => {this.changeImage(-1);})
    }

    changeImage(direction) {
        this.index += direction;
        if(this.index < 0) {
            this.index = this.container.length - 1;
        }
        this.index %= this.container.length;
        const toDisplay = this.container[this.index];
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