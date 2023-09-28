
// this function will perform actions when swiping happens
function swipedetect(el, callback){

    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 50, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}

    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }
    , false)

    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }
    , false)

    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if(elapsedTime <= allowedTime){ // first condition for awipe met
            if(Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if(Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }
    , false)
}
// this function will perform actions when swiping happens
var el = document.getElementById('ul_grid')
swipedetect(el, function(swipedir){
    // swipedir contains either "none", "left", "right", "top", or "down"
    if(swipedir =='left'){
        left()
    }
    else if(swipedir =='right'){
        right()
    }
    else if(swipedir =='up'){
        up()
    }
    else if(swipedir =='down'){
        down()
    }
})




// this function will perform actions when keypressing happens 
function keypress(e){

        if(e.keyCode === 37){
           
            left()
        }
        else if(e.keyCode === 38){
           
            up()
        }
        else if(e.keyCode === 39){
            
            right()
        }
        else if(e.keyCode === 40){
           
            down()  
        }
}
// event listner for keypressing
window.addEventListener('keyup',keypress,false)

// this function will create blank(0) board of length n
function create_board(n){
    let grid = [];
    for(var j=0;j<n*n;j++){
        grid.push(0)
    }
    return grid;
}

// Global declarations
var n=4;
var grid_board = create_board(n)

generat_random(grid_board,n);
generat_random(grid_board,n);
var msg=""
// this function will shuffles the grid_board
function generat_random(grid,n){
    let randomx = Math.floor(Math.random()* (n*n))
    if(grid[randomx] === 0){
        grid[randomx]=2;
    }
    else{
        generat_random(grid,n);
    }
}
// this function will check if there is 2048 in the grid_board
function is_2048(grid,n){
    for(let i=0;i<n*n;i++){
        if (grid[i]===2048){
            return "You Win The Game"
        }
    }
}

// this function performs action when user presses right for row
function combine_row_right(grid,n){
    
    for(let i=0;i<n*n -1 ;i++){
        if(grid[i] == grid[i+1]){
            let total = parseInt(grid[i]) + parseInt(grid[i+1])
            grid[i]=0
            grid[i+1]=total
        }
    }
    msg=is_2048(grid,n)
    return grid
}
// this function performs action when user presses left for row
function combine_row_left(grid,n){
   
    for(let i=0;i<n*n -1 ;i++){
        if(grid[i] == grid[i+1]){
            let total = parseInt(grid[i]) + parseInt(grid[i+1])
            grid[i]=total
            grid[i+1]=0
        }
    
    }
    msg=is_2048(grid,n)
    return grid
}

// this function performs action when user presses right for column
function combine_col_right(grid,n){
   
    for(let i=0;i<n*n - n ;i++){
        if(grid[i] == grid[i+n]){
            let total = parseInt(grid[i]) + parseInt(grid[i+n])
            grid[i]=0
            grid[i+n]=total
        }
    
    }
    msg=is_2048(grid,n)
    return grid
}
// this function performs action when user presses left for column
function combine_col_left(grid,n){
    
    for(let i=0;i<n*n -n ;i++){
        if(grid[i] == grid[i+n]){
            let total = parseInt(grid[i]) + parseInt(grid[i+n])
            grid[i]=total
            grid[i+n]=0
        }
    
    }
    msg=is_2048(grid,n)
    return grid
}

// this function modify the grid_board acc to action 
function right_work(arr){
    for(var i=0;i<n*n;i++){

        if(i%4==0){
            let one=arr[i]
            let two =arr[i+1]
            let three = arr[i+2]
            let four = arr[i+3]

            let row = [parseInt(one),parseInt(two),parseInt(three),parseInt(four)]

            let filterrow = row.filter(nums=>nums)
            let missingrow = n  - filterrow.length
            let zeros = Array(missingrow).fill(0)
            let newarr = zeros.concat(filterrow)

            arr[i]=newarr[0]
            arr[i+1]=newarr[1]
            arr[i+2]=newarr[2]
            arr[i+3]=newarr[3]
        }
    }
  
}
// this function modify the grid_board acc to action 
function right(){
    right_work(grid_board)
    generat_random(grid_board,n)
    grid_board=combine_row_right(grid_board,n)
    fill_board_canvas(grid_board,n)
}
// this function modify the grid_board acc to action 
function left_work(arr){
    for(var i=0;i<n*n;i++){

        if(i%4==0){
            let one=arr[i]
            let two =arr[i+1]
            let three = arr[i+2]
            let four = arr[i+3]

            let row = [parseInt(one),parseInt(two),parseInt(three),parseInt(four)]

            let filterrow = row.filter(nums=>nums)
            let missingrow = n  - filterrow.length
            let zeros = Array(missingrow).fill(0)
            let newarr = filterrow.concat(zeros)

            arr[i]=newarr[0]
            arr[i+1]=newarr[1]
            arr[i+2]=newarr[2]
            arr[i+3]=newarr[3]
        }
    }
    
}
// this function modify the grid_board acc to action 
function left(){
    left_work(grid_board)
    generat_random(grid_board,n)
    grid_board = combine_row_left(grid_board,n)
    fill_board_canvas(grid_board,n)
}
// this function modify the grid_board acc to action 
function up_work(grid_board,n){
    for(let i=0;i<n ; i++){
        let one = grid_board[i]
        let two = grid_board[i+(n)]
        let three = grid_board[i+(n*2)]
        let four = grid_board[i+(n*3)]
        
        let column = [parseInt(one),parseInt(two),parseInt(three),parseInt(four)]
        
        let filtercol = column.filter(nums=>nums)
        let missingcol = n  - filtercol.length
        let zeros = Array(missingcol).fill(0)
        let newarr = filtercol.concat(zeros)
        grid_board[i]=newarr[0]
        grid_board[i+(n)]=newarr[1]
        grid_board[i+(n*2)]=newarr[2]
        grid_board[i+(n*3)]=newarr[3]
    }
}
// this function modify the grid_board acc to action 
function up(){
    up_work(grid_board,n)
    generat_random(grid_board,n)
    grid_board = combine_col_left(grid_board,n)
    fill_board_canvas(grid_board,n)
}
// this function modify the grid_board acc to action 
function down_work(grid_board,n){
    for(let i=0;i<n ; i++){
        let one = grid_board[i]
        let two = grid_board[i+(n)]
        let three = grid_board[i+(n*2)]
        let four = grid_board[i+(n*3)]
        
        let column = [parseInt(one),parseInt(two),parseInt(three),parseInt(four)]
        
        let filtercol = column.filter(nums=>nums)
        let missingcol = n  - filtercol.length
        let zeros = Array(missingcol).fill(0)
        let newarr = zeros.concat(filtercol)
        grid_board[i]=newarr[0]
        grid_board[i+(n)]=newarr[1]
        grid_board[i+(n*2)]=newarr[2]
        grid_board[i+(n*3)]=newarr[3]
    }
}
// this function modify the grid_board acc to action 
function down(){
    down_work(grid_board,n)
    generat_random(grid_board,n)
    grid_board=combine_col_right(grid_board,n)
    fill_board_canvas(grid_board,n)
}
// this function reload or restart the game 
function reload_game(){
    location.reload()
}
// this function fill board by adding some values
fill_board_canvas(grid_board,n)
function fill_board_canvas(grid_board,n){
    let li = ``;
   
   
    let zero=0
    for(var i=0;i<n*n+1;i++){
        if(grid_board[i]==0){
            zero+=1
        }
    }
    if(msg){
        document.getElementById("result").innerHTML = `${msg}`
        document.getElementById("ul_grid").style.display="none"
        
    }
    if(zero!=0){
        for(var i=0;i<n*n;i++){
            li+=`<li class="c${grid_board[i]}">${grid_board[i]}</li>`
        }
        document.getElementById("ul_grid").innerHTML=li
    }
    else{
      
        let btn =document.createElement('button')
        btn.innerHTML="RESTART"
        btn.setAttribute('onclick',"reload_game()")
        btn.setAttribute("class","restart_btn")
        let game_over = document.createElement("div")
        game_over.setAttribute("id","game_over")
        let body = document.querySelector("body")
        body.appendChild(game_over)
        let result = document.createElement("div")
        result.setAttribute("id","result")
        game_over.appendChild(result)
        result.innerHTML = `Game Over`
        document.getElementById("ul_grid").style.display="none"
        // document.getElementById("result").style.display="block"
        // document.getElementById("result").appendChild(btn)
        document.getElementById("restart-button").style.display="none"
        result.appendChild(btn)
         
    }
}




// make restart button at bottom of grids
let btn1 =document.getElementById("restart-button")

btn1.setAttribute('onclick',"reload_game()")

//calculate score

//restrict window movement using keyboard
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);













