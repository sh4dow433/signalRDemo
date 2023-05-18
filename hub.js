var baseUrl = "https://localhost:7067/"
var accessToken =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0U3ViamVjdCIsImp0aSI6IjAxYjNjZjZkLTEzM2EtNDkxMi1hMzA0LTk2NjA5MTYzYzM3YyIsImlhdCI6IjUvMTgvMjAyMyA2OjIxOjI2IFBNIiwiVXNlck5hbWUiOiJkYXZpZDEyMyIsIkVtYWlsIjoiZGF2aWQ0MzMxQHlhaG9vLmNvbSIsIklkIjoiMTJhZWRmODItNWM0NS00ODQ4LWJlODEtNjEyYTRjNWIyYmMwIiwiZXhwIjoxNjg0NDQxMjg2LCJpc3MiOiJ0ZXN0SXNzdWVyIiwiYXVkIjoidGVzdEF1ZGllbmNlIn0.w-HYVxeIbQ4Dz6hJGc-DHTs5W7HYAQ_jyw25lfZsAF0"
var hubUrl = baseUrl + 'chatHub';

var hubConnection = new signalR.HubConnectionBuilder().withUrl(hubUrl, { accessTokenFactory: () => accessToken }).build();

// START CONNECTION
async function startConnection() {
    if(hubConnection.state == "Connected") {
        console.log("Already connected");
        return;
    }
    try {
        await hubConnection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};

//ON CLOSE EVENT
hubConnection.onclose(function (event) {
    console.log("conn closed")
    console.log(event)
});
async function stopConnection() {
    if(!hubConnection || hubConnection.state !== "Connected") {
        console.log("Hub Not Connected");
    }
    console.log('SignalR Disconnected.');
    await hubConnection.stop();
}

hubConnection.on("MessageReceived", async function (message) {

    /// CALL A FUNCTION TO UPDATE CHAT's MESSAGE LIST
    console.log(message);
});

hubConnection.on("ChatCreated", async function (chat) {

    /// CALL A FUNCTION TO UPDATE CHAT LIST UI
    console.log(chat);
});