$(document).ready(function() {
//get all users
function getAll(){
    $.ajax({
        type: 'GET',
        url: '/api/users',
        connection: 'Keep-Alive',
        success: function(data){
            
            for(var i = 0; i < data.length; i++){
                let name = data[i].name;
                let id = data[i].id;
                $('.body').append(`<div id= "${id}" class="${name}">${name}</div`)
            }
        }
    })
}

//get single user
$('#login').on('click',function(){
    let name= $('#exuser').val();
    let pass=$('#pass').val();
  
    getOne(name, pass)
    $('#exuser').val("");
    $('#pass').val("");
  })
function getOne( name, pass){
    $.ajax({
        type: 'POST',
        url: '/api/shop/'+name,
        connection: 'Keep-Alive',
        data:{'pass':pass},
        dataType: 'text',
        success: function(data){
            

            var parsed=JSON.parse(data)
            let list = parsed[0].list;
            let id =parsed[0].id;
            
            if(typeof parsed === "string"){
                alert(data);
            }else{            
            
            $('#users').find('#list').remove();
            $('#list').find("#update").remove();

                $('#users').append(`<div id= "list" class="${id}">${name} shopping list</div`);
                $('#list').append(`<form id="pholder">
                <textarea id = "myTextArea"
                        rows = "30"
                        cols = "80">${list}</textarea>
              
                        <input  type="button" class="update" value="SAVE LIST"></input></form>`);
        }}        
    })}

//update users list
$(".body").on('click','.update', function(){   
  
    let currentID= $('#list').attr("class");
    let title = $('#list').val()
    let list = $('#myTextArea').val();    
    update(currentID, list, title)
  })

function update(id, list, name){
    $.ajax({
        type: 'PATCH',
        url: '/api/shop/'+id,
        connection: 'Keep-Alive',
        data:{'list': list, 'id':id},
        dataType: "text",
        success: function(data){
            var parsed=JSON.parse(data)
            let list = parsed[0].list;
            let id =parsed[0].userID;
            console.log(list);
            
            $('#users').find('#list').remove();
            $('#list').find("#update").remove();
            
                $('#users').append(`<div id= "list" class="${id}">${name} shopping list</div`);
                $('#list').append(`<form id="pholder">
                <textarea id = "myTextArea"
                        rows = "30"
                        cols = "80">${list}</textarea>
              
                        <input  type="button" class="update" value="SAVE LIST"></input></form>`);
            }        
    })}

    $('#new').on('click', function(){
        let name= $('#adduser').val();
        let pass=$('#addpass').val();
        postUser(name, pass);
        $('#adduser').val("");
        $('#addpass').val("");
    })

    function postUser(name, pass){
        $.ajax({
            type: 'POST',
            url: '/api/shop',
            connection: 'Keep-Alive',
            data:{'name':name, 'pass': pass},
            dataType: 'text',
            success: function(data){
                
                $('#users').find('#list').remove();
                $('#list').find("#update").remove();        

                $('#users').append(`<div id= "list" class="${id}">${name} shopping list</div`);
                $('#list').append(`<form id="pholder">
                <textarea id = "myTextArea"
                        rows = "30"
                        cols = "80">${list}</textarea>
              
                        <input  type="button" class="update" value="SAVE LIST"></input></form>`);
                
            }
        })
    }
})

