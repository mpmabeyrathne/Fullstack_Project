$('#postaddBtn').click(function (event) {
    event.preventDefault();
    
    CreateGroupPost();
function CreateGroupPost(){

    let GroupPostDesc = $('#groupPostDesc').val();
    let GroupPostImage = $('#groupPostImage')[0].files[0];
    let GroupUserName = $('#groupUserName').val();
    let GroupName = $('#groupName').val();

    
    $.ajax({
        method: "POST",
        url: `http://localhost:8800/api/memories/memory-add`,
        async: true,
        contentType: "application/json",
        data: JSON.stringify({
            description: GroupPostDesc,
            image: GroupPostImage,
            username: GroupUserName,
            groupname: GroupName,
        }),
        beforeSend: function() {
            console.log(JSON.stringify({  description: GroupPostDesc, image: GroupPostImage, username: GroupUserName, groupname: GroupName, }));
        },
        success: function (res) {
            if (res.message === 'success') {
                alert("Group Post created successfully!");
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