const startButton = document.getElementById("start-btn");
let counter = 0;

const data = fetch("data.json");
data.then((response) => response.json()).then((data) => {
    startButton.addEventListener(
        "click",
        () => {
            tableShower();
        },
        { once: true }
    );

    tableShower = () => {
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

        onShowParent();
    };

    onShowParent = () => {
        tbody.addEventListener("click", (e) => {
            let selectedTr2 = e.target.closest("tr");
            let smth = selectedTr2.querySelectorAll("td")[0].textContent;

            let temp = document.getElementById(`b${smth}`);
            if (temp == null) {
                return;
            } else {
                temp.classList.toggle("hide");
            }
        });
    };
});
