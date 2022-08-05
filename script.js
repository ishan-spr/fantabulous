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

            if (mainView) {
                mainView.remove()
            }

            mainView = document.createElement('div')
            mainView.classList.add('main-section')

            let blockedContainer = document.createElement('div')
            blockedContainer.classList.add('container')
            blockedContainer.style.height = `${blockedSection.height}px`
            blockedContainer.style.width = `${blockedSection.width}px`
            let blockedView = document.createElement('div')
            blockedView.classList.add('blocked')
            blockedContainer.appendChild(blockedView)

            let horizontalContainer = document.createElement('div')
            horizontalContainer.classList.add('container')
            horizontalContainer.style.height = `${horizontalScrollSection.height}px`
            horizontalContainer.style.width = `${horizontalScrollSection.width}px`
            let horizontalView = document.createElement('div')
            horizontalView.classList.add('horizontal-scroll')
            horizontalContainer.appendChild(horizontalView)


            let verticalContainer = document.createElement('div')
            verticalContainer.classList.add('container')
            verticalContainer.style.height = `${verticalScrollSection.height}px`
            verticalContainer.style.width = `${verticalScrollSection.width}px`
            let verticalView = document.createElement('div')
            verticalView.classList.add('vertical-scroll')
            verticalContainer.appendChild(verticalView)

            let allScrollContainer = document.createElement('div')
            allScrollContainer.classList.add('container')
            allScrollContainer.style.height = `${allScrollSection.height}px`
            allScrollContainer.style.width = `${allScrollSection.width}px`
            let allScroll = document.createElement('div')
            allScroll.classList.add('all-scroll')
            allScrollContainer.appendChild(allScroll)

            mainView.appendChild(blockedContainer)
            mainView.appendChild(horizontalContainer)
            mainView.appendChild(verticalContainer)
            mainView.appendChild(allScrollContainer)

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
            horizontalView.onscroll = function(){
                allScroll.scrollLeft = this.scrollLeft
            }
            verticalView.onscroll = function(){
                allScroll.scrollTop = this.scrollTop
            }
            document.querySelector('body').appendChild(mainView)
        }

        let inputs = document.querySelectorAll('input')
        inputs.forEach((input) => {
            input.addEventListener('change', () => {
                let key = input.getAttribute('id');
                let value = parseInt(input.value)
                if (value < 0) value = 0
                specificationObj[key] = value
                generateMainView()
            })
        })
        generateMainView()
    }
)()