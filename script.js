(
    function () {
        const cellHeight = 30
        const cellWidth = 90

        let specificationObj = {
            totalRows: 25,
            totalColumns: 25,
            inViewRows: 10,
            inViewColumns: 10,
            blockedRows: 2,
            blockedColumns: 3,
        }

        function validate() {
            let { totalColumns, totalRows, inViewRows, inViewColumns, blockedRows, blockedColumns } = specificationObj
            let { max , min } = Math
            specificationObj = { ...specificationObj, 
                inViewColumns: min(max(1, max(inViewColumns, blockedColumns + 1)),totalColumns),
                inViewRows: min(max(1, max(inViewRows, blockedRows + 1)),totalRows )
                }
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

            function containerGenerator(height, width, className) {
                let container = document.createElement('div')
                container.classList.add('container')
                container.style.height = `${height}px`
                container.style.width = `${width}px`
                let view = document.createElement('div')
                view.classList.add(className)
                container.appendChild(view)
                return [container, view]
            }

            let [blockedContainer, blockedView] = containerGenerator(blockedSection.height, blockedSection.width, 'blocked')
            let [horizontalContainer, horizontalView] = containerGenerator(horizontalScrollSection.height, horizontalScrollSection.width, 'horizontal-scroll')
            let [verticalContainer, verticalView] = containerGenerator(verticalScrollSection.height, verticalScrollSection.width, 'vertical-scroll')

            let allScrollContainer = document.createElement('div')
            allScrollContainer.classList.add('all-scroll-container')
            let allScroll = document.createElement('div')
            allScroll.classList.add('all-scroll')
            allScrollContainer.appendChild(allScroll)

            mainView.appendChild(blockedContainer)
            mainView.appendChild(horizontalContainer)
            mainView.appendChild(verticalContainer)
            mainView.appendChild(allScrollContainer)

            function gridCreator(node, rows, columns, height, width, type, startRow, startColumn) {
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
                        cell.innerText = `${startRow + i},${startColumn + j}`
                        cell.classList.add(`cell-${type}`)
                        cell.classList.add('cell')
                        node.appendChild(cell)
                    }
                }
            }

            gridCreator(blockedView, blockedRows, blockedColumns, blockedSection.height, blockedSection.width, 'none', 1, 1)

            gridCreator(horizontalView, blockedRows, (totalColumns - blockedColumns), horizontalScrollSection.height, horizontalScrollSection.width, 'uni', 1, blockedColumns + 1)

            gridCreator(verticalView, (totalRows - blockedRows), blockedColumns, verticalScrollSection.height, verticalScrollSection.width, 'uni', blockedRows + 1, 1)

            gridCreator(allScroll, (totalRows - blockedRows), (totalColumns - blockedColumns), allScrollSection.height, allScrollSection.width, 'bi', blockedRows + 1, blockedColumns + 1)

            allScrollContainer.style.height = `${allScrollSection.height}px`
            allScrollContainer.style.width = `${allScrollSection.width}px`
            mainView.style.height = `${mainSection.height}px`
            mainView.style.width = `${mainSection.width}px`

            document.querySelector('.grid-container').appendChild(mainView)

            let scrollWidth = allScrollContainer.offsetWidth - allScrollContainer.clientWidth

            allScrollContainer.style.height = `${allScrollSection.height + scrollWidth}px`
            allScrollContainer.style.width = `${allScrollSection.width + scrollWidth}px`
            mainView.style.height = `${mainSection.height + scrollWidth}px`
            mainView.style.width = `${mainSection.width + scrollWidth}px`


            allScrollContainer.addEventListener('scroll', function () {
                verticalView.scrollTop = this.scrollTop
                horizontalView.scrollLeft = this.scrollLeft
            })
            horizontalView.onscroll = function () {
                allScrollContainer.scrollLeft = this.scrollLeft
            }
            verticalView.onscroll = function () {
                allScrollContainer.scrollTop = this.scrollTop
            }
        }

        let inputs = document.querySelectorAll('input')
        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                let key = input.getAttribute('id');
                let value = parseInt(input.value)
                if (value < 0) value = 0
                specificationObj[key] = value
                validate(specificationObj)
                generateMainView()
            })
        })
        generateMainView()
    }
)()