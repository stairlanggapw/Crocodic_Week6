const user_URL = 'https://jsonplaceholder.typicode.com/users/1';
const post_URL = 'https://jsonplaceholder.typicode.com/posts?userId=1';

function renderData(user, posts, methodTitle){
    document.getElementById("status").innerText = `Berhasil memuat data menggunakan method: ${methodTitle}`;

    const singleUser = Array.isArray(user) ? user[0] : user;
    document.getElementById("userName").innerText = singleUser.name;
    document.getElementById("userEmail").innerText = singleUser.email;
    document.getElementById("userCity").innerText = singleUser.address ? singleUser.address.city : '-';

    const postsContainer = document.getElementById("userPosts");
    postsContainer.innerHTML = '';

    const postsArray = (Array.isArray(posts) ? posts : [posts]).slice(0, 5);
    postsArray.forEach(post => {
        const li = document.createElement("li");
        li.innerText = post.title;
        postsContainer.appendChild(li);
    });
}

function renderError(error, methodTitle) {
    console.error(`Error[${methodTitle}]:`, error);
    document.getElementById("status").innerText = `Gagal memuat data (${methodTitle}) : ${error.message}`;     
}

function customFetchCallback(url, callback, errorCallback){
    fetch(url) .then(response => {
        if (!response.ok) throw new Error("Gagal mengambil data");
        return response.json();
    })
    .then(data => callback(data))
    .catch(err => errorCallback(err));
}

function loadWithCallback() {
    document.getElementById("status").innerText = "Memuat via callback";

    customFetchCallback(user_URL, function(user) {
        customFetchCallback(post_URL, function(posts) {
            renderData(user, posts, "Callback");
        }, function(err) {
            renderError(err, "Callback - Posts");
        });
    }, function(err) {
        renderError(err, "Callback - User");
    });
}

function loadWithPromise() {
    document.getElementById("status").innerText = "Memuat via Promise...";
    let userData;

    fetch(user_URL)
        .then(response => {
            if (!response.ok) throw new Error("Gagal mengambil data User");
            return response.json();
        })
        .then(user => {
            userData = user;
            return fetch(post_URL);
        })
        .then(response => {
            if (!response.ok) throw new Error("Gagal mengambil data Posts");
            return response.json();
        })
        .then(posts => {
            renderData(userData, posts, "Promise Chaining");
        })
        .catch(err => {
            renderError(err, "Promise");
        });
}

async function loadWithAsyncAwait() {
    document.getElementById("status").innerText = "Memuat via Async/Await...";
    
    try {
        console.log("Fetching data from API 1...");
        const response1 = await fetch(user_URL);
        if (!response1.ok) throw new Error("Gagal mengambil data Users");
        const data1 = await response1.json();
        console.log("Data API 1:", data1);

        console.log("Fetching data from API 2...");
        const response2 = await fetch(post_URL);
        if (!response2.ok) throw new Error("Gagal mengambil data Posts");
        const data2 = await response2.json();
        console.log("Data API 2:", data2);

        renderData(data1, data2, "Async/Await");

    } catch (error) {
        console.error("An error occurred:", error);
        renderError(error, "Async/Await");
    }
}