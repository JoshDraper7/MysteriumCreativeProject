window.onload = function() {
    var currentSelected = "NONE";
    document.getElementById("send-to-red").addEventListener("click", async function(event) {
        console.log(currentSelected);
        if (currentSelected != "NONE") {
            let fso = CreateObject("Scripting.FileSystemObject"); 
            let s   = fso.CreateTextFile("send-to-files/red.txt", True);
            s.writeline(currentSelected);
            s.Close();
        } 
    });
    document.getElementById("image1").addEventListener("click", async function(event) {
        console.log("GOOD");
        currentSelected = document.getElementById("image1").src;
    });
    document.getElementById("new-cards-button").addEventListener("click", async function(event) {
        const numImagesAvailable = 1220 //how many photos are total in the collection
        const numItemsToGenerate = 7; //how many photos you want to display
        const imageWidth = 480; //image width in pixels
        const imageHeight = 480; //image height in pixels
        var collectionID = 402488;//928423 //Beach & Coastal, the collection ID from the original url
        const galleryContainer = document.querySelector('.gallery-container')

        function renderGalleryItem(randomNumber, imageNum) {
            fetch(`https://source.unsplash.com/${imageWidth}x${imageHeight}/?sig=${randomNumber}`)
                .then((response) => {
                    console.log(response);
                    document.getElementById(imageNum).src = response.url;
                })
        }
        for (let i = 1; i <= numItemsToGenerate; i++) {
            let randomImageIndex = Math.floor(Math.random() * numImagesAvailable);
            let image = "image" + i;
            renderGalleryItem(randomImageIndex, image);
        }
    });
}
