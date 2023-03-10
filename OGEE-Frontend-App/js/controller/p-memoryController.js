let tempDescData = null;
let tempDescData2 = null;
let tempDescData3 = null;

let groupName = null;
let groupName2 = null;
let groupName3 = null;
let groupName4 = null;

let groupDesc = null;
let groupDesc2 = null;
let groupDesc3 = null;
let groupDesc4 = null;

$('#GroupBtn').click(function () {

    let group_name = $('#group-name');
    let group_desc = $('#group-description');

    if (group_name === null || group_name.length === 0){
        alert("Please enter group name!");
        $('#group_name').css({
            'border': '2px solid red'
        });
    }else {
        $('#group_name').css({
            'border': '2px solid #0D6EFD '
        });
        if (group_desc === null || group_desc.length === 0){
            alert("Please enter group desc!");
            $('#group_desc').css({
                'border': '2px solid red'
            });
        }else{
            if (groupName === null){
                $('#group_desc').css({
                    'border': '2px solid #0D6EFD '
                });

                $("#GROUP_TITLE_3").html(group_name);
                $("#GROUP_DESC_3").html(group_desc);

                $('#group_content_3').css({
                    'display': 'block'
                });
                alert("Group Created  Success!");

                groupName = group_name;
                groupDesc = group_desc;
            }
        }
    }


});

$('#createMemoryBtn').click(function (event) {
    event.preventDefault();

    CreatePost();

    let postDesc = $('#post-text').val();
    let postUserName = $('#postUserName').val();

    if (postDesc === null || postDesc.length === 0) {
        alert("Please enter post mind!");
        $('#post-text').css({
            'border': '2px solid red'
        });
    } else {
        $('#post-text').css({
            'border': '2px solid #0D6EFD '
        });
        if (postUserName === null || postUserName.length === 0) {
            alert("Please enter post username!");
            $('#postUserName').css({
                'border': '2px solid red'
            });
        } else {
            if (tempDescData === null) {
                $('#postUserName').css({
                    'border': '2px solid #0D6EFD '
                });
                var setImage2 = document.getElementById("post_image_2");
                var setImage1 = document.createElement("img");
                setImage1.src = "../assets/images/feed-2.jpg";
                setImage2.appendChild(setImage1);
                $('#post_content2').css({
                    'display': 'block'
                });
                alert("Post Upload Success!");

                tempDescData = postDesc;

            } else {
                let postDesc2 = $('#post-text').val();

                if (tempDescData2 === null && tempDescData2 !== tempDescData && tempDescData !== postDesc2) {

                    var setImage3 = document.createElement("img");
                    var setImage4 = document.getElementById("post_image_3");
                    setImage3.src = "../assets/images/feed-3.jpg";
                    setImage4.appendChild(setImage3);
                    $('#post_content3').css({
                        'display': 'block'
                    });
                    alert("Post Upload Success!");

                    tempDescData2 = postDesc2;
                } else {
                    let postDesc3 = $('#post-text').val();
                    if (tempDescData3 === null && tempDescData3 !== tempDescData2 && tempDescData2 !== postDesc3) {

                        var setImage5 = document.createElement("img");
                        var setImage6 = document.getElementById("post_image_4");
                        setImage5.src = "../assets/images/feed-4.jpg";
                        setImage6.appendChild(setImage5);
                        $('#post_content4').css({
                            'display': 'block'
                        });
                        alert("Post Upload Success!");

                        tempDescData2 = postDesc2;
                    } else {

                    }
                }
            }
        }
    }

    function CreatePost() {


    let file = event.target.value;


    let postImage = document.getElementById('post-image');


    postImage.innerHTML = file;

    let postDesc = $('#post-text').val();
    let postUserName = $('#postUserName').val();

    alert(postImage.innerHTML)

    $.ajax({
        method: "POST",
        url: `http://localhost:8800/api/memories/p-memory`,
        async: true,
        contentType: "application/json",
        data: JSON.stringify({
            description: postDesc,
            image: postImage,
            user: postUserName
        }),
        beforeSend: function () {
            console.log(JSON.stringify({ description: postDesc, image: postImage, user: postUserName }));
        },
        success: function (res) {
            if (res.message === 'success') {
                alert("Post created successfully!");
            } else {
                alert("Alert: " + res.message);

            }

        },
        error: function (ob, textStatus, error) {
            console.log("Error: " + error);

        }
    });
    }

});

