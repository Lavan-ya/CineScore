var API = (() => {
    // create an array
    var login =() =>{
        const val = document.getElementById('username').value
        if(val === ""){
            alert("Enter username");
        }
        else{
            try{
                fetch("http://192.168.1.220:8080/api/v1/login",{
                    method: 'POST',
                    body: JSON.stringify({
                        username:val
                    }),
                    headers:{
                        'Accept':'application/json',
                        'content-Type':'application/json'
                    }
                }).then(resp => resp.json())
                .then(data=>{
                    var jwtToken = data.token                  
                    localStorage.setItem('jwtToken',jwtToken)
                })
                var confirmationMessage = "Logged in successfully ";
                alert(confirmationMessage);
               }catch (e){
                console.log(e);
                console.log('-------------------------------');
               }
        }     
           return false;
    }

   var createFilm = () =>{
    const value = document.getElementById('add').value;
    const rating = document.getElementById('add1').value;
    if(value === ""){
        alert("Enter film values!!!!!!!!!!!!!!!");
    } else if( rating === "" ){
        alert("Enter rating values!!!!!!!!!!!!!!!");
    }
    else if (isNaN(parseFloat(rating))) {
        alert("Rating must be a valid number!");
    }
    else{
    //filmList.push(value);
    try{
        var jwtToken = localStorage.getItem('jwtToken')
        fetch("http://192.168.1.220:8080/api/v1/films",{
            method: 'POST',
            body: JSON.stringify({
                name: value,
                rating : rating 
            }),
            headers:{
                'Accept':'application/json',
                'content-Type':'application/json',
                'Authorization':'Bearer ' + jwtToken
            }
        }).then(resp=>{
            setTimeout(function (){
                if(resp.status === 200){
                var confirmationMessage = "Film added successfully";
                alert(confirmationMessage);
                }else{
                    alert("Error in posting the values - Authorization Error 403")
                }
            },0)
        })
    //var confirmationMessage = "Film added successfully :)";
    //alert(confirmationMessage);
       }catch (e){
        console.log(e);
        console.log('-------------------------------');
       }
    document.getElementById('add').value=" ";
    document.getElementById('add1').value=" ";
    }
    return false;
   };
var status = false;
   var getFilms = () => {
    try{
        fetch("http://192.168.1.220:8080/api/v1/films",{
            method: 'GET',
            headers:{
                'Accept':'application/json',
                'content-Type':'application/json'
            }
        }).then(resp=>resp.json())
        .then(results=>{
            results.forEach(data =>{
        var filmtablelist=document.getElementById('list');
        filmtablelist.style.display = 'block';
        var tablebody = document.getElementById('tablebody');
        var cell = document.createElement('td');
        var ratingcell = document.createElement('td');
        var row = document.createElement('tr');
        cell.textContent=data.name;
        console.log(data.name);
        ratingcell.textContent=data.rating;
        row.appendChild(cell);
        row.appendChild(ratingcell);
        tablebody.appendChild(row);
        status="true"
            });
        });
    }catch (e){
        console.log(e);
        console.log('--------------------');
    }
    return false;
   };
   return {
    createFilm,
    getFilms,
    login
 }
})();