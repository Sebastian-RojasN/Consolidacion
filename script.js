document.addEventListener("DOMContentLoaded", function () {
    const calcularButton = document.getElementById("calcularButton");
    calcularButton.addEventListener("click", calcularPresupuesto);

    const agregarGastoButton = document.getElementById("agregarGastoButton");
    agregarGastoButton.addEventListener("click", agregarGasto);
});

function calcularPresupuesto() {
    const presupuestoInput = document.getElementById("presupuesto");
    const presupuestoValor = Number(presupuestoInput.value.trim());

    if (isNaN(presupuestoValor) || presupuestoValor <= 0) {
        alert("Por favor, ingresa un presupuesto válido.");
        return; 
    }

    const valorPresupuestoElement = document.getElementById("valorPresupuesto");
    valorPresupuestoElement.innerText = presupuestoValor;

    recalculateTotalExpenses();
}


function agregarGasto() {
    const nombreGastoInput = document.getElementById("nombreGasto");
    const valorGastoInput = document.getElementById("valorGasto");

    const nombreGastoValor = nombreGastoInput.value.trim();
    const valorGastoValor = Number(valorGastoInput.value.trim());

    if (nombreGastoValor === "" || isNaN(valorGastoValor) || valorGastoValor <= 0) {
        alert("Por favor, ingresa tanto el Nombre del Gasto como un Valor de Gasto válido.");
        return; 
    }

    const gastosContainer = document.getElementById("gastos");

    const newGastoRow = document.createElement("div");
    newGastoRow.classList.add("row");

    const nombreGastoCol = document.createElement("div");
    nombreGastoCol.classList.add("col-4", "col-sm-4", "d-flex", "flex-column", "align-items-center", "justify-content-start");
    const nombreGastoText = document.createElement("p");
    nombreGastoText.innerText = nombreGastoValor;
    nombreGastoCol.appendChild(nombreGastoText);

    const valorGastoCol = document.createElement("div");
    valorGastoCol.classList.add("col-4", "col-sm-4", "d-flex", "flex-column", "align-items-center", "justify-content-center");
    const valorGastoText = document.createElement("p");
    valorGastoText.innerText = valorGastoValor;
    valorGastoCol.appendChild(valorGastoText);

    const deleteButtonCol = document.createElement("div");
    deleteButtonCol.classList.add("col-4", "col-sm-4", "d-flex", "align-items-center", "justify-content-center");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-outline-danger");
    deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/></svg>';
    deleteButton.addEventListener("click", function () {
        newGastoRow.remove();
        recalculateTotalExpenses();
    });
    deleteButtonCol.appendChild(deleteButton);

    newGastoRow.appendChild(nombreGastoCol);
    newGastoRow.appendChild(valorGastoCol);
    newGastoRow.appendChild(deleteButtonCol);

    gastosContainer.appendChild(newGastoRow);

    // Limpiar los campos de entrada de gastos
    nombreGastoInput.value = "";
    valorGastoInput.value = "";

    recalculateTotalExpenses();
}

function recalculateTotalExpenses() {
    const gastosContainer = document.getElementById("gastos");
    const valorGastoElements = gastosContainer.getElementsByClassName("col-4 col-sm-4 d-flex flex-column align-items-center justify-content-center");

    let totalExpenses = 0;
    for (let i = 0; i < valorGastoElements.length; i++) {
        const valorGastoText = valorGastoElements[i].getElementsByTagName("p")[0];
        const gastoValue = Number(valorGastoText.innerText);
        if (!isNaN(gastoValue)) {
            totalExpenses += gastoValue;
        }
    }

    const sumaGastosElement = document.getElementById("sumaGastos");
    sumaGastosElement.innerHTML = `<div>$${totalExpenses}</div>`;

    const presupuestoInput = document.getElementById("presupuesto");
    const presupuestoValor = Number(presupuestoInput.value);

    const valorSaldoElement = document.getElementById("valorSaldo");
    if (!isNaN(presupuestoValor)) {
        const saldo = presupuestoValor - totalExpenses;
        valorSaldoElement.innerHTML = `<div>$${saldo}</div>`;
    } else {
        valorSaldoElement.innerHTML = "<div>N/A</div>";
    }
}
