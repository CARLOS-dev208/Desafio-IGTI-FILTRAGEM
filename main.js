let dadosEmployees = []
let dadosRoles = []
let select = []

function fetchJson(url) {
    return fetch(url).then(res => {
        return res.json();
    })
}

async function carregaDados() {
    const employees = await fetchJson("http://localhost:3000/employees");
    const roles = await fetchJson("http://localhost:3000/roles");
    employees.forEach((item) => {
        dadosEmployees.push(item)
    })
    roles.forEach((item) => {
        dadosRoles.push(item);
    })
    selectOption();
    carregaElementosCheckbox()
}
carregaDados()

function selectOption() {
    let valorDoCampoSelect = document.querySelector('select').value
    parseFloat(valorDoCampoSelect)
    console.log(valorDoCampoSelect)

    if (valorDoCampoSelect == 0) {
        limpar();
        ordenaNomeAscendente();
    } else if (valorDoCampoSelect == 1) {
        limpar();
        ordenaNomeDescendente();
    } else if (valorDoCampoSelect == 2) {
        limpar();
        ordenaSalarioAscendente();
    } else {
        limpar();
        ordenaSalarioDescendente();
    }
}

function limpar() {
    let el = document.querySelectorAll('tbody tr')
    for (let i = 1; i < el.length; i++) {
        el[i].remove();
    }
}

function ordenaNomeAscendente() {
    if (select.length) {
        let novo = dadosEmployees
            .filter(ordenar => select.includes(ordenar['role_id'].toString()))
            .sort((el1, el2) => el1.name < el2.name ? -1 : 1)
        clonaTabela(novo, dadosRoles)
    } else {
        dadosEmployees.sort((el1, el2) => el1.name < el2.name ? -1 : 1)
        clonaTabela(dadosEmployees, dadosRoles)

    }
}

function ordenaNomeDescendente() {
    if (select.length) {
        let novo = dadosEmployees
            .filter(ordenar => select.includes(ordenar['role_id'].toString()))
            .sort((el1, el2) => el1.name > el2.name ? -1 : 1)
        clonaTabela(novo, dadosRoles)
    } else {
        dadosEmployees.sort((el1, el2) => el1.name > el2.name ? -1 : 1)
        clonaTabela(dadosEmployees, dadosRoles)

    }
}

function ordenaSalarioAscendente() {
    if (select.length) {
        let novo = dadosEmployees
            .filter(ordenar => select.includes(ordenar['role_id'].toString()))
            .sort((el1, el2) => el1.salary < el2.salary ? -1 : 1)
        clonaTabela(novo, dadosRoles)
    } else {
        dadosEmployees.sort((el1, el2) => el1.salary < el2.salary ? -1 : 1)
        clonaTabela(dadosEmployees, dadosRoles)
    }
}

function ordenaSalarioDescendente() {
    if (select.length) {
        let novo = dadosEmployees
            .filter(ordenar => select.includes(ordenar['role_id'].toString()))
            .sort((el1, el2) => el1.salary > el2.salary ? -1 : 1)
        clonaTabela(novo, dadosRoles)
    } else {
        dadosEmployees.sort((el1, el2) => el1.salary > el2.salary ? -1 : 1)
        clonaTabela(dadosEmployees, dadosRoles)
    }
}

function clonaTabela(dadosEmployees, roles) {
    dadosEmployees.map((item) => {
        let role = roles.find(role => role.id == item.role_id);
        let clonaEstrutura = document.querySelector("tbody tr").cloneNode(true);
        clonaEstrutura.style = "block"
        clonaEstrutura.querySelector("#index").innerHTML = item.id
        clonaEstrutura.querySelector("#name").innerHTML = item.name
        clonaEstrutura.querySelector("#role").innerHTML = role.name
        clonaEstrutura.querySelector("#salary").innerHTML = item.salary
        document.querySelector("tbody").append(clonaEstrutura)
    })
}

function carregaElementosCheckbox() {
    dadosRoles.forEach((item) => {
        let cloneCheckbox = document.querySelector('fieldset .filtro').cloneNode(true)
        cloneCheckbox.style = 'block'
        cloneCheckbox.querySelector('div .role').setAttribute('name', item.id)
        cloneCheckbox.querySelector('div .role').setAttribute('id', item.id)
        cloneCheckbox.querySelector('div  label').setAttribute('for', item.id)
        cloneCheckbox.querySelector('div  label').innerText = item.name
        document.querySelector('fieldset').appendChild(cloneCheckbox)
    });


}

function selectCheckbox() {
    select = [...document.querySelectorAll('.role')].
    filter(el => el.checked).map(el => el.name)

    document.querySelector('select').addEventListener('change', selectOption())
}