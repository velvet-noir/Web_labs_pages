class Ajax {
    post(url, callback) {
        axios.post(url)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                console.error('Error occurred:', error);
                callback(null);
            });
    }
}

export const ajax = new Ajax();
