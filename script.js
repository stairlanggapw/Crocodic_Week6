const user_URL = 'https://jsonplaceholder.typicode.com/users';
const post_URL = 'https://jsonplaceholder.typicode.com/posts';

async function fetchSequentially() {
    try {
        console.log('Fetching data from API 1...');
        const data1 = await fetch('https://jsonplaceholder.typicode.com/user/1')
            .then(response => response.json());
        console.log('Data API 1:', data1);

        console.log('Fetching data from API 2...');
        const data2 = await fetch('https://jsonplaceholder.typicode.com/user/2')
            .then(response => response.json());
        console.log('Data API 2:', data2);

    } catch(error){
        console.error('Error fetching data:', error);
    }
}
fetchSequentially();