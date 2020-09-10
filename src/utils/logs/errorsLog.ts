export const errorsLog = (error: any) => {
    if(error.response) { 
        // Request made and server responded
        console.log(error.response.data, error.response.status, error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    return null;
}