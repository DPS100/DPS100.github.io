export class Gallery {
    constructor(images, DOMid) {
        this.images = images;
        this.DOMid = DOMid;
        this.index = 0;
    }

    changeImage(direction) {
        this.index += direction;

        if(this.index < 0) {
            this.index = this.images.length - 1;
        }
        this.index %= this.images.length;
        document.getElementById(this.DOMid).src = this.images[this.index]
    } 
}