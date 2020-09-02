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
  console.log(name);
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
            let id =parsed[0].userid;
            
            if(typeof parsed === "string"){
                alert(data);
            }else{            
            
            $('#users').find('#list').remove();
            $('#list').find("#rows").remove();
            $('#list').find(".update").remove();
            $('#list').find(".add").remove();

            $('#users').append(`<div id= "list" class="${id}">${name}'s $hopping Li$t<table id="rows"  cellspacing="4" width="25%">
            <thead>
               <tr><th><input type="checkbox" name="select_all" value="1" id="example-select-all"></th><th>ITEM</th></tr>                      
                </thead><tbody id="tabody"></tbody></table></div>`);  
                JSON.stringify(list);
                let split = list.split(",");
                
                for(var i =0; i<split.length; i++){       
            
            $('#tabody').append(`               
                   <tr id="${split[i]}"><th class="${split[i]}"><input type="checkbox" name="row" class="row"></input></th><td><input type="text" class="listdata" value="${split[i]}"></td></tr>`);
                }
            $('#list').append(`<input  type="button" class="update" value="SAVE LIST"></input></form>`);
            $('#list').append(`<input  type="button" class="add" value="ADD ROW"></input></form>`);
        }}        
    })}

//update users list
$(".body").on('click','.update', function(){   
    let currentID= $('#list').attr("class");
    let list= [];

    $("#rows input[type='checkbox']:checked").closest("tr").remove();
  
    $('#users .listdata').each(function(){
        
        list.push($(this).val());
        
    });  
    let strg= list.join();

    update(currentID, strg);
})

function update(id, list){
    console.log(list);
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
            $('#rows').find("#tabody").remove();
            //$('#tabody').find(".listdata").remove();
            $('#list').find(".update").remove();
            $('#list').find(".add").remove();
            
           $('#rows').append(`<tbody id="tabody"></tbody>`);
            JSON.stringify(list);
            let split = list.split(",");
            
            for(var i =0; i<split.length; i++){

            $('#tabody').append(`               
                   <tr id="${split[i]}"><th class="${split[i]}"><input type="checkbox" name="row" class="row"></input></th><td><input type="text" class="listdata" value="${split[i]}"></td></tr>`);

        }
            $('#list').append(`<input  type="button" class="update" value="SAVE LIST"></input></form>`);
            $('#list').append(`<input  type="button" class="add" value="ADD ROW"></input></form>`);
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
                var list = "Your list";
                
            
                if(typeof parsed === "string"){
                    alert(data);
                }else{            
                    $('#users').find('#list').remove();
                    $('#list').find("#rows").remove();
                    $('#list').find(".update").remove();
                    $('#list').find(".add").remove();
        
                    $('#users').append(`<div id= "list" class="${id}">${name}'s $hopping Li$t<table id="rows"  cellspacing="4" width="25%">
                    <thead>
                       <tr id= ${list}><th class="${list}"><input type="checkbox" name="select_all" value="1" id="example-select-all"></th><th>ITEM</th></tr>                      
                        </thead><tbody id="tabody"></tbody></table></div>`);
                        $('#tabody').append(`               
                        <tr><th><input type="checkbox" name="row" class="row"></input></th><td><input type="text" class="listdata" value=${list}></td></tr>`);
     
             
                 $('#list').append(`<input  type="button" class="update" value="SAVE LIST"></input></form>`);
                 $('#list').append(`<input  type="button" class="add" value="ROW"></input></form>`);
            }}
        })
    }
    //button event to add new row
    $(".body").on('click','.add',function(){
        $('#tabody').append(`               
        <tr><th><input type="checkbox" name="row" class="row"></input></th><td><input type="text" class="listdata" value=""></td></tr>`);
    })
})


