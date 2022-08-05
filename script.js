(
    function () {
        const cellHeight = 30
        const cellWidth = 90

        let specificationObj = {
            totalRows: 25,
            totalColumns: 25,
            inViewRows: 10,
            inViewColumns: 10,
            blockedRows: 4,
            blockedColumns: 5,
        }

        function generateMainView() {

            let { totalRows, totalColumns, inViewRows, inViewColumns, blockedRows, blockedColumns } = specificationObj

            let mainSection = {
                height: inViewRows * cellHeight,
                width: inViewColumns * cellWidth
            }

            let blockedSection = {
                height: blockedRows * cellHeight,
                width: blockedColumns * cellWidth
            }

            let verticalScrollSection = {
                height: (inViewRows - blockedRows) * cellHeight,
                width: blockedColumns * cellWidth
            }

            let horizontalScrollSection = {
                height: blockedRows * cellHeight,
                width: (inViewColumns - blockedColumns) * cellWidth
            }

            let allScrollSection = {
                height: (inViewRows - blockedRows) * cellHeight,
                width: (inViewColumns - blockedColumns) * cellWidth
            }

            let mainView = document.querySelector('.main-section')

            if(mainView){
                mainView.remove()
            }

            mainView = document.createElement('div')
            mainView.classList.add('main-section')

            let blockedView = document.createElement('div')
            blockedView.classList.add('blocked')

            let horizontalView = document.createElement('div')
            horizontalView.classList.add('horizontal-scroll')

            let verticalView = document.createElement('div')
            verticalView.classList.add('vertical-scroll')
           
            let allScroll = document.createElement('div')
            allScroll.classList.add('all-scroll')

            mainView.appendChild(blockedView)
            mainView.appendChild(horizontalView)
            mainView.appendChild(verticalView)
            mainView.appendChild(allScroll)

            mainView.style.height = `${mainSection.height}px`
            mainView.style.width = `${mainSection.width}px`

            function gridCreator(node, rows, columns, height, width, type) {
                node.style.display = 'grid'
                node.style.gridTemplateRows = `repeat(${rows},${cellHeight}px)`
                node.style.gridTemplateColumns = `repeat(${columns},${cellWidth}px)`
                node.style.height = `${height}px`
                node.style.width = `${width}px`
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < columns; j++) {
                        let cell = document.createElement('div')
                        cell.style.height = `${cellHeight}px`
                        cell.style.width = `${cellWidth}px`
                        cell.innerText = `${i},${j}`
                        cell.classList.add(`cell-${type}`)
                        cell.classList.add('cell')
                        node.appendChild(cell)
                    }
                }
            }

            gridCreator(blockedView, blockedRows, blockedColumns, blockedSection.height, blockedSection.width, 'none')

            gridCreator(horizontalView, blockedRows, (totalColumns - blockedColumns), horizontalScrollSection.height, horizontalScrollSection.width, 'uni')

            gridCreator(verticalView, (totalRows - blockedRows), blockedColumns, verticalScrollSection.height, verticalScrollSection.width, 'uni')

            gridCreator(allScroll, (totalRows - blockedRows), (totalColumns - blockedColumns), allScrollSection.height, allScrollSection.width, 'bi')

            allScroll.addEventListener('scroll', function () {
                verticalView.scrollTop = this.scrollTop
                horizontalView.scrollLeft = this.scrollLeft
            })
            document.querySelector('body').appendChild(mainView)
        }

        let inputs = document.querySelectorAll('input')
        inputs.forEach((input) => {
            input.addEventListener('change', () => {
                let key = input.getAttribute('id');
                specificationObj[key] = parseInt(input.value)
                generateMainView()
            })
        })
        generateMainView()
    }
)()