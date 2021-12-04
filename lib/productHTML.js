var productHTML = {
    homeHTML: function(list){
        return `
        <!DOCTYPE html>
        <html>
            <head>        
                <style>
                /*서비스 소개*/
                .introduce{
                  background-color: #F6F6F6;
                  width: 1100px;
                  height:200px;
                  text-align: center;
                  margin-bottom: 30px;
                }
                
                /*대여 가능한 물품 목록*/
                .cardlist{
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-around;
                }

                .cardoutter{
                  background-color: #CABBE9;
                  border: 1px solid #CABBE9;
                  border-radius: 5%;
                  box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
                  margin-top: 30px;
                }
        
                .productimg{
                  height: 250px;
                  width: 230px;
                  margin-left: 35px;
                  margin-top: 15px;   
                }
        
                .homeBtn{
                  width: 120px;
                  height: 40px;
                  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                   background-color:#485153;
                }
        
                .btn-borrow{
                  background-color: #A1EAFB;
                  border: 1px solid #A1EAFB;
                  border-radius: 5%;
                  color: white;
                  font-weight: 600;
                  margin-right: 15px;
                }
        
                .btn-reserve{
                  background-color: #FFCEF3;
                  border: 1px solid #FFCEF3;
                  border-radius: 5%;
                  color: white;
                } 
                </style>
            </head>
        
            <body>
              <div class="introduce">
                <h2>서비스 소개하는 글 또는 이미지</h2> 
              </div> 

              <div class="cardlist">
                ${list}
              </div>         
          </body>
        </html>
        `
    },
    list: function(products){
        var i = 0;
        var divs = '';
        var flag = (products.length) % 3; // 빈 공간을 채울 div의 개수를 구하는데 필요.

        while(i < products.length){
            divs += `
            <div class="cardoutter" style="width: 20rem;">
            <img src="img/logo.png" class="productimg" alt="...">
            <div class="card-body">
              <h5 class="card-title">${products[i].productName}</h5>
                <p class="card-text">수량: ${products[i].counts}</p>
                <button href="#" class="btn-borrow">대여</button>
                <button href="#" class="btn-reserve">예약</button>
            </div>
          </div>`;
            i++;
        }
        return divs;
    }
}

module.exports = productHTML;