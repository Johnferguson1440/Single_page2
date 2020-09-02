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

                $('#users').append(`<div id= "list" class="${id}">${name}'s $hopping Li$t</div`);
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
    
    let list = $('#myTextArea').val();    
    
    update(currentID, list);
})

function update(id, list){
    $.ajax({
        type: 'PATCH',
        url: '/api/shop/'+id,
        connection: 'Keep-Alive',
        data:{'list': list, 'id':id},
        dataType: "text",
        success: function(data){
            var parsed=JSON.parse(data)
            console.log(parsed);
            let list = parsed[0].list;
            let id =parsed[0].userID;
            
            //$('#users').find('#list').remove();
            $('#list').find("#pholder").remove();
            
                //$('#users').append(`<div id= "list" class="${id}">${name} shopping list</div`);
                $('#list').append(`<form id="pholder">
                <textarea id = "myTextArea"
                        rows = "30"
                        cols = "80">${list}</textarea>
              
                        <input  type="button" class="update" value="SAVE LIST"></input></form>`);
            alert("List Saved!")
            }        
    })}

    $('#new').on('click', function(){
        let name= $('#exuser').val();
        let pass=$('#pass').val();
        postUser(name, pass);
        $('#exuser').val("");
        $('#pass').val("");       
    })

    function postUser(name, pass){
        $.ajax({
            type: 'POST',
            url: '/api/shop',
            connection: 'Keep-Alive',
            data:{'name':name, 'pass': pass},
            dataType: 'text',
            success: function(data){
                var parsed =JSON.parse(data);               
                var id = parsed[0].userid;
               
                if(parsed[0].list===null){
                    var list = "Your list";
                }else{
                var list = parsed[0].list;
            }
                if(typeof parsed === "string"){
                    alert(data);
                }else{            
                    
                    $('#users').find('#list').remove();
                    $('#list').find("#update").remove();        
                    
                    $('#users').append(`<div id= "list" class="${id}">${name} $hopping Li$t</div`);
                    $('#list').append(`<form id="pholder">
                    <textarea id = "myTextArea"
                    rows = "30"
                    cols = "80">${list}</textarea>
                    
                    <input  type="button" class="update" value="SAVE LIST"></input></form>`);
                
            }}
        })
    }
})

