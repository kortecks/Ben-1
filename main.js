let assets = {
    "begin": "videos/begin.mp4",
    "hoho": "videos/hoho.mp4",
    "no": "videos/no.mp4",
    "ooh": "videos/ooh.mp4",
    "yes": "videos/yes.mp4",
}

let videos = {

}

let container = document.querySelector('.container');
let video = document.querySelector('.main-video');

let init = () => {
    container.classList.remove('loading');
    video.src = videos.begin;
    video.play();
};

let loadAssets = () => {
    for (let key in assets) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", assets[key], true);
        xhr.responseType = "blob";
        xhr.onload = () => {
            if (xhr.status === 200) {
                let blob = xhr.response;
                let url = URL.createObjectURL(blob);
                videos[key] = url;
                if (Object.keys(videos).length === Object.keys(assets).length) {
                    init();
                }
            }
        }
        xhr.send();
    }
}

document.querySelectorAll('.video-button').forEach(button => {
    button.addEventListener('click', () => {
        let video = document.createElement('video');
        video.classList.add('overlay-video');
        let src = videos[button.getAttribute('data-video-id')];
        video.src = src;
        container.appendChild(video);
        video.play();
        video.onended = () => {
            video.remove();
        }
    });
});