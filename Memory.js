    //Splash screen

    document.querySelector(".splash-screen span").onclick = function() {
            'use strict';
            var inputName = window.prompt("Enter name: ");
            if (inputName.trim() == null || inputName.trim() == "") {
                document.querySelector(".info-container .name span").textContent = "User";
            } else {
                document.querySelector(".info-container .name span").textContent = inputName;
            };
            document.querySelector(".splash-screen").style.display = "none";
        }
        //Shuffling process
    var mins = 0,
        secs = 0;
    var allBlocks = document.querySelector(".memory-game-blocks");
    var cureentBlocks = Array.from(allBlocks.children);
    let sortedItems = Array.from(cureentBlocks.keys());
    var duration = 1000;
    var restartGameVar = document.querySelector(".restart img ");
    var pauseGame = document.getElementById("pause");
    var resumeGame = document.getElementById("resume");
    var clockCounter = document.getElementById("timer");
    var timerInitialiazer = 0;
    var startCounting;
    var movesCount = document.querySelector(".tries span");
    var movesCounter = 0;
    movesCount.textContent = ("0" + movesCounter).slice(-2);

    function shufflingArray(sortedItems) {
        var ctr = sortedItems.length;


        while (ctr > 0) {
            let index = Math.floor(Math.random() * ctr);
            ctr--;
            [sortedItems[ctr], sortedItems[index]] = [sortedItems[index], sortedItems[ctr]];

        }
    }

    function applyOdrer() {
        'use strict';
        shufflingArray(sortedItems)
        cureentBlocks.forEach((v, ind) => v.style.order = sortedItems[ind]);
    }

    window.onload = applyOdrer;

    for (let c = 0; c < cureentBlocks.length; c++) {
        cureentBlocks[c].addEventListener("click", function() {
            this.classList.add("flipped");
            var flipNumber = cureentBlocks.filter(v => v.classList.contains("flipped"));
            console.log(flipNumber);

            if (flipNumber.length == 2) {
                movesCounter++
                movesCount.textContent = ("0" + movesCounter).slice(-2);
                if (timerInitialiazer == 0) {

                    timerCounter();
                    pauseGame.classList.remove("displayImage");
                    resumeGame.classList.add("displayImage");
                }

                stopClicking();
                checkMatching(flipNumber[0], flipNumber[1]);

            }
        })
    };

    function stopClicking() {
        allBlocks.classList.add("no-clicking");
        setTimeout(() => {
            allBlocks.classList.remove("no-clicking")
        }, duration + 30);
    }


    function checkMatching(p1, p2) {
        if (p1.dataset.type == p2.dataset.type) {

            p1.classList.add("matched");
            p2.classList.add("matched");
            document.getElementById("success").play();
            setTimeout(_ => {
                p1.classList.remove("flipped");
                p2.classList.remove("flipped");

            }, duration)
        } else {
            p1.classList.add("shaker");
            p2.classList.add("shaker");
            document.getElementById("wrong").play();
            setTimeout(_ => {
                    p1.classList.remove("flipped");
                    p2.classList.remove("flipped");
                    p1.classList.remove("shaker");
                    p2.classList.remove("shaker");
                }

                , duration)

        }
    }

    function restartGame() {
        'use strict';
        cureentBlocks.forEach(t => t.classList.remove("matched", "flipped"));
        applyOdrer();
        movesCounter = 0;
        movesCount.textContent = ("0" + movesCounter).slice(-2);
    }
    restartGameVar.onclick = restartGame;

    function timerCounter() {

        clearInterval(startCounting)
        startCounting = setInterval(function() {
                timerInitialiazer = 1;
                mins = ("0" + mins).slice(-2);
                secs = ("0" + secs).slice(-2);

                clockCounter.textContent = mins + ":" + secs;
                secs++
                if (secs >= 60) {
                    secs = secs - 60;

                    mins++;
                    mins = ("0" + mins).slice(-2);
                    secs = ("0" + secs).slice(-2);
                    clockCounter.classList.add("alert");
                    setTimeout(function() { clockCounter.classList.remove("alert"); }, 2000)
                }
                if (secs >= 30) {
                    clockCounter.classList.add("alert");
                    setTimeout(function() { clockCounter.classList.remove("alert"); }, 2000)
                }


                restartGameVar.addEventListener("click", function() {
                    clearInterval(startCounting);
                    timerInitialiazer = 0;
                    mins = 0;
                    secs = 0;
                    clockCounter.textContent = "0" + mins + ":" + "0" + secs;
                    allBlocks.classList.remove("no-clicking");
                    pauseGame.classList.remove("displayImage");
                    resumeGame.classList.add("displayImage");
                })
                pauseGame.addEventListener("click", function() {
                    clearInterval(startCounting);
                    timerInitialiazer = 1;
                    resumeGame.classList.remove("displayImage");
                    this.classList.add("displayImage");
                    allBlocks.classList.add("no-clicking")
                });
                resumeGame.addEventListener("click", function() {
                    timerInitialiazer = 1;
                    timerCounter();
                    pauseGame.classList.remove("displayImage");
                    this.classList.add("displayImage");
                    allBlocks.classList.remove("no-clicking");

                })


            }

            , duration)
    };
    //Setting up winner pop up
    var winnerPop = document.querySelector(".score-floor"),
        scoreMag = document.getElementById("score-number");



    function winnerSign() {
        let matchedArray = cureentBlocks.filter(p => p.classList.contains("matched"));
        if (matchedArray.length === cureentBlocks.length) {
            clearInterval(startCounting);
            setTimeout(function() {
                winnerPop.classList.add("appear");
                scoreMag.textContent = Math.floor(((180 - (mins * 60 + secs)) * 36) + ((100 - movesCounter) * 52));
                document.getElementById("winner").play();
            }, 500)

        }
    }
    allBlocks.onclick = winnerSign;
    document.getElementById("exit").onclick = function() {
        winnerPop.classList.remove("appear");
    };

    document.getElementById("play-again").onclick = function() {
        winnerPop.classList.remove("appear");
        clearInterval(startCounting);
        timerInitialiazer = 0;
        mins = 0;
        secs = 0;
        clockCounter.textContent = "0" + mins + ":" + "0" + secs;
        allBlocks.classList.remove("no-clicking");
        pauseGame.classList.remove("displayImage");
        resumeGame.classList.add("displayImage");
        restartGame();
    }