function waterTankProblem(){
    function waterTank(arr){
        let len = arr.length;
        let max = Math.max(...arr);
        
        let inputHtml = '';
        let outputHtml = '';
        let result = 0;
        
        // Step 1 - precompute leftmax and rightmax arrays
        let leftmax = Array(len).fill(0);
        let rightmax = Array(len).fill(0);
        
        leftmax[0] = arr[0];
        for(let i = 1; i < len; i++){
            leftmax[i] = Math.max(leftmax[i - 1], arr[i]);
        }
        
        rightmax[len - 1] = arr[len - 1];
        for(let i = len - 2; i >= 0; i--){
            rightmax[i] = Math.max(rightmax[i + 1], arr[i]);
        }

        // Step 2 - Input table with blocks (black) and water (blue)
        for(let i = max; i > 0; i--){
            inputHtml += "<tr>";
            for(let j = 0; j < len; j++){
                if(arr[j] >= i){
                    inputHtml += "<td class='bg-dark'></td>"; // block
                } else if(leftmax[j] >= i && rightmax[j] >= i){
                    inputHtml += "<td class='bg-primary'></td>"; // trapped water
                } else {
                    inputHtml += "<td></td>"; // empty
                }
            }
            inputHtml += "</tr>";
        }

        // Step 3 - Output table with only water (blue)
        for(let i = max; i > 0; i--){
            outputHtml += "<tr>";
            for(let j = 0; j < len; j++){
                if(arr[j] < i && leftmax[j] >= i && rightmax[j] >= i){
                    outputHtml += "<td class='bg-primary'></td>";
                    result++;
                } else {
                    outputHtml += "<td></td>";
                }
            }
            outputHtml += "</tr>";
        }
        
        // Update the HTML content with result
        document.querySelector('#input-tank').innerHTML = inputHtml;
        document.querySelector('#output-tank').innerHTML = outputHtml;
        document.querySelector('#result').innerHTML = result;
    }

    let unitsInput = document.getElementById("unitinput").value;
    let x = unitsInput.split(',').join('');
    let inputArray = [];

    for(let i of x){
        inputArray.push(Number(i));
    }

    waterTank(inputArray);
}
