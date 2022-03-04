const startButton = document.getElementById("start-btn");
let counter = 0;

const data = fetch("data.json");
data.then((response) => response.json()).then((data) => {
    startButton.addEventListener("click", () => {
        tableShower();
    });

    tableShower = () => {
        data.forEach((elem) => {
            counter++;
            element = document.createElement("tr");
            element.parentId = elem.parentId;
            element.classList.add(`item-${elem.parentId}`);

            element.innerHTML = `<td>${elem.id}</td><td id=a${counter}>${elem.name}</td><td>${elem.email}</td><td class='element'>${elem.balance}</td>`;
            tbody.append(element);


            
        });

        onShowParent();
    };

    onShowParent = () => {
        tbody.addEventListener("click", (e) => {
            let selectedTr = e.target.closest("tr");
            console.log(selectedTr);

            // if (selectedTr.classList.value.includes("show")) {
            //     return;
            // }

            if (selectedTr.classList.value != "item-0") {
                let parentId = selectedTr.classList.value.substr(5);

                let parent = document.querySelector(`#a${parentId}`).closest("tr");
                console.log(parent);

                parentName = parent.querySelectorAll("td")[1].textContent;
                parentEmail = parent.querySelectorAll("td")[2].textContent;
                parentBalance = parent.querySelectorAll("td")[3].textContent;

                let parentShower = document.createElement("tr");
                parentShower.classList.add("pink");
                // parentShower.classList.toggle("hide");
                parentShower.innerHTML = `<td>${parent.id}</td><td>${parentName}</td><td>${parentEmail}</td><td class='element'>${parentBalance}</td>`;
                console.log(parentShower);
                selectedTr.after(parentShower);
            }
        });
    };
});
