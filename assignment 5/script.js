

document.getElementById("welcome_btn").onclick=function(){
        document.querySelector("#message").innerHTML="Welcome,student";
        return;
    }

    document.getElementById("check_btn").onclick=function(){
        const message2=document.getElementById("message2");
        var a=prompt("how old are you ?");
        a=Number(a);
        Number();
        confirm("Are you sure you want to continue ?");

        if(confirm){
            switch(true){
                case a>= 18:
              
                    message2.innerHTML="you are allowed !!";
                
                break;

                case a>= 13 || a<=17:
                   
                    message2.innerHTML="you need permision";
                    break;

                case a<13:
                
                    message2.innerHTML="you are too young";
                    break;
                default:
                    console.log("error");
            }
        }
    }

    var counter = document.querySelector("#message");
    var wel=document.querySelector(".counter");
    var c=0; 
    counter.onmousemove = function(){
        wel.innerHTML=c++;
    }


