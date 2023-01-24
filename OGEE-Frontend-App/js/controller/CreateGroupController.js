
$('#GroupBtn').click(function (event) {
   
    event.preventDefault();
    groupCreate();
function groupCreate(){
    let groupName = $('#group-name').val();
    let groupDescription = $('#group-description').val();
    let groupPicture = $('#group-picture')[0].files[0];
    let groupMembersEmails = [];
    $('.center-placeholder1').each(function () {
        if ($(this).val() !== '') {
            groupMembersEmails.push($(this).val());
        }
    });

    
    $.ajax({
        method: "POST",
        url: `http://localhost:8800/api/group/group-create`,
        async: true,
        contentType: "application/json",
        data : JSON.stringify({
            name: groupName,
            desc: groupDescription,
            image: groupPicture,
            members: groupMembersEmails,
        }),
        beforeSend: function() {
            console.log(JSON.stringify({ name: groupName, desc: groupDescription, image: groupPicture, members: groupMembersEmails }));
        },
        success: function (res) {
            if (res.message === 'success') {
                alert(res.message);
            } else {
                alert(res.message);            
            }
          
        },
        error: function (ob, textStatus, error) {
            console.log("Error: " + error);
            alert("An error occurred while creating the group. Please try again later.");
        },
    });
}

}
);