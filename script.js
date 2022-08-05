(
    function () {
        const cellHeight = 30
        const cellWidth = 90

        let totalRows = 25
        let totalColumns = 25
        let inViewRows = 10
        let inViewColumns = 10
        let blockedRows = 4
        let blockedColumns = 5

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
            height: (inViewRows-blockedRows) * cellHeight,
            width: (inViewColumns - blockedColumns) * cellWidth
        }

        let mainView = document.querySelector('.main-section')


        mainView.style.height = `${mainSection.height}px`
        mainView.style.width = `${mainSection.width}px`

        function gridCreator(node , rows , columns , height , width , type){
            node.style.display = 'grid'
            node.style.gridTemplateRows = `repeat(${rows},${cellHeight}px)`
            node.style.gridTemplateColumns = `repeat(${columns},${cellWidth}px)`
            node.style.height = `${height}px`
            node.style.width = `${width}px`
            for (let i = 0; i <  rows; i++) {
                for(let j =0 ;j < columns ;j++){
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

        let blockedView = document.querySelector('.blocked')
        gridCreator(blockedView,blockedRows,blockedColumns,blockedSection.height,blockedSection.width,'none')

        let horizontalView = document.querySelector('.horizontal-scroll')
        gridCreator(horizontalView,blockedRows,(totalColumns-blockedColumns),horizontalScrollSection.height,horizontalScrollSection.width,'uni')

        let verticalView = document.querySelector('.vertical-scroll')
        gridCreator(verticalView,(totalRows-blockedRows),blockedColumns,verticalScrollSection.height,verticalScrollSection.width,'uni')

        let allScroll = document.querySelector('.all-scroll')
        gridCreator(allScroll,(totalRows-blockedRows),(totalColumns-blockedColumns),allScrollSection.height,allScrollSection.width,'bi')

        allScroll.addEventListener('scroll',function(){
            verticalView.scrollTop = this.scrollTop
            horizontalView.scrollLeft = this.scrollLeft
        })

    }
)()