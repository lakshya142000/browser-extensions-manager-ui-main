// Toggle theme 
const toggleTheme = document.querySelector('.sun-moon');
const root = document.documentElement;
let theme = 'light';
toggleTheme.addEventListener('click',()=>{
    if(theme == 'light'){
        theme='dark'
        root.setAttribute('data-theme','dark')
        toggleTheme.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22">
      <g clip-path="url(#a)"><path stroke="#FBFDFE" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.98" d="M11 1.833v1.834m0 14.666v1.834M3.667 11H1.833m3.955-5.212L4.492 4.492m11.72 1.296 1.297-1.296M5.788 16.215l-1.296 1.296m11.72-1.296 1.297 1.296M20.167 11h-1.834m-2.75 0a4.583 4.583 0 1 1-9.167 0 4.583 4.583 0 0 1 9.167 0Z"/></g>
      <defs><clipPath id="a"><path fill="#fff" d="M0 0h22v22H0z"/></clipPath></defs>
    </svg>`
    }else{
        theme='light'
        root.setAttribute('data-theme', 'light')
        toggleTheme.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22">
      <g clip-path="url(#a)"><path stroke="#091540" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.98" d="M20.125 11.877A7.333 7.333 0 1 1 10.124 1.875a9.168 9.168 0 1 0 10.001 10.002Z"/></g>
      <defs><clipPath id="a"><path fill="#fff" d="M0 0h22v22H0z"/></clipPath></defs>
    </svg>`
    }

})
let dataList = null;
const extensionList = document.querySelector('.extension-list')

async function fecthData() {
    const response = await fetch('data.json')
    let data = await response.json()
    console.log(data)
    return data
}
async function getData(){
    dataList = await fecthData();
    // console.log(recievedData)
    display(dataList)
}
getData();
// let dataList = getData();
// display(dataList)
async function display(dataList){
    // Populate Data from json file
    let extension;
    for(const data of dataList){
        if(data.isActive){
            extension = `<div class="extension-cont">
        <div class="extension">
            <img src="${data.logo}">
            <div class="content">
            <h3>${data.name}</h3>
            <p>${data.description}</p>
            </div>
        </div>
        <div class="extension-btn">
            <button class="remove-btn" onclick="removeExt('${data.name}')">Remove</button>
            <label class="switch">
            <input type="checkbox" class="toggleActive" onclick="toggleActivity('${data.name}')" checked>
            <span class="slider"></span>
            </label>
        </div>
        </div>`;
        }else{
            extension = `<div class="extension-cont">
        <div class="extension">
            <img src="${data.logo}">
            <div class="content">
            <h3>${data.name}</h3>
            <p>${data.description}</p>
            </div>
        </div>
        <div class="extension-btn">
            <button class="remove-btn" onclick="removeExt('${data.name}')">Remove</button>
            <label class="switch">
            <input type="checkbox" class="toggleActive" onclick="toggleActivity('${data.name}')" >
            <span class="slider"></span>
            </label>
        </div>
        </div>`;
        }
        
        const div = document.createElement('div');
        div.innerHTML = extension;
        extensionList.append(div.firstChild);
    }
}
// Active / Inactive

async function toggleActivity(name){
    const indx = dataList.findIndex(data=>data.name == name)
    const actData = dataList[indx]
    console.log("1 "+ actData.isActive)
    actData.isActive = !actData.isActive
    console.log(actData.name + " "+ actData.isActive)

}
// Head Button function
const all = document.getElementById('all');
const active = document.getElementById('btn-active');
const inactive = document.getElementById('btn-inactive');

function showAll(){
    extensionList.innerHTML='';
    display(dataList);
    all.classList.toggle('active')
    inactive.classList.remove('active')
    active.classList.remove('active')
    
}

function showActive(){
    extensionList.innerHTML='';
    const activeList = dataList.filter((data)=>data.isActive === true)
    display(activeList)
    active.classList.toggle('active')
    inactive.classList.remove('active')
    all.classList.remove('active')
}

function showInactive(){
    extensionList.innerHTML='';
    const inactiveList = dataList.filter((data)=>data.isActive === false)
    display(inactiveList)
    inactive.classList.toggle('active')
    active.classList.remove('active')
    all.classList.remove('active')
}

function removeExt(name){
    extensionList.innerHTML='';
    dataList = dataList.filter((data)=>data.name != name)
    display(dataList)
}
