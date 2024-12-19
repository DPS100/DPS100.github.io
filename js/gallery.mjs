export class Gallery {
    constructor(images, imageElement) {
        this.images = images;
        this.imageElement = imageElement;
        this.index = 0;
        this.changeImage(0);
    }

    changeImage(direction) {
        this.index += direction;

        if(this.index < 0) {
            this.index = this.images.length - 1;
        }
        this.index %= this.images.length;
        this.imageElement.src = this.images[this.index]
    } 
}