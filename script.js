const startButton = document.getElementById("start-btn");
const select = document.getElementById("Filter");
let counter;
let items;
let selectedTr;

const data = fetch("data.json");

tbody.addEventListener("click", (e) => {
    console.log(e.target);
    let selectedTr2 = e.target.closest("tr");
    let smth = selectedTr2.querySelectorAll("td")[0].textContent;

    let temp = document.getElementById(`b${smth}`);
    if (temp == null) {
        return;
    } else if (temp.classList.contains("hide")) {
        temp.classList.remove("hide");
    } else if (!temp.classList.contains("hide")) {
        temp.classList.add("hide");
    }
});

data.then((response) => response.json()).then((data) => {
    startButton.addEventListener("click", () => {
        counter = 0;
        removeAll();
        tableShower();
    });

    tableShower = () => {
        let tableHeader = document.createElement("tr");
        tableHeader.innerHTML = `<th>Position</th><th>Name</th><th>Email</th><th>Balance</th>`;
        tbody.append(tableHeader);

        data.forEach((elem) => {
            counter++;
            element = document.createElement("tr");

            element.classList.add(`item-${elem.parentId}`);
            element.id = `a${counter}`;

            element.innerHTML = `<td>${elem.id}</td><td id=a${counter}>${elem.name}</td><td>${elem.email}</td><td class='element'>${elem.balance}</td>`;
            tbody.append(element);

            let selectedTr = element.closest("tr");

            if (selectedTr.classList.value != "item-0") {
                let parentId = selectedTr.classList.value.substr(5);

                let parent = document.querySelector(`#a${parentId}`).closest("tr");

                parentName = parent.querySelectorAll("td")[1].textContent;
                parentEmail = parent.querySelectorAll("td")[2].textContent;
                parentBalance = parent.querySelectorAll("td")[3].textContent;

                let parentShower = document.createElement("tr");
                parentShower.id = `b${elem.id}`;
                parentShower.classList.add("pink");
                parentShower.classList.add("hide");
                parentShower.innerHTML = `<td></td><td>${parentName}</td><td>${parentEmail}</td><td class='element'>${parentBalance}</td>`;

                selectedTr.after(parentShower);
            }
        });
    };

    onFilter = () => {
        removeAll();

        let selectedOption = select.options[select.selectedIndex];

        if (selectedOption.text == "Fiter by Active") {
            onFilterActive();
        } else if (selectedOption.text == "Fiter by Having parent") {
            onFilterParent();
        }
    };

    onFilterActive = () => {
        data.forEach((elem) => {
            let elemIsActive = elem.isActive;
            if (elemIsActive) {
                element = document.createElement("tr");
                element.innerHTML = `<td>${elem.id}</td><td>${elem.name}</td><td>${elem.email}</td><td>${elem.balance}</td>`;
                tbody.append(element);
            }
        });
    };

    onFilterParent = () => {
        for (let elem of data) {
            let isElemChild = elem.parentId;
            if (isElemChild != 0) {
                element = document.createElement("tr");
                element.innerHTML = `<td>${elem.id}</td><td>${elem.name}</td><td>${elem.email}</td><td>${elem.balance}</td>`;
                tbody.append(element);
            }
        }
    };

    select.addEventListener("change", onFilter);

    removeAll = () => {
        items = document.querySelectorAll("tr");

        items.forEach((item) => {
            item.remove();
        });
    };
});
