$('#createPostBtn').click(function (event) {
    event.preventDefault();
    CreatePost();
function CreatePost(){

    let postDesc = $('#post-text').val();
    let postImage = $('#post-image')[0].files[0];
    let postUserName = $('#postUserName').val();

    const CreatePost = `http://localhost:8800/api/memories/p-memory`;
    $.ajax({
        method: "POST",
        url: CreatePost,
        dataType: 'Json',
        async: true,
        contentType: "application/json",
        data: JSON.stringify({
            description: postDesc,
            image: postImage,
            user: postUserName
        }),
        success: function (res) {
            if (res.message === 'success') {
                alert("Post created successfully!");
            } else {
                alert("Alert: " + res.message);
               
            }
           
        },
        error: function (ob, textStatus, error) {
            console.log("Error: " + error);
            alert("An error occurred while creating the Post. Please try again later.");
        }
    });
}

});

