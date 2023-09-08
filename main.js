console.warn('!')

const processor = {
    doLoad: function doLoad() {
        this.video = document.getElementById('video');
        this.c1 = document.getElementById('c1');
        this.ctx1 = this.c1.getContext('2d');
        this.c2 = document.getElementById('c2');
        this.ctx2 = this.c2.getContext('2d');
        let self = this;
        this.video.addEventListener('play', function() {
            console.warn(self.video.videoWidth, self.video.videoHeight)
            self.width = self.video.videoWidth;
            self.height = self.video.videoHeight;
            self.timerCallback();
        }, false);
    },
  
    timerCallback: function timerCallback() {
        if (this.video.paused || this.video.ended) {
            return;
        }
        this.computeFrame();
        let self = this;
        // setTimeout(function() {
        //     self.timerCallback();
        // }, 0);
        requestAnimationFrame(self.timerCallback.bind(self))
    },
  
    computeFrame: function computeFrame() {
        this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
        let l = frame.data.length / 4;
        let row = frame.data.length / this.width;

        // for (let i = 0; i < l; i++) {
        //     let r = frame.data[i * 4 + 0];
        //     let g = frame.data[i * 4 + 1];
        //     let b = frame.data[i * 4 + 2];
        //     if (g > 100 && r > 100 && b < 43) frame.data[i * 4 + 3] = 0;
        // }
        // for(let i = 0; i < l; i++) {
        //     if(i < l/2)
        //         frame.data[i * 4 + 3] = 100
        // }
        for(let y = 1; y <= this.height; y++) {
            for(let x = 1; x <= this.width; x++) {
                if(y > 500) {
                    const i = this.getPixelIndex(x, y)
                    const copyIdx = this.getPixelIndex(x, 500)

                    frame.data[i + 0] = frame.data[copyIdx + 0]
                    frame.data[i + 1] = frame.data[copyIdx + 1]
                    frame.data[i + 2] = frame.data[copyIdx + 2]
                    frame.data[i + 3] = frame.data[copyIdx + 3]
                }
            }
        }



        this.ctx2.putImageData(frame, 0, 0);
        return;
    },

    getPixelIndex: function getPixel(x, y) {
        const tops = (y - 1) * this.width * 4;
        const lefts = (x - 1) * 4 + 1;
        const index = tops + lefts -1;
        return index
    }
}

    

 