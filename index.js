 import { name } from './example-other-file';
 import { myBankAccounts} from "./user_information";
console.log('Javascriptinizi buraya yazabilirsiniz')


var wrongPasswordErrorCount = 0 ;

setTimeout(() => {
   var sendMoneyBtn = document.getElementById("sendMoneyBtn")
   sendMoneyBtn.disabled = true
  
   createIbanInput();
   createMoneyInput();
   sendMoneyBtn.onclick=function(){
      var price = document.getElementById("price");
      if(price.value<500){
         alert("Başarılı")
      }
      else{
    
        var password =  prompt("Telefonunuza gelen şifreyi girin");
      
        if(password != 1234){
         wrongPasswordErrorCount = wrongPasswordErrorCount +1  ;
           alert("Şifre Yanlış"+" "+wrongPasswordErrorCount);
          
           if(wrongPasswordErrorCount ==3){
              alert("Hesabın bloke edildi")
              window.location.reload()
           }
        }
        else{
           alert("başarılı")
           wrongPasswordErrorCount = 0 ;
           location.reload();
           
        }
      }     
   }
   var selectDiv = document.getElementById("selectDiv");
   var select = document.createElement("select");
   select.id = "accounts";
   
   select.onchange=function(){
      
      var ibanInput = document.getElementById("iban")
      var selectedAccount = document.getElementById("accounts").value

      if(ibanInput.value.length){         
         sendMoneyBtn.disabled = false
      }

  
     var selectedAccountMoney=  myBankAccounts.find(h=>h.iban ==selectedAccount);
     var priceInputValue = document.getElementById("price").value;
     var money = priceInputValue ? Number(priceInputValue) : 0
     if(selectedAccountMoney.bakiye >= money && money > 0)
        sendMoneyBtn.disabled = false;
     else sendMoneyBtn.disabled = true;
   }
   select.className="input"
   selectDiv.append(select);

   
    myBankAccounts.forEach(account => {
         var accountOption = document.createElement("option");
         accountOption.innerText = account.iban+" - "+account.bakiye+"TL";
         accountOption.value = account.iban;
         select.append(accountOption);
      
   })

   

  document.getElementById("accounts").value = ""
  
  
}, 200);


function createIbanInput(){
   var ibanDiv = document.getElementById("ibanDiv")
   
   var ibanInput = document.createElement("input")
   ibanInput.id = "iban"
   ibanInput.className = "input"
   ibanInput.placeholder = "TRXXXXXXXXXXXXXXXXXXXXXXXX"
   ibanInput.onkeyup = function(e) {
      console.log(e);
      var selectedIban = document.getElementById("accounts").value
      var moneyInputValue = document.getElementById("price").value

      var sendMoneyBtn = document.getElementById("sendMoneyBtn")

      if(!e.target.value){
         sendMoneyBtn.disabled = true;
         return;
      }

      if(selectedIban.length && moneyInputValue.length){
         sendMoneyBtn.disabled = false;
      } 
   }

   ibanDiv.append(ibanInput)
}

function createMoneyInput(){
   var moneyDiv = document.getElementById("moneyDiv");
   var moneyInput = document.createElement("input");
   moneyInput.id = "price"
   moneyInput.className = "input";
   moneyInput.placeholder = "0.00TL";
   moneyInput.type = "number";
   moneyInput.onkeyup=function(e){
      var selectedAccount = document.getElementById("accounts").value
      var selectedAccountMoney=  myBankAccounts.find(h=>h.iban ==selectedAccount);
      var money =Number( e.target.value)
      if(selectedAccountMoney.bakiye >= money)
         sendMoneyBtn.disabled = false;
      else {
         sendMoneyBtn.disabled = true;
         alert("Bakiyeniz yetersiz oldugundan işlem gönderme işlemiz yapamazsınız")
      }
   }
   moneyDiv.append(moneyInput);
}

var timeleft = 120;
var downloadTimer = setInterval(function(){
timeleft--;
document.getElementById("countdowntimer").textContent = timeleft;
if(timeleft <= 0)
clearInterval(downloadTimer);
if(timeleft == 0 )
   location.reload(alert("Oturumunuz Sonlanmıştır" ));
},1000);


