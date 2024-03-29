let map = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
]

let lap = 1
let mapContainer = document.querySelector("#map")
let gameOver = false
let pvpBtn = document.querySelector("#pvpBtn")
let cpuBtn = document.querySelector("#cpuBtn")
let cpuMode = false
let win = document.querySelector("#win")
let draw = document.querySelector("#draw")

pvpBtn.addEventListener("click", () => {
    document.querySelector("#gameArea").classList.remove("hidden")
    setMode(false)
})

cpuBtn.addEventListener("click", () => {
    document.querySelector("#gameArea").classList.remove("hidden")
    setMode(true)
})



function displayMap() {
    document.querySelector("#menu").classList.add("hidden")
    document.querySelector("#replay").classList.add("hidden")
    mapContainer.innerHTML = ""
    map.forEach((row, index) => {
        const rowContainer = document.createElement("div")
        rowContainer.classList.add("row")
        mapContainer.appendChild(rowContainer)
        row.forEach((cel, indexY) => {
            let cellContainer = document.createElement("div")
            cellContainer.classList.add("cell")
            rowContainer.appendChild(cellContainer)
            cellContainer.addEventListener("click", () => {
                gamePlay(cellContainer, index, indexY)
            }, { once: true })
        });
    });
}

displayMap()

function gamePlay(cellContainer, index, indexY) {
    console.log(lap);
    if (gameOver == false) {
        if (lap % 2 != 0) {
            cellContainer.textContent = "X"
            map[index][indexY] = "X"

            if (cpuMode === false) {
                lap++
            } else {
                lap++
                cpu()
                lap++
            }

            checkWin()

        } else /* if (lap % 2 == 0) */ {
            cellContainer.textContent = "O"
            map[index][indexY] = "O"
            if (cpuMode === false) {
                lap++
            }
            checkWin()
        }
    }
}

function checkWin() {

    for (let i = 0; i < map.length; i++) {
        if (map[i][0] != "" && map[i][0] == map[i][1] && map[i][1] == map[i][2]) {
            if (map[i][0] == "X") {
                win.textContent = " X a gagné !"
            } else {
                win.textContent = " O a gagné !"
            }
            gameOver = true
            document.querySelector("#gameArea").classList.add("hidden")
            document.querySelector("#replay").classList.remove("hidden")
            document.querySelector("#menu").classList.remove("hidden")
            return
        }
        if (map[0][i] != "" && map[0][i] == map[1][i] && map[1][i] == map[2][i]) {
            if (map[0][i] == "X") {
                win.textContent = " X a gagné !"
            } else {
                win.textContent = " O a gagné !"
            }
            gameOver = true
            document.querySelector("#gameArea").classList.add("hidden")
            document.querySelector("#replay").classList.remove("hidden")
            document.querySelector("#menu").classList.remove("hidden")
            return
        }

    }

    if (map[0][0] != "" && map[0][0] == map[1][1] && map[1][1] == map[2][2]) {
        if (map[0][0] == "X") {
            win.textContent = " X a gagné !"
        } else {
            win.textContent = " O a gagné !"
        }
        gameOver = true
        document.querySelector("#gameArea").classList.add("hidden")
        document.querySelector("#replay").classList.remove("hidden")
        document.querySelector("#menu").classList.remove("hidden")
        return
    }
    if (map[0][2] != "" && map[0][2] == map[1][1] && map[1][1] == map[2][0]) {
        if (map[0][2] == "X") {
            win.textContent = " X a gagné !"
        } else {
            win.textContent = " O a gagné !"
        }
        gameOver = true
        document.querySelector("#gameArea").classList.add("hidden")
        document.querySelector("#replay").classList.remove("hidden")
        document.querySelector("#menu").classList.remove("hidden")
        return
    }
    if (lap > 9) {
        gameOver = true
        draw.textContent = " Egalité ! "
        document.querySelector("#gameArea").classList.add("hidden")
        document.querySelector("#replay").classList.remove("hidden")
        document.querySelector("#menu").classList.remove("hidden")
        return
    }

}

function cpu() {

    if (lap < 9) {
        let random = randomize(0, 8)
        while (document.querySelectorAll(".cell")[random].textContent != "") {
            random = randomize(0, 8)
        }
        document.querySelectorAll(".cell")[random].click()
    }

}


function replay() {
    map = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]
    lap = 1
    gameOver = false
    win.textContent = ""
    draw.textContent = ""
    document.querySelector("#cpuBtn").classList.remove("hidden")
    document.querySelector("#pvpBtn").classList.remove("hidden")
    document.querySelector("#gameArea").classList.remove("hidden")



    displayMap()
}

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setMode(isCpuMode) {
    cpuMode = isCpuMode
    replay()

}


