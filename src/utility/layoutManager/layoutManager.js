//File to generate layout for grids - Ajay
class baseLayout {
    layout_object = { 
        i : "",
        x : "",
        y : "",
        w : "",
        h : 2,
        isResizable : false
    }
}
class Layout{
    constructor(chartLength){
        let lg = this.generateLGLayout(chartLength);
        let md = this.generateMDLayout(chartLength);
        let layoutTemp = {};
        layoutTemp.lg = lg;
        layoutTemp.md = md;
        this.layout = layoutTemp;
    }

    //function to genearate layout for lg screens
    generateLGLayout = (chartLength) => {
        if(chartLength % 5 === 0){
            let layout_array = [], rowNumber = 0, groupNumber = 0;
            for(let index = 0; index < chartLength; index++){
                let layout = new baseLayout();
                layout.layout_object.i = String(index);
                if(index % 5 === 0){
                    layout.layout_object.x = 12;
                    layout.layout_object.y = (Math.floor(rowNumber / 3)) + groupNumber * 4;
                    layout.layout_object.w = 12;
                    rowNumber++;
                  }
                  else if(index % 5 === 1){
                    layout.layout_object.x = 0;
                    layout.layout_object.y = (Math.floor(rowNumber / 3)) + groupNumber * 4;
                    layout.layout_object.w = 6;
                    rowNumber++;
                  }
                  else if(index % 5 === 2){
                    layout.layout_object.x = 6;
                    layout.layout_object.y = (Math.floor(rowNumber / 3)) + groupNumber * 4;
                    layout.layout_object.w = 6;
                    rowNumber++;
                  }
                  else if(index % 5 === 3){
                    layout.layout_object.x = 0;
                    layout.layout_object.y = (Math.floor(rowNumber / 3)) + groupNumber * 4;
                    layout.layout_object.w = 6;
                    rowNumber++;
                  }
                  else{
                    layout.layout_object.x = 6;
                    layout.layout_object.y = (Math.floor(rowNumber / 3)) + groupNumber * 4;
                    layout.layout_object.w = 6;
                    rowNumber = 0;
                    groupNumber++;
                  }
                layout_array.push(layout.layout_object);
            }
            return layout_array;
        }
        else if(chartLength % 3 === 0){
            let layout_array = [], rowNumber = 0;
            for(let index = 0; index < chartLength; index++){
                let layout = new baseLayout();
                layout.layout_object.i = String(index);
                if(index % 3 === 0){
                    layout.layout_object.x = 0;
                    layout.layout_object.y = (Math.floor(rowNumber / 3)) * 2;
                    layout.layout_object.w = 4;
                    rowNumber++;
                }
                else if(index % 3 === 1){
                    layout.layout_object.x = 4;
                    layout.layout_object.y = (Math.floor(rowNumber / 3)) * 2;
                    layout.layout_object.w = 4;
                    rowNumber++;
                }
                else {
                    layout.layout_object.x = 8;
                    layout.layout_object.y = (Math.floor(rowNumber / 3)) * 2;
                    layout.layout_object.w = 4;
                    rowNumber++;
                }
                layout_array.push(layout.layout_object);
            }
            return layout_array;
        }
        else if(chartLength % 3 === 2){
            let layout_array = [], rowNumber = 0;
            let threeRowCount = Math.floor(chartLength / 3);
            for(let index = 0; index < threeRowCount; index++){
                let layout = new baseLayout();
                layout.layout_object.i = String(index);
                if(index % 3 === 0){
                    layout.layout_object.x = 0;
                    layout.layout_object.y = (Math.floor(rowNumber / 3)) * 2;
                    layout.layout_object.w = 4;
                    rowNumber++;
                }
                else if(index % 3 === 1){
                    layout.layout_object.x = 4;
                    layout.layout_object.y = (Math.floor(rowNumber / 3)) * 2;
                    layout.layout_object.w = 4;
                    rowNumber++;
                }
                else {
                    layout.layout_object.x = 8;
                    layout.layout_object.y = (Math.floor(rowNumber / 3)) * 2;
                    layout.layout_object.w = 4;
                    rowNumber++;
                }
                layout_array.push(layout.layout_object);
            }
            for(let index = rowNumber; index < chartLength; index++){
                let layout = new baseLayout();
                layout.layout_object.i = String(index);
                if(index % 2 === 0){
                    layout.layout_object.x = 0;
                    layout.layout_object.w = 6;
                    layout.layout_object.y = (Math.floor(rowNumber / 2)) * 2;
                    rowNumber++;
                }
                else{
                    layout.layout_object.x = 6;
                    layout.layout_object.w = 6;
                    layout.layout_object.y = (Math.floor(rowNumber / 2)) * 2;
                    rowNumber++;
                }
                layout_array.push(layout.layout_object);
            }
            return layout_array;
        }
        else if(chartLength % 3 === 1){
            let layout_array = [], rowNumber = 0;
            let threeRowCount = Math.floor(chartLength / 3) - 1;
            for(let index = 0; index < threeRowCount; index++){
                let layout = new baseLayout();
                layout.layout_object.i = String(index);
                if(index % 3 === 0){
                    layout.layout_object.x = 0;
                    layout.layout_object.y = (Math.floor(rowNumber / 3)) * 2;
                    layout.layout_object.w = 4;
                    rowNumber++;
                }
                else if(index % 3 === 1){
                    layout.layout_object.x = 4;
                    layout.layout_object.y = (Math.floor(rowNumber / 3)) * 2;
                    layout.layout_object.w = 4;
                    rowNumber++;
                }
                else {
                    layout.layout_object.x = 8;
                    layout.layout_object.y = (Math.floor(rowNumber / 3)) * 2;
                    layout.layout_object.w = 4;
                    rowNumber++;
                }
                layout_array.push(layout.layout_object);
            }
            for(let index = rowNumber; index < chartLength; index++){
                let layout = new baseLayout();
                layout.layout_object.i = String(index);
                if(index % 2 === 0){
                    layout.layout_object.x = 0;
                    layout.layout_object.w = 6;
                    layout.layout_object.y = (Math.floor(rowNumber / 2)) * 2;
                    rowNumber++;
                }
                else{
                    layout.layout_object.x = 6;
                    layout.layout_object.w = 6;
                    layout.layout_object.y = (Math.floor(rowNumber / 2)) * 2;
                    rowNumber++;
                }
                layout_array.push(layout.layout_object);
            }
            return layout_array;
        }
    }

    //function to generate layout for md screens
    generateMDLayout(chartLength){
        let layout_array = [], rowNumber = 0;
        for(let index = 0; index < chartLength; index++){
            let layout = new baseLayout();
            layout.layout_object.i = String(index);
            if(index % 2 === 0){
                layout.layout_object.x = 0;
                layout.layout_object.w = 5;
                layout.layout_object.y = (Math.floor(rowNumber / 2)) * 2;
                rowNumber++;
            }
            else{
                layout.layout_object.x = 5;
                layout.layout_object.w = 5;
                layout.layout_object.y = (Math.floor(rowNumber / 2)) * 2;
                rowNumber++;
            }
            layout_array.push(layout.layout_object);
        }
        return layout_array;
    }
}

export default Layout