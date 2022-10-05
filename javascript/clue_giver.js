window.onload = function() {
    const SUPABASE_URL = 'https://pljtblzlnmgdlqohcjfv.supabase.co'
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsanRibHpsbm1nZGxxb2hjamZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5ODYxODUsImV4cCI6MTk4MDU2MjE4NX0.GgUAEWmWNr6d2SOBg0wyzKg_yCJwtMJ6YMTAZ8Rrrug'
    const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    async function loadData() {
        const { data, error } = await _supabase
                .from('Player')
                .select('img_url')
            //     .insert([
            //     { img_url: 'THis is a freaking test', player_type: 'blue'}
            // ])
    
        console.log(data)
        console.log(error)
    }
    async function sendData(url, player) {
        const { data, error } = await _supabase
                .from('Player')
                .insert([
                { img_url: url, player_type: player}
            ])
    
        console.log(data)
        console.log(error)
    }
    loadData();
    
    let currSelected = "NONE";
    
    document.getElementById("image7").addEventListener("click", async function(event) {
        currSelected = "image7";
        console.log(currSelected);
    })
    
    document.getElementById("send-to-yellow").addEventListener("click", async function(event) {
        if (currSelected === "NONE") {
            return;
        }
        sendData(document.getElementById(currSelected).src, "yellow");
    })
    document.getElementById("image6").addEventListener("click", async function(event) {
        currSelected = "image6";
        console.log(currSelected);
    })
    
    document.getElementById("send-to-blue").addEventListener("click", async function(event) {
        if (currSelected === "NONE") {
            return;
        }
        sendData(document.getElementById(currSelected).src, "blue");
    })
    document.getElementById("image5").addEventListener("click", async function(event) {
        currSelected = "image5";
        console.log(currSelected);
    })
    
    document.getElementById("send-to-black").addEventListener("click", async function(event) {
        if (currSelected === "NONE") {
            return;
        }
        sendData(document.getElementById(currSelected).src, "black");
    })
    document.getElementById("image4").addEventListener("click", async function(event) {
        currSelected = "image4";
        console.log(currSelected);
    })
    
    document.getElementById("send-to-white").addEventListener("click", async function(event) {
        if (currSelected === "NONE") {
            return;
        }
        sendData(document.getElementById(currSelected).src, "white");
    })
    document.getElementById("image3").addEventListener("click", async function(event) {
        currSelected = "image3";
        console.log(currSelected);
    })
    
    document.getElementById("send-to-purple").addEventListener("click", async function(event) {
        if (currSelected === "NONE") {
            return;
        }
        sendData(document.getElementById(currSelected).src, "purple");
    })
    document.getElementById("image2").addEventListener("click", async function(event) {
        currSelected = "image2";
        console.log(currSelected);
    })
    
    document.getElementById("send-to-red").addEventListener("click", async function(event) {
        if (currSelected === "NONE") {
            return;
        }
        sendData(document.getElementById(currSelected).src, "red");
    })
    document.getElementById("image1").addEventListener("click", async function(event) {
        currSelected = "image1";
        console.log(currSelected);
    })
    
    document.getElementById("new-cards-button").addEventListener("click", async function(event) {
        let html = "";
        document.getElementById("image-info").innerHTML = html;
        for (let i = 1; i <= 1; i++) {
            let words = "";
            let val = await getWord(words);
            let rand = 999999;
            while (rand > val[0].definition.split(" ").length) {
                rand = Math.floor(Math.random() * (val[0].definition.split(" ").length - 2));
            }
            words += val[0].definition.split(" ")[rand];
            let val2 = await getImage(words);
            if (val2.photos.length === 0) {
                i--;
                continue;
            } else {
                let image = "image" + i;
                document.getElementById(image).src = val2.photos[0].src.medium;
                const newImg = new Object();
                html += "<h2 style= color:white;>Image #" + i + "</h2>";
                html += "<p style= color:white;>Prompt: " + words + "</p>";
                html += "<p style= color:white;>Prompt Word: " + val[0].word + "</p>"
                html += "<p style= color:white;>Prompt Definition: " + val[0].definition + "</p>";
                html += "<p style= color:white;>Prompt Word Pronuciation: " + val[0].pronunciation + "</p>"
                html += "<p style= color:white;>Title: " + val2.photos[0].alt + "</p>";
                html += "<p style= color:white;>Photographer: " + val2.photos[0].photographer + "</p>";
                html += "<p style= color:white;>Average Color: " + val2.photos[0].avg_color + "</p>";
                html += "<p style= color:white;>Source: " + val2.photos[0].src.medium + "</p>";
                html += "<br>";
            }
        }
        document.getElementById('image-info').innerHTML = html;
    });
}


async function getImage(words) {
    const apikey="563492ad6f91700001000001490cdfc841a44afcaf0cbfd375b0cdc7";
    let page_num=1;
    let query=words;
    let search=false;
    return fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page_num}&per_page=${1}&size=medium`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey,
        },
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        return data;
    });
    
}

async function getWord() {
    let url = "https://random-words-api.vercel.app/word";
    return fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        return data;
    });
}

/*
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
*/
