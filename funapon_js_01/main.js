{
    class GameMaster{ //ゲームの進行用のクラス
      constructor(){
        this.init(); //初期化
  
        this._opponent=new Opponent(DEALER_TAG,JANKEN_TYPE) //相手
  
        //プレイヤー側のじゃんけんのアイコンの表示
        this._player=new Array(3);
         for(let i=0;i<this._player.length;i++){
            this._player[i]=document.createElement("img");
            this._player[i].src="img/"+JANKEN_TYPE[i]+".png";
            PLAYER_TAG.appendChild(this._player[i]);
  
            this._player[i].addEventListener("click",()=>{
              this.click(JANKEN_TYPE[i]); //プレイヤー側のアイコンがクリックされた時に動作するメソッド
            });
        }
  
        this._opponent.shuffleImage(); //相手のアイコンをシャッフルする
  
        RESET_BUTTON.addEventListener("click",()=>{ //リセットボタンが押された時の処理
          this._opponent.shuffleImage();
          this.init();
        });
      }
  
      init(){ //初期化
        RESULT.textContent="";
        RESET_BUTTON.classList.add("hidden");
      }
  
      click(clickType){ //クリックされた時の処理
        if(!RESET_BUTTON.classList.contains("hidden")){ //何度もクリックできないようにする
          return;
        }
  
        clearTimeout(this._opponent._timeoutId);
        RESET_BUTTON.classList.remove("hidden");
        this._opponent.result(clickType);
      }
    }
  
    class Opponent{ //相手のクラス
      constructor(){
        this._img=document.createElement("img");
  
        this._rdNum=Math.floor(Math.random()*JANKEN_TYPE.length);
        this._img.src="img/"+JANKEN_TYPE[this._rdNum]+".png";
        DEALER_TAG.appendChild(this._img);
  
        this._timeoutId;
      }
  
      shuffleImage(){ //ランダムにじゃんけん画像ソースの入れかえ
        this._rdNum=Math.floor(Math.random()*JANKEN_TYPE.length);
        this._img.src="img/"+JANKEN_TYPE[this._rdNum]+".png";
  
        this._timeoutId=setTimeout(()=>{
          this.shuffleImage();
        },20); //50fps
      }
  
      result(clickType){ //じゃんけんの結果判定
        let _dealerType=JANKEN_TYPE[this._rdNum];
  
        switch(clickType){
          case "nyango-gu": //グーをクリックした場合
            if(_dealerType === "nyango-gu"){
              RESULT.textContent="ヒャッハー！";
            }else if(_dealerType === "funa-choki"){
              RESULT.textContent="残念なっしー";
            }else{
              RESULT.textContent="惜しいなっしー";
            }
            break;
  
          case "funa-choki": //チョキをクリックした場合
            if(_dealerType === "nyango-gu"){
              RESULT.textContent="惜しいなっしー";
            }else if(_dealerType === "funa-choki"){
              RESULT.textContent="ヒャッハー！";
            }else{
              RESULT.textContent="残念なっしー";
            }
            break;
  
          case "akuma-par": //パーをクリックした場合
            if(_dealerType === "nyango-gu"){
              RESULT.textContent="惜しいなっしー";
            }else if(_dealerType === "funa-choki"){
              RESULT.textContent="残念なっしー";
            }else{
              RESULT.textContent="ヒャッハー！";
            }
            break;
  
          default:
            console.log("タイプなし");
            break;
        }
      }
    }
  
    const DEALER_TAG=document.querySelector(".dealer"); //タグの取得
    const PLAYER_TAG=document.querySelector(".player"); //タグの取得
    const RESET_BUTTON=document.getElementById("resetButton"); //タグの取得
    const RESULT=document.querySelector(".result"); //タグの取得
  
    const JANKEN_TYPE=["nyango-gu","funa-choki","akuma-par"]; //じゃんけんタイプの配列
  
    const gameMaster=new GameMaster(); //ゲームの進行用のクラスのインスタンスの生成
  }