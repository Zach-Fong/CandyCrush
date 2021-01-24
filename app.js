document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 8
    const squares = []
    let score = 0
    // var soundEffect = document.getElementById("sound")
    // var sound = new Audio("C:/Users/kille/Desktop/JavaScript/CandyCrush")

    let firstColor, secondColor

    const candyColors = ['url(images/red-candy.png)', 'url(images/yellow-candy.png)', 'url(images/green-candy.png)', 'url(images/purple-candy.png)', 'url(images/black-candy.png)', 'url(images/blue-candy.png)']

    //create board
    function createBoard(){
        for(let a=0; a<width*width; a++){
            const square = document.createElement('div')
            let randomColor = Math.floor(Math.random() * candyColors.length)
            square.setAttribute('draggable', true)
            square.setAttribute('id',  a)
            square.style.backgroundImage = candyColors[randomColor];
            grid.appendChild(square)
            squares.push(square);
        }
    }
    createBoard()


    //drag the candies
    let colorBeingDragged, colorBeingReplaced, squareIdBeingDragged, squareIdBeingReplaced
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart(){
        colorBeingDragged = this.style.backgroundImage
        squareIdBeingDragged = parseInt(this.id)
        // firstColor = colorBeingDragged
        // console.log(this.id, 'dragStart')
    }

    function dragEnd(){
        let valid = false;
        for(a=0; a<width; a++){
            for(b=0; b<width-2; b++){
                if(squares[a*width + b + 1].style.backgroundImage === squares[a*width + b].style.backgroundImage && squares[a*width + b + 2].style.backgroundImage === squares[a*width + b].style.backgroundImage){
                    valid = true;
                    break
                }
            }
        }

        for(a=0; a<width-2; a++){
            for(b=0; b<width; b++){
                if(squares[(a+1)*width + b].style.backgroundImage === squares[a*width + b].style.backgroundImage && squares[(a+2)*width + b].style.backgroundImage === squares[a*width + b].style.backgroundImage){
                    valid = true
                    break
                }
            }
        }

        if(!valid){
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
            squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced   
            valid = true
            // sound.currentTime = 0
            // try{
            //     sound.play()
            // }catch(e){
            //     console.log("DIDNT WORK")
            // }
            return
        }



        let validMoves = [squareIdBeingDragged + 1, squareIdBeingDragged - 1, squareIdBeingDragged + width, squareIdBeingDragged - width]
        let validMove = validMoves.includes(squareIdBeingReplaced)
        if(squareIdBeingReplaced && validMove){
            squareIdBeingReplaced = null //reseting values after dropping
        }
        else if(squareIdBeingReplaced && !validMove){
            squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        }
        else{
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        }

        checkRowForFive()
        checkRowForFour()
        checkRowForThree()

        checkColForFive()
        checkColForFour()
        checkColForThree()

        console.log(score)
    }

    function dragOver(e){
        e.preventDefault()
        // console.log('dragOver')
    }

    function dragEnter(e){
        e.preventDefault()
        // console.log('dragEnter')
    }

    function dragLeave(){
        // console.log('dragLeave')
    }

    function dragDrop(){
        // secondColor = this.style.backgroundImage
        colorBeingReplaced = this.style.backgroundImage
        squareIdBeingReplaced = parseInt(this.id)
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced

        this.style.backgroundImage = colorBeingDragged
        console.log(this.id, 'dragDrop')
    }

    
    function moveDown(){
        for(a=0; a<width; a++){
            if(squares[a].style.backgroundImage === ''){
                squares[a].style.backgroundImage = candyColors[Math.floor(Math.random() * candyColors.length)]
            }
        }
        
        for(a=0; a<56; a++){
            if(squares[a + width].style.backgroundImage === ''){
                squares[a + width].style.backgroundImage = squares[a].style.backgroundImage
                squares[a].style.backgroundImage = ''
            }
        }
    }


    //check matches
    function checkRowForThree(){
        for(a=0; a<width; a++){
            for(let b=0; b<width-2; b++){
                if(squares[a*width + b].style.backgroundImage != '' && squares[a*width + b+1].style.backgroundImage === squares[a*width + b].style.backgroundImage && squares[a*width + b+2].style.backgroundImage === squares[a*width + b].style.backgroundImage){
                    squares[a*width + b].style.backgroundImage = ''
                    squares[a*width + b+1].style.backgroundImage = ''
                    squares[a*width + b+2].style.backgroundImage = ''
                    score += 3
                    scoreDisplay.innerHTML = score
                }
            }
        }
    }

    function checkRowForFour(){
        for(a=0; a<width; a++){
            for(let b=0; b<width-3; b++){
                if(squares[a*width + b].style.backgroundImage != '' && squares[a*width + b+1].style.backgroundImage === squares[a*width + b].style.backgroundImage && squares[a*width + b+2].style.backgroundImage === squares[a*width + b].style.backgroundImage && squares[a*width + b+3].style.backgroundImage === squares[a*width + b].style.backgroundImage){
                    squares[a*width + b].style.backgroundImage = ''
                    squares[a*width + b+1].style.backgroundImage = ''
                    squares[a*width + b+2].style.backgroundImage = ''
                    squares[a*width + b+3].style.backgroundImage = ''
                    score += 4
                    scoreDisplay.innerHTML = score
                }
            }
        }
    }

    function checkRowForFive(){
        for(a=0; a<width; a++){
            for(let b=0; b<width-4; b++){
                if(squares[a*width + b].style.backgroundImage != '' && squares[a*width + b+1].style.backgroundImage === squares[a*width + b].style.backgroundImage && squares[a*width + b+2].style.backgroundImage === squares[a*width + b].style.backgroundImage && squares[a*width + b+3].style.backgroundImage === squares[a*width + b].style.backgroundImage && squares[a*width + b+4].style.backgroundImage === squares[a*width + b].style.backgroundImage){
                    squares[a*width + b].style.backgroundImage = ''
                    squares[a*width + b+1].style.backgroundImage = ''
                    squares[a*width + b+2].style.backgroundImage = ''
                    squares[a*width + b+3].style.backgroundImage = ''
                    squares[a*width + b+4].style.backgroundImage = ''
                    score += 5
                    scoreDisplay.innerHTML = score
                }
            }
        }
    }

    function checkColForThree(){
        for(a=0; a<width-2; a++){
            for(b=0; b<width; b++){
                if(squares[a*width + b].style.backgroundImage != '' && squares[(a+1)*width + b].style.backgroundImage === squares[a*width + b].style.backgroundImage && squares[(a+2)*width + b].style.backgroundImage === squares[a*width + b].style.backgroundImage){
                    squares[a*width + b].style.backgroundImage = ''
                    squares[(a+1)*width + b].style.backgroundImage = ''
                    squares[(a+2)*width + b].style.backgroundImage = ''
                    score += 3
                    scoreDisplay.innerHTML = score
                }
            }
        }
    }

    function checkColForFour(){
        for(a=0; a<width-3; a++){
            for(b=0; b<width; b++){
                if(squares[a*width + b].style.backgroundImage != '' && squares[(a+1)*width + b].style.backgroundImage === squares[a*width + b].style.backgroundImage && squares[(a+2)*width + b].style.backgroundImage === squares[a*width + b].style.backgroundImage && squares[(a+3)*width + b].style.backgroundImage === squares[a*width + b].style.backgroundImage){
                    squares[a*width + b].style.backgroundImage = ''
                    squares[(a+1)*width + b].style.backgroundImage = ''
                    squares[(a+2)*width + b].style.backgroundImage = ''
                    squares[(a+3)*width + b].style.backgroundImage = ''
                    score += 4
                    scoreDisplay.innerHTML = score
                }
            }
        }
    }

    function checkColForFive(){
        for(a=0; a<width-4; a++){
            for(b=0; b<width; b++){
                if(squares[a*width + b].style.backgroundImage != '' && squares[(a+1)*width + b].style.backgroundImage === squares[a*width + b].style.backgroundImage && squares[(a+2)*width + b].style.backgroundImage === squares[a*width + b].style.backgroundImage && squares[(a+3)*width + b].style.backgroundImage === squares[a*width + b].style.backgroundImage && squares[(a+4)*width + b].style.backgroundImage === squares[a*width + b].style.backgroundImage){
                    squares[a*width + b].style.backgroundImage = ''
                    squares[(a+1)*width + b].style.backgroundImage = ''
                    squares[(a+2)*width + b].style.backgroundImage = ''
                    squares[(a+3)*width + b].style.backgroundImage = ''
                    squares[(a+4)*width + b].style.backgroundImage = ''
                    score += 5
                    scoreDisplay.innerHTML = score
                }
            }
        }
    }

    checkRowForFive()
    checkRowForFour()
    checkRowForThree()

    checkColForFive()
    checkColForFour()
    checkColForThree()

    window.setInterval(function(){
        moveDown()
        checkRowForFive()
        checkRowForFour()
        checkRowForThree()

        checkColForFive()
        checkColForFour()
        checkColForThree()
    }, 150)
    console.log(score)
})